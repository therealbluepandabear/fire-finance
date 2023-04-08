import { calculateRetirementAge } from './Calculator'

test('retirement age to be 33 and fire number to be $750,000', () => {
    const { retirementAge, fireNumber } = calculateRetirementAge({
        age: 20,
        annualIncome: 70_000,
        annualSpending: 30_000,
        networth: 0,
        investmentReturnRate: 7,
        safeWithdrawalRate: 4,
        inflationRate: 0
    })
    
    expect(retirementAge).toBe(33)
    expect(fireNumber).toBe(750_000)
})

test('retirement age to be 71 and fire number to be $1,250,000', () => {
    const { retirementAge, fireNumber } = calculateRetirementAge({
        age: 40,
        annualIncome: 68_000,
        annualSpending: 50_000,
        networth: 0,
        investmentReturnRate: 7,
        safeWithdrawalRate: 4,
        inflationRate: 2
    })
    
    expect(retirementAge).toBe(71)
    expect(fireNumber).toBe(1_250_000)
})

test('retirement age to be 91 and fire number to be close to $483,333', () => {
    const { retirementAge, fireNumber } = calculateRetirementAge({
        age: 18,
        annualIncome: 32_000,
        annualSpending: 29_000,
        networth: 340,
        investmentReturnRate: 3,
        safeWithdrawalRate: 6,
        inflationRate: 1
    })
    
    expect(retirementAge).toBe(91)
    expect(fireNumber).toBeCloseTo(483_333, 0)
})

test('retirement age to be 61 and fire number to be $10 million', () => {
    const { retirementAge, fireNumber } = calculateRetirementAge({
        age: 45,
        annualIncome: 700_000,
        annualSpending: 500_000,
        networth: 1_000_000,
        investmentReturnRate: 12,
        safeWithdrawalRate: 5,
        inflationRate: 3
    })
    
    expect(retirementAge).toBe(61)
    expect(fireNumber).toBe(10_000_000)
})

test('retirement age to be 85 and fire number to be $1 million', () => {
    const { retirementAge, fireNumber } = calculateRetirementAge({
        age: 56,
        annualIncome: 30_000,
        annualSpending: 10_000,
        networth: 60_000,
        investmentReturnRate: 3,
        safeWithdrawalRate: 1,
        inflationRate: 0
    })

    expect(retirementAge).toBe(85)
    expect(fireNumber).toBe(1_000_000)
})

export {}