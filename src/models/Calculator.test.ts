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

test('retirement age to be 71', () => {
    expect(calculateRetirementAge({
        age: 40,
        annualIncome: 68_000,
        annualSpending: 50_000,
        networth: 0,
        investmentReturnRate: 7,
        safeWithdrawalRate: 4,
        inflationRate: 2
    }).retirementAge).toBe(71)
})

test('retirement age to be 91', () => {
    expect(calculateRetirementAge({
        age: 18,
        annualIncome: 32_000,
        annualSpending: 29_000,
        networth: 340,
        investmentReturnRate: 3,
        safeWithdrawalRate: 6,
        inflationRate: 1
    }).retirementAge).toBe(91)
})

test('retirement age to be 61', () => {
    expect(calculateRetirementAge({
        age: 45,
        annualIncome: 700_000,
        annualSpending: 500_000,
        networth: 1_000_000,
        investmentReturnRate: 12,
        safeWithdrawalRate: 5,
        inflationRate: 3
    }).retirementAge).toBe(61)
})

test('retirement age to be 85', () => {
    expect(calculateRetirementAge({
        age: 56,
        annualIncome: 30_000,
        annualSpending: 10_000,
        networth: 60_000,
        investmentReturnRate: 3,
        safeWithdrawalRate: 1,
        inflationRate: 0
    }).retirementAge).toBe(85)
})

export {}