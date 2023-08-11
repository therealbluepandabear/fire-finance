import { Workbook } from 'exceljs'
import { formatCurrency } from '../utils'
import { adjustForInflation } from './calculator-utils'

export class PlanEngine {
    private readonly inputs: PlanEngineInputs
    private engineState: PlanEngineState

    constructor(inputs: PlanEngineInputs) {
        this.inputs = inputs
        this.engineState = this.initEngineState()
    }

    private initEngineState(): PlanEngineState {
        return { 
            total: {
                networth: this.inputs.networth,
                stocks: this.inputs.networth * this.inputs.stocksAllocationRate,
                bonds: this.inputs.networth * this.inputs.bondsAllocationRate,
                cash: this.inputs.networth * this.inputs.cashAllocationRate
            },

            annualSavings: this.calculateAnnualSavings(),
            hasRetired: false,

            adjStocksReturnRate: adjustForInflation(this.inputs.stocksReturnRate, this.inputs.inflationRate),
            adjBondsReturnRate: adjustForInflation(this.inputs.bondsReturnRate, this.inputs.inflationRate),
            adjCashReturnRate: adjustForInflation(this.inputs.cashReturnRate, this.inputs.inflationRate),

            age: this.inputs.age,
            year: new Date().getFullYear(),

            data: []
        }
    }

    private calculateAnnualSavings(): number {
        return this.inputs.annualIncome - this.inputs.annualSpending
    }

    private calculateTotalNetworth(): number {
        return this.engineState.total.stocks + this.engineState.total.bonds + this.engineState.total.cash
    }

    private updateTotal(): void {
        // Update total stocks
        this.engineState.total.stocks = this.calculateTotal('stocks', this.inputs.stocksAllocationRate, this.engineState.adjStocksReturnRate)

        // Update total bonds
        this.engineState.total.bonds = this.calculateTotal('bonds', this.inputs.bondsAllocationRate, this.engineState.adjBondsReturnRate)

        // Update total cash
        this.engineState.total.cash = this.calculateTotal('cash', this.inputs.cashAllocationRate, this.engineState.adjCashReturnRate)

        // Update total networth
        this.engineState.total.networth = this.calculateTotalNetworth()
    }

    private update(): void {
        this.updateTotal()

        // Only calculate at a point in time in which the user is not retired, this is 
        // because we are setting the savings to 0 when the user retires anyways, so this
        // function does not need to be called
        if (!this.engineState.hasRetired) {
            this.updateAnnualIncomeAndSavings()
        }
    }

    private calculateTotal(type: 'stocks' | 'bonds' | 'cash', allocationRate: number, returnRate: number): number {
        const savingsContribution = this.engineState.annualSavings * allocationRate

        let totalAmount = this.engineState.total[type] + (this.engineState.total[type] * returnRate) + savingsContribution

        // Take away the expenses amount each year as the user is retired
        if (this.engineState.hasRetired) {
            totalAmount = (this.engineState.total[type] + (this.engineState.total[type] * returnRate)) - (this.inputs.annualSpending * allocationRate)
        }

        return totalAmount
    }

    private updateAnnualIncomeAndSavings(): void {
        if (this.inputs.incomeGrowthRate) {
            this.inputs.annualIncome = this.inputs.annualIncome + (this.inputs.annualIncome * this.inputs.incomeGrowthRate)
        }

        this.engineState.annualSavings = this.calculateAnnualSavings()
    }

    private calculatePreRetirement(): void {
        while ((this.engineState.total.networth * this.inputs.safeWithdrawalRate) < this.inputs.annualSpending) {
            this.engineState.data.push({ age: this.engineState.age, year: this.engineState.year, yearsElapsed: this.engineState.age - this.inputs.age, networth: this.engineState.total.networth })
            this.update()

            ++this.engineState.age
            ++this.engineState.year
        }

        this.engineState.data.push({ age: this.engineState.age, year: this.engineState.year, yearsElapsed: this.engineState.age - this.inputs.age, networth: this.engineState.total.networth })

        // Calculate for the extra years after financial independence (if the user has specified a maximum age)
        if (this.inputs.retirementAge || this.inputs.maximumAge) {
            let ageToQuery = 0

            if (this.inputs.maximumAge && !this.inputs.retirementAge) {
                ageToQuery = this.inputs.maximumAge
            } else if (this.inputs.maximumAge && this.inputs.retirementAge) {
                ageToQuery = this.inputs.retirementAge
            }

            let extraAge = this.engineState.age

            while (extraAge < ageToQuery) {
                this.update()
                this.engineState.data.push({ age: ++extraAge, year: ++this.engineState.year, yearsElapsed: extraAge - this.inputs.age, networth: this.engineState.total.networth })
            }
        }
    }

    private calculatePostRetirement(): void {
        // Set annual savings to 0, the person will be retired at this point of time so they are not
        // capable of 'saving' anything as they are not working at a job
        this.engineState.annualSavings = 0

        if (this.inputs.maximumAge && this.inputs.retirementAge) {
            for (let i = 1; i <= (this.inputs.maximumAge - this.inputs.retirementAge); ++i) {
                this.update()
                this.engineState.data.push({ age: this.inputs.retirementAge + i, year: ++this.engineState.year, yearsElapsed: this.inputs.retirementAge + i - this.inputs.age, networth: this.engineState.total.networth })
            }
        }
    }

    private getOutputs(): PlanEngineOutputs {
        const fireNumber = this.inputs.annualSpending / this.inputs.safeWithdrawalRate

        return {
            summary: {
                fireAge: this.engineState.age,
                fireNumber: fireNumber,
                retirementAge: this.inputs.retirementAge ?? this.engineState.age,
                yearsTillRetirement: (this.inputs.retirementAge ?? this.engineState.age) - this.inputs.age
            },
            data: this.engineState.data
        }
    }

    calculate(): PlanEngineOutputs {
        this.calculatePreRetirement()

        // At this point the user has retired, so the annual savings will be set to 0 and each year
        // the safe withdrawal percentage will be taken away from their asset allocations etc.
        this.engineState.hasRetired = true

        this.calculatePostRetirement()

        const outputs: PlanEngineOutputs = this.getOutputs()

        // Important
        this.engineState = this.initEngineState()

        return outputs
    }
}

export function getExcelWorkbook(outputs: PlanEngineOutputs): Workbook {
    const workbook = new Workbook()
    workbook.created = new Date()

    const worksheet = workbook.addWorksheet('FIRE Outlook')
    worksheet.headerFooter.oddHeader = 'FIRE Outlook'
    worksheet.columns = [
        { header: 'Age', key: 'age' },
        { header: 'Year', key: 'year' },
        { header: 'Networth', key: 'networth' }
    ]

    outputs.data.forEach(value => {
        worksheet.addRow({ age: value.age, year: value.year, networth: formatCurrency(value.networth) })
    })

    return workbook
}

export type TimeRangeFilter = '1Y' | '4Y' | '12Y' | 'Max'

export function filterTimeRange(data: RetirementProjectionPoint[], filter: TimeRangeFilter): RetirementProjectionPoint[] {
    if (filter === 'Max') {
        return data
    }

    return data.filter(projectionPoint => {
        switch (filter) {
            case '1Y':
                return projectionPoint.year <= data[0].year + 1
            case '4Y':
                return projectionPoint.year <= data[0].year + 4
            case '12Y':
                return projectionPoint.year <= data[0].year + 12
        }
    })
}

interface Total {
    networth: number
    stocks: number
    bonds: number
    cash: number
}

interface PlanEngineState {
    data: RetirementProjectionPoint[]
    age: number
    year: number
    total: Total

    annualSavings: number
    hasRetired: boolean

    adjStocksReturnRate: number
    adjBondsReturnRate: number
    adjCashReturnRate: number
}

export interface RetirementProjectionPoint {
    age: number
    year: number
    yearsElapsed: number
    networth: number
}

export interface FIRESummary {
    fireAge: number
    fireNumber: number
    retirementAge: number
    yearsTillRetirement: number
}

export interface PlanEngineOutputs {
    summary: FIRESummary
    data: RetirementProjectionPoint[]
}

export interface PlanEngineInputs {
    age: number
    annualIncome: number
    annualSpending: number
    networth: number

    safeWithdrawalRate: number
    inflationRate: number

    stocksAllocationRate: number
    bondsAllocationRate: number
    cashAllocationRate: number

    stocksReturnRate: number
    bondsReturnRate: number
    cashReturnRate: number

    incomeGrowthRate?: number
    retirementAge?: number
    maximumAge?: number
}
