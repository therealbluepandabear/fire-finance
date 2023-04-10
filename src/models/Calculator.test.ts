import { calculateRetirementAge } from './Calculator'

test('1 >> retirement age, fire number, and data to be correct', () => {
    const { retirementAge, data, fireNumber } = calculateRetirementAge({
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
        cashReturnRate: 0
    })
    
    expect(retirementAge).toBe(33)
    expect(Math.floor(data[2].networth)).toBe(82_800)
    expect(Math.floor(data[7].networth)).toBe(346_160)
    expect(Math.floor(data[4].networth)).toBe(177_597)
    expect(Math.floor(data[13].networth)).toBe(805_625)
    expect(fireNumber).toBe(750_000)
})

test('2 >> retirement age, fire number, and data to be correct', () => {
    const { retirementAge, data, fireNumber } = calculateRetirementAge({
        age: 36,
        annualIncome: 120_000,
        annualSpending: 50_000,
        networth: 4_000,
    
        safeWithdrawalRate: 0.04,
        inflationRate: 0,
    
        stocksAllocationRate: 1,
        bondsAllocationRate: 0,
        cashAllocationRate: 0,
    
        stocksReturnRate: 0.07,
        bondsReturnRate: 0,
        cashReturnRate: 0
    })
    
    expect(retirementAge).toBe(48)
})

export {}