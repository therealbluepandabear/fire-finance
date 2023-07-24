import { Workbook } from 'exceljs'
import { formatCurrency } from '../utils'
import { adjustForInflation } from './calculator-utils'

// Calculates the adjusted return rates by factoring in inflation using a specialized formula
function calculateAdjustedReturnRate(params: RetirementCalculatorInputs) {
    return {
        adjStocksReturnRate: adjustForInflation(params.stocksReturnRate, params.inflationRate),
        adjBondsReturnRate: adjustForInflation(params.bondsReturnRate, params.inflationRate),
        adjCashReturnRate: adjustForInflation(params.cashReturnRate, params.inflationRate)
    }
}

export function calculateRetirementAge(params: RetirementCalculatorInputs): RetirementCalculatorOutputs {    
    const data: RetirementProjectionPoint[] = []

    let hasRetired = false

    let annualIncome = params.annualIncome
    let annualSavings = calculateAnnualSavings()

    const total = { 
        networth: params.networth, 
        stocks: params.networth * params.stocksAllocationRate, 
        bonds: params.networth * params.bondsAllocationRate, 
        cash: params.networth * params.cashAllocationRate
    }

    // Calculates the adjusted return RATE by factoring in inflation
    const { adjStocksReturnRate, adjBondsReturnRate, adjCashReturnRate } = calculateAdjustedReturnRate(params)

    // Starting age and year which will be incrementally updated in the loop
    let age = params.age
    let year = new Date().getFullYear()

    function calculateTotal(type: 'stocks' | 'bonds' | 'cash', allocationRate: number, returnRate: number): number {
        const savingsContribution = annualSavings * allocationRate

        let totalAmount = total[type] + (total[type] * returnRate) + savingsContribution

        // Take away the expenses amount each year as the user is retired
        if (hasRetired) {
            totalAmount -= params.annualSpending
        }

        return totalAmount
    }

    function calculateTotalNetworth(): number {
        return total.stocks + total.bonds + total.cash
    }

    function updateTotal(): void {
        // Update total stocks
        total.stocks = calculateTotal('stocks', params.stocksAllocationRate, adjStocksReturnRate)
        
        // Update total bonds
        total.bonds = calculateTotal('bonds', params.bondsAllocationRate, adjBondsReturnRate)

        // Update total cash
        total.cash = calculateTotal('cash', params.cashAllocationRate, adjCashReturnRate)

        // Update total networth
        total.networth = calculateTotalNetworth()
    }

    function calculateAnnualSavings(): number {
        return annualIncome - params.annualSpending
    }

    function updateAnnualIncomeAndSavings() {
        if (params.incomeGrowthRate) {
            annualIncome = annualIncome + (annualIncome * params.incomeGrowthRate)
        }

        annualSavings = calculateAnnualSavings()
    }

    function update() {
        updateTotal()

        // Only calculate at a point in time in which the user is not retired, this is 
        // because we are setting the savings to 0 when the user retires anyways, so this
        // function does not need to be called
        if (!hasRetired) {
            updateAnnualIncomeAndSavings()
        }
    }

    while ((total.networth * params.safeWithdrawalRate) < params.annualSpending) {
        data.push({ age: age, year: year, networth: total.networth })
        update()

        ++age
        ++year
    }

    data.push({ age: age, year: year, networth: total.networth })

    // Calculate for the extra years after financial independence (if the user has specified a maximum age)
    if (params.retirementAge || params.maximumAge) {
        let ageToQuery: number = 0

        if (params.maximumAge && !params.retirementAge) {
            ageToQuery = params.maximumAge
        } else if (params.maximumAge && params.retirementAge) {
            ageToQuery = params.retirementAge
        }

        let extraAge = age

        while (extraAge < ageToQuery) {
            update()
            data.push({ age: ++extraAge, year: ++year, networth: total.networth })
        }
    }

    // At this point the user has retired, so the annual savings will be set to 0 and each year
    // the safe withdrawal percentage will be taken away from their asset allocations etc.
    hasRetired = true

    // Set annual savings to 0, the person will be retired at this point of time so they are not
    // capable of 'saving' anything as they are not working at a job
    annualSavings = 0

    if (params.maximumAge && params.retirementAge) {
        for (let i = 1; i <= (params.maximumAge - params.retirementAge); ++i) {
            update()      
            data.push({ age: params.retirementAge + i, year: ++year, networth: total.networth })
        }
    }

    // fireNumber is the minimum amount of money needed for retirement
    const fireNumber = params.annualSpending / params.safeWithdrawalRate

    return { 
        summary: { 
            fireAge: age,
            fireNumber: fireNumber,
            retirementAge: params.retirementAge ?? age,
            yearsTillRetirement: (params.retirementAge ?? age) - params.age
        },
        data: data,
    }
}

export function getExcelWorkbook(outputs: RetirementCalculatorOutputs): Workbook {
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

export interface RetirementProjectionPoint {
    age: number
    year: number
    networth: number
}

export interface FIRESummary {
    fireAge: number
    fireNumber: number
    retirementAge: number
    yearsTillRetirement: number
}

export interface RetirementCalculatorOutputs {
    summary: FIRESummary
    data: RetirementProjectionPoint[]
}

export interface RetirementCalculatorInputs {
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
