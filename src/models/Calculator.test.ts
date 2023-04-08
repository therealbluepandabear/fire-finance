import { calculateRetirementAge } from './Calculator'

test('retirement age to be 33', () => {
    expect(calculateRetirementAge({
        age: 20,
        annualIncome: 70_000,
        annualSpending: 30_000,
        networth: 0,
        investmentReturnRate: 7,
        safeWithdrawalRate: 4,
        inflationRate: 0
    }).retirementAge).toBe(33)
})

export {}