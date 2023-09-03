import { PlanEngine } from './retirement-calculator'

const planEngine = new PlanEngine({
    age: 20,
    annualIncome: 70_000,
    annualSpending: 30_000,
    networth: 0,
    safeWithdrawalRate: 0.04,
    inflationRate: 0,
    stocksAllocationRate: 1,
    bondsAllocationRate: 0,
    cashAllocationRate: 0,
    stocksReturnRate: 0.07,
    bondsReturnRate: 0,
    cashReturnRate: 0,
    maximumAge: 40
})

afterEach(() => {
    planEngine.getScenarioEngine().clearScenarios()
})

test('outputs data correct', () => {
    const outputs = planEngine.calculate()

    const data = outputs.data

    expect(Math.floor(data[0].networth)).toBe(0)
    expect(Math.floor(data[3].networth)).toBe(128_596)
    expect(Math.floor(data[8].networth)).toBe(410_392)
    expect(Math.floor(data[13].networth)).toBe(805_625)
    expect(Math.floor(data[18].networth)).toBe(1_359_961)
})

test(`scenarios action 'set' works`, () => {
    planEngine.getScenarioEngine().addScenario({ 
        name: 'Test Scenario 1',
        creationDate: new Date().toISOString(),
        trigger: { property: 'AGE', value: 25 },
        event: { property: 'NETWORTH', action: 'SET', amount: 15_000 }
    })

    const outputs = planEngine.calculate()

    expect(outputs.data[5].networth).toBe(15_000)
})

test(`scenarios action 'increase' works`, () => {
    planEngine.getScenarioEngine().addScenario({
        name: 'Test Scenario 1',
        creationDate: new Date().toISOString(),
        trigger: { property: 'AGE', value: 30 },
        event: { property: 'NETWORTH', action: 'INCREASE', amount: 30_000 }
    })

    const outputs = planEngine.calculate()

    expect(Math.floor(outputs.data[10].networth)).toBe(582_657)
})

test(`scenarios action 'decrease' works`, () => {
    planEngine.getScenarioEngine().addScenario({
        name: 'Test Scenario 1',
        creationDate: new Date().toISOString(),
        trigger: { property: 'AGE', value: 23 },
        event: { property: 'NETWORTH', action: 'DECREASE', amount: 10_000 }
    })

    const outputs = planEngine.calculate()

    expect(Math.floor(outputs.data[3].networth)).toBe(118_596)
})


export {}