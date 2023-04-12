import { FillPattern } from 'exceljs'
import { calculateRetirementAge, getExcelWorkbook } from './Calculator'

test('retirement age, fire number, and data to be correct', () => {
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

test('excel workbook to be correct', () => {
    const outputs = calculateRetirementAge({
        age: 32,
        annualIncome: 60_000,
        annualSpending: 40_000,
        networth: 0,
    
        safeWithdrawalRate: 0.04,
        inflationRate: 0.03,
    
        stocksAllocationRate: 1,
        bondsAllocationRate: 0,
        cashAllocationRate: 0,
    
        stocksReturnRate: 0.03,
        bondsReturnRate: 0,
        cashReturnRate: 0
    })
    
    const workbook = getExcelWorkbook(outputs)
    const worksheet = workbook.getWorksheet('FIRE Outlook')

    expect(worksheet).toBeTruthy()

    const rowIndex = outputs.retirementAge - (outputs.data[0].age) + 2
    const cell = worksheet.getRow(rowIndex).getCell(1)

    expect(cell.fill.type).toBe('pattern')
    expect((cell.fill as FillPattern).pattern).toBe('solid')
    expect((cell.fill as FillPattern).fgColor?.argb).toBe('ffd700')
})

export {}