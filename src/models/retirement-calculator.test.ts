import { FillPattern } from 'exceljs'
import { calculateRetirementAge, getExcelWorkbook } from './retirement-calculator'

test('(1) retirement age, fire number, and data to be correct', () => {
    const { fireAge: retirementAge, data, fireNumber } = calculateRetirementAge({
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

test('(2) retirement age, fire number, and data to be correct', () => {
    const { fireAge: retirementAge, data, fireNumber } = calculateRetirementAge({
        age: 40,
        annualIncome: 100_000,
        annualSpending: 85_000,
        networth: 670_000,
    
        safeWithdrawalRate: 0.04,
        inflationRate: 0.03,
    
        stocksAllocationRate: 1,
        bondsAllocationRate: 0,
        cashAllocationRate: 0,
    
        stocksReturnRate: 0.05,
        bondsReturnRate: 0,
        cashReturnRate: 0,

        incomeGrowthRate: 0.03
    })
    
    expect(retirementAge).toBe(67)

    expect(Math.floor(data[3].networth)).toBe(55_027)
    expect(Math.floor(data[9].networth)).toBe(267_155)
    expect(Math.floor(data[16].networth)).toBe(732_380)
    expect(Math.floor(data[12].networth)).toBe(434_056)

    expect(fireNumber).toBe(2_125_000)
})

test('handles retirement and maximum age correctly', () => {
    const { data } = calculateRetirementAge({
        age: 33,
        annualIncome: 60_000,
        annualSpending: 45_000,
        networth: 170_000,
    
        safeWithdrawalRate: 0.05,
        inflationRate: 0.03,
    
        stocksAllocationRate: 0.5,
        bondsAllocationRate: 0.5,
        cashAllocationRate: 0,
    
        stocksReturnRate: 0.08,
        bondsReturnRate: 0.03,
        cashReturnRate: 0,

        incomeGrowthRate: 0.02,

        retirementAge: 66,
        maximumAge: 100
    })

    expect(Math.floor(data[33].networth)).toBe(1_891_922)
    expect(Math.floor(data[28].networth)).toBe(1_330_552)
    expect(Math.floor(data[46].networth)).toBe(1_518_338)
    expect(Math.floor(data[67].networth)).toBe(1_208_079)
    expect(Math.floor(data[37].networth)).toBe(1_753_727)
    expect(Math.floor(data[25].networth)).toBe(1_059_301)

    const maxNetworth = Math.max(...data.map((value) => value.networth))
    
    expect(Math.floor(maxNetworth)).toBe(1_891_922)

    const maxPoint = data[data.findIndex((value) => value.networth === maxNetworth)]
    
    expect(maxPoint.age).toBe(66)
    expect(maxPoint.year).toBe(2056)

    expect(data.length).toBe(68)
})

test('handles only maximum age correctly', () => {
    const { data, fireAge: retirementAge } = calculateRetirementAge({
        age: 16,
        annualIncome: 20_000,
        annualSpending: 3_000,
        networth: 4_000,
    
        safeWithdrawalRate: 0.04,
        inflationRate: 0.05,
    
        stocksAllocationRate: 0.9,
        bondsAllocationRate: 0.1,
        cashAllocationRate: 0,
    
        stocksReturnRate: 0.04,
        bondsReturnRate: 0.06,
        cashReturnRate: 0,

        incomeGrowthRate: 0.02,
        maximumAge: 50
    })

    expect(retirementAge).toBe(21)
    expect(Math.floor(data[14].networth)).toBe(265_106)
    expect(Math.floor(data[16].networth)).toBe(308_330)
    expect(Math.floor(data[10].networth)).toBe(182_977)
    expect(Math.floor(data[27].networth)).toBe(575_325)

    const maxNetworth = Math.max(...data.map((value) => value.networth))

    expect(Math.floor(maxNetworth)).toBe(775_119)

    const maxPoint = data[data.findIndex((value) => value.networth === maxNetworth)]
    
    expect(maxPoint.age).toBe(50)
    expect(maxPoint.year).toBe(2057)

    expect(data.length).toBe(35)
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

    const rowIndex = outputs.fireAge - (outputs.data[0].age) + 2
    const row = worksheet.getRow(rowIndex)
    const cells = [row.getCell(1), row.getCell(2), row.getCell(3)]
    
    for (const cell of cells) {
        expect(cell.fill.type).toBe('pattern')

        const fillAsFillPattern = cell.fill as FillPattern
    
        expect(fillAsFillPattern.pattern).toBe('solid')
        expect(fillAsFillPattern.fgColor?.argb).toBe('ffd700')
    }
})

export {}