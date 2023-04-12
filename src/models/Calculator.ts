import { Workbook } from 'exceljs'
import { currency } from '../utils'

function calculateAdjustedReturnRate(params: RetirementCalculatorInputs) {
    return {
        adjustedStocksReturnRate: params.stocksReturnRate - params.inflationRate,
        adjustedBondsReturnRate: params.bondsReturnRate - params.inflationRate,
        adjustedCashReturnRate: params.cashReturnRate - params.inflationRate
    }
}

export function calculateRetirementAge(params: RetirementCalculatorInputs): RetirementCalculatorOutputs {    
    const data: { age: number, networth: number }[] = []

    let annualIncome = params.annualIncome
    let annualSavings = calculateAnnualSavings()

    const total = { 
        networth: 0, 
        stocks: 0, 
        bonds: 0, 
        cash: 0
    }

    // Calculates the adjusted return RATE by factoring in inflation
    const { adjustedStocksReturnRate, adjustedBondsReturnRate, adjustedCashReturnRate } = calculateAdjustedReturnRate(params)

    let age = params.age

    function calculateTotalStocks(): number {
        const stocksSavingsContribution = (annualSavings * params.stocksAllocationRate)

        return total.stocks + (total.stocks * adjustedStocksReturnRate) + stocksSavingsContribution
    }

    function calculateTotalBonds(): number {
        const bondsSavingsContribution = (annualSavings * params.bondsAllocationRate)

        return total.bonds + (total.bonds * adjustedBondsReturnRate) + bondsSavingsContribution
    }

    function calculateTotalCash(): number {
        const cashSavingsContribution = (annualSavings * params.cashAllocationRate)

        return total.cash + (total.cash * adjustedCashReturnRate) + cashSavingsContribution
    }

    function calculateTotalNetworth(): number {
        return total.stocks + total.bonds + total.cash
    }

    function updateTotal(): void {
        // Calculate total stocks
        total.stocks = calculateTotalStocks()
        
        // Calculate total bonds
        total.bonds = calculateTotalBonds()

        // Calculate total cash
        total.cash = calculateTotalCash()

        // Calculate total networth
        total.networth = calculateTotalNetworth()
    }
    
    function calculateAnnualSavings(): number {
        return annualIncome - params.annualSpending
    }

    function updateAnnualIncome() {
        if (params.incomeGrowthRate) {
            annualIncome = annualIncome + (annualIncome * params.incomeGrowthRate)
            annualSavings = calculateAnnualSavings()
        }
    }

    while ((total.networth * params.safeWithdrawalRate) < params.annualSpending) {
        data.push({ age: age, networth: total.networth })
        updateTotal()
        updateAnnualIncome()

        ++age
    }

    data.push({ age: age, networth: total.networth })
    updateTotal()

    // Calculate for the next 30 years after retirement
    const retirementYears = 30

    for (let i = 1; i <= retirementYears; ++i) {
        data.push({ age: age + i, networth: total.networth })
        updateTotal()
    }

    // fireNumber is the minimum amount of money needed for retirement
    const fireNumber = params.annualSpending / params.safeWithdrawalRate

    return { 
        retirementAge: age,
        fireNumber: fireNumber,
        data: data
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

    outputs.data.forEach((value, index) => {
        worksheet.addRow({ age: value.age, year: new Date().getFullYear() + index, networth: currency(value.networth) })
    })

    const retirementAgeRowIndex = outputs.retirementAge - (outputs.data[0].age) + 2

    const row = worksheet.getRow(retirementAgeRowIndex)
    const cellsToHighlight = [row.getCell(1), row.getCell(2), row.getCell(3)]

    const highlightColor = 'ffd700'

    for (const cell of cellsToHighlight) {
        cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: highlightColor }
        }
    }

    return workbook
}

export interface RetirementCalculatorOutputs {
    retirementAge: number,
    fireNumber: number,
    data: { age: number, networth: number }[]
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
}
