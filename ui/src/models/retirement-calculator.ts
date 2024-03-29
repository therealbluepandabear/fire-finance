import { Workbook } from 'exceljs'
import { formatCurrency } from '../utils'
import { adjustForInflation } from './calculator-utils'

function adjustEngineTotal(target: number, inputs: PlanEngineInputs): Total {
    return {
        stocks: target * inputs.stocksAllocationRate,
        bonds: target * inputs.bondsAllocationRate,
        cash: target * inputs.cashAllocationRate,
        networth: target
    }
}

interface PlanEngineObserver {
    update(engineState: PlanEngineState): void
}

class WithdrawalEngine implements PlanEngineObserver {
    constructor(private readonly inputs: PlanEngineInputs) {
        this.inputs = inputs
    }

    update(engineState: PlanEngineState): void {
        if (engineState.hasRetired) {
            switch (this.inputs.withdrawalStrategy.type) {
                case 'DEFAULT':
                    engineState.total = adjustEngineTotal(engineState.total.networth - engineState.annualSpending, this.inputs)
                    break
                case 'FIXED_DOLLAR':
                    engineState.total = adjustEngineTotal(engineState.total.networth - this.inputs.withdrawalStrategy.amount, this.inputs)
                    break
                case 'FIXED_PERCENTAGE':
                    engineState.total = adjustEngineTotal(engineState.total.networth - this.inputs.withdrawalStrategy.amount, this.inputs)
                    break  
            }
        }
    }
}

class ScenarioEngine implements PlanEngineObserver {
    private readonly scenarios: Scenario[] = []

    private readonly triggeredScenarios: Scenario[] = []

    constructor(private readonly inputs: PlanEngineInputs) {
        this.inputs = inputs
    }

    private applyAction(base: number, amount: ScenarioEvent['amount'], action: ScenarioEvent['action']): number {
        let newNumber = amount

        if (action === 'INCREASE') {
            newNumber = base + amount
        } else if (action === 'DECREASE') {
            newNumber = base - amount
        }

        return newNumber
    }

    update(engineState: PlanEngineState): void {
        for (const scenario of this.scenarios) {
            const isAgeMatch = scenario.trigger.property === 'AGE' && engineState.age === scenario.trigger.value

            const isNetworthMatch = !this.triggeredScenarios.includes(scenario) && scenario.trigger.property === 'NETWORTH' && engineState.total.networth >= scenario.trigger.value

            if (isAgeMatch || isNetworthMatch) {
                if (scenario.event.property === 'NETWORTH') {
                    let adjustedNetworth = this.applyAction(engineState.total.networth, scenario.event.amount, scenario.event.action)

                    engineState.total = adjustEngineTotal(adjustedNetworth, this.inputs)
                } else if (scenario.event.property === 'INCOME') {
                    let adjustedIncome = this.applyAction(engineState.annualIncome, scenario.event.amount, scenario.event.action)

                    engineState.annualIncome = adjustedIncome
                } else if (scenario.event.property === 'SPENDING') {
                    let adjustedSpending = this.applyAction(engineState.annualSpending, scenario.event.amount, scenario.event.action)

                    engineState.annualSpending = adjustedSpending
                }

                if (!this.triggeredScenarios.includes(scenario)) {
                    this.triggeredScenarios.push(scenario)
                }
            } 
        }
    }

    addScenario(scenario: Scenario): void {
        this.scenarios.push(scenario)
    }

    clearScenarios(): void {
        this.scenarios.length = 0
    }

    getScenarios(): Scenario[] {
        return this.scenarios
    }
}

class StateRecorderEngine implements PlanEngineObserver {
    constructor(private readonly inputs: PlanEngineInputs) {
        this.inputs = inputs
    }

    update(engineState: PlanEngineState): void {
        engineState.data.push({
            age: engineState.age,
            year: engineState.year,
            yearsElapsed: engineState.age - this.inputs.age,
            networth: engineState.total.networth
        })
    }
} 

export class PlanEngine {
    private readonly inputs: PlanEngineInputs
    private readonly scenarioEngine: ScenarioEngine
    private readonly observers: PlanEngineObserver[] = [];
    private engineState: PlanEngineState

    constructor(inputs: PlanEngineInputs) {
        this.inputs = inputs
        this.scenarioEngine = new ScenarioEngine(this.inputs)

        this.engineState = this.initEngineState()
        
        // It's important the observers are added in this order
        this.observers.push(new WithdrawalEngine(this.inputs))
        this.observers.push(this.scenarioEngine)
        this.observers.push(new StateRecorderEngine(this.inputs)) // make sure it's added after scenario engine
    }

    private notifyObservers(): void {
        for (const observer of this.observers) {
            observer.update(this.engineState)
        }
    }

    private initEngineState(): PlanEngineState {
        return { 
            total: adjustEngineTotal(this.inputs.networth, this.inputs),

            annualSavings: this.calculateAnnualSavings(),
            hasRetired: false,

            adjStocksReturnRate: adjustForInflation(this.inputs.stocksReturnRate, this.inputs.inflationRate),
            adjBondsReturnRate: adjustForInflation(this.inputs.bondsReturnRate, this.inputs.inflationRate),
            adjCashReturnRate: adjustForInflation(this.inputs.cashReturnRate, this.inputs.inflationRate),

            age: this.inputs.age,
            year: new Date().getFullYear(),

            data: [],
            checkpoints: [],

            annualIncome: this.inputs.annualIncome,
            annualSpending: this.inputs.annualSpending
        }
    }

    private calculateAnnualSavings(): number {
        if (this.engineState === undefined) {
            return this.inputs.annualIncome - this.inputs.annualSpending
        }

        return this.engineState.annualIncome - this.engineState.annualSpending
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
        // Only calculate at a point in time in which the user is not retired, this is 
        // because we are setting the savings to 0 when the user retires anyways, so this
        // function does not need to be called
        if (!this.engineState.hasRetired) {
            this.updateAnnualIncomeAndSavings()
        }

        this.updateTotal()
    }

    private calculateTotal(type: 'stocks' | 'bonds' | 'cash', allocationRate: number, returnRate: number): number {
        const savingsContribution = this.engineState.annualSavings * allocationRate

        const totalAmount = this.engineState.total[type] + (this.engineState.total[type] * returnRate) + savingsContribution

        return totalAmount
    }

    private updateAnnualIncomeAndSavings(): void {
        if (this.inputs.incomeGrowthRate) {
            this.engineState.annualIncome = this.engineState.annualIncome + (this.engineState.annualIncome * this.inputs.incomeGrowthRate)
        }

        this.engineState.annualSavings = this.calculateAnnualSavings()
    }

    private isFinanciallyIndependent(): boolean {
        return this.inputs.withdrawalStrategy.type === 'DEFAULT' && ((this.engineState.total.networth * this.inputs.withdrawalStrategy.safeWithdrawalRate) < this.engineState.annualSpending)
    }

    private calculatePreRetirement(): void {
        let endPreRetirementAge: number | null = null
        
        if (this.inputs.retirementAge || this.inputs.maximumAge) {
            if (this.inputs.maximumAge && !this.inputs.retirementAge) {
                endPreRetirementAge = this.inputs.maximumAge
            } else if (this.inputs.maximumAge && this.inputs.retirementAge) {
                endPreRetirementAge = this.inputs.retirementAge
            }
        }

        const runLoopCriteria = () => {
            if (endPreRetirementAge) {
                return this.engineState.age < endPreRetirementAge
            }
            return this.isFinanciallyIndependent()
        }

        // Initial state
        this.notifyObservers()

        while (runLoopCriteria()) {
            this.update()

            ++this.engineState.age
            ++this.engineState.year

            this.notifyObservers()
        }
    }

    private calculatePostRetirement(): void {
        // Set annual savings to 0, the person will be retired at this point of time so they are not
        // capable of 'saving' anything as they are not working at a job
        this.engineState.annualSavings = 0

        if (this.inputs.maximumAge && this.inputs.retirementAge) {
            for (let i = 1; i <= (this.inputs.maximumAge - this.inputs.retirementAge); ++i) {
                this.update()
            
                ++this.engineState.age
                ++this.engineState.year

                this.notifyObservers()
            }
        }
    }

    private getOutputs(): PlanEngineOutputs {
        const fireNumber = this.inputs.withdrawalStrategy.type === 'DEFAULT' ? (this.engineState.annualSpending / this.inputs.withdrawalStrategy.safeWithdrawalRate) : NaN

        return {
            summary: {
                fireAge: this.engineState.data.find(point => point.networth >= fireNumber)?.age ?? NaN,
                fireNumber: fireNumber,
                retirementAge: this.inputs.retirementAge ?? this.engineState.age,
                yearsTillRetirement: (this.inputs.retirementAge ?? this.engineState.age) - this.inputs.age
            },
            data: this.engineState.data,
            checkpoints: this.engineState.checkpoints
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

    getScenarioEngine(): ScenarioEngine {
        return this.scenarioEngine
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

export type TimeRangeFilter = '1Y' | '4Y' | '12Y' | 'MAX'

export function filterTimeRange(data: ProjectionPoint[], filter: TimeRangeFilter): ProjectionPoint[] {
    if (filter === 'MAX') {
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

interface ScenarioTrigger {
    property: 'AGE' | 'NETWORTH'
    value: number
}

interface ScenarioEvent {
    property: 'INCOME' | 'SPENDING' | 'NETWORTH'
    action: 'SET' | 'INCREASE' | 'DECREASE'
    amount: number
}

export interface Scenario {
    name: string
    creationDate: string
    trigger: ScenarioTrigger
    event: ScenarioEvent
}

interface Total {
    networth: number
    stocks: number
    bonds: number
    cash: number
}

export interface PlanCheckpoint {
    text: string
    type: 'MILESTONE' | 'RETIREMENT' | 'FINANCIAL-INDEPENDENCE'
    point: ProjectionPoint
}

export type WithdrawalStrategy = 
    { type: 'DEFAULT', safeWithdrawalRate: number } | 
    { type: 'FIXED_PERCENTAGE', amount: number } | 
    { type: 'FIXED_DOLLAR', amount: number }

interface PlanEngineState {
    data: ProjectionPoint[]
    checkpoints: PlanCheckpoint[]
    age: number
    year: number
    total: Total

    annualSavings: number
    hasRetired: boolean

    adjStocksReturnRate: number
    adjBondsReturnRate: number
    adjCashReturnRate: number

    annualIncome: number
    annualSpending: number
}

export interface ProjectionPoint {
    age: number
    year: number
    yearsElapsed: number
    networth: number
}

export interface PlanSummary {
    fireAge: number
    fireNumber: number
    retirementAge: number
    yearsTillRetirement: number
}

export interface PlanEngineOutputs {
    summary: PlanSummary
    data: ProjectionPoint[]
    checkpoints: PlanCheckpoint[]
}

export interface PlanEngineInputs {
    age: number
    annualIncome: number
    annualSpending: number
    networth: number

    inflationRate: number

    stocksAllocationRate: number
    bondsAllocationRate: number
    cashAllocationRate: number

    stocksReturnRate: number
    bondsReturnRate: number
    cashReturnRate: number

    withdrawalStrategy: WithdrawalStrategy

    incomeGrowthRate?: number
    retirementAge?: number
    maximumAge?: number
}
