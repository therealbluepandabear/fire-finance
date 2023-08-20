import { PlanEngine } from './retirement-calculator'

test('(1) retirement age, fire number, and data to be correct', () => {
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

    const outputs = planEngine.calculate()

    const data = outputs.data

    expect(Math.floor(data[0].networth)).toBe(0)
    expect(Math.floor(data[3].networth)).toBe(128_596)
    expect(Math.floor(data[8].networth)).toBe(410_392)
    expect(Math.floor(data[13].networth)).toBe(805_625)
    expect(Math.floor(data[18].networth)).toBe(1_359_961)
})

export {}