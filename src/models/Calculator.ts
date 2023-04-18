import { Workbook } from 'exceljs'
import { currency } from '../utils'

function calculateAdjustedReturnRate(params: RetirementCalculatorInputs) {
    return {
        adjustedStocksReturnRate: ((1 + params.stocksReturnRate) / (1 + params.inflationRate)) - 1,
        adjustedBondsReturnRate: ((1 + params.bondsReturnRate) / (1 + params.inflationRate)) - 1,
        adjustedCashReturnRate: ((1 + params.cashReturnRate) / (1 + params.inflationRate)) - 1
    }
}

export function calculateRetirementAge(params: RetirementCalculatorInputs): RetirementCalculatorOutputs {    
    const data: RetirementProjectionPoint[] = []

    let hasRetired = false

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

    // Starting age and year which will be incrementally updated in the loop
    let age = params.age
    let year = new Date().getFullYear()

    function calculateTotalStocks(): number {
        const stocksSavingsContribution = (annualSavings * params.stocksAllocationRate)

        let totalStocks = total.stocks + (total.stocks * adjustedStocksReturnRate) + stocksSavingsContribution

        // Take away the safe withdrawal amount as the user is retired
        if (hasRetired) {
            totalStocks = totalStocks * (1 - params.safeWithdrawalRate)
        }

        return totalStocks
    }

    function calculateTotalBonds(): number {
        const bondsSavingsContribution = (annualSavings * params.bondsAllocationRate)

        let totalBonds = total.bonds + (total.bonds * adjustedBondsReturnRate) + bondsSavingsContribution

        // Take away the safe withdrawal amount as the user is retired
        if (hasRetired) {
            totalBonds = totalBonds * (1 - params.safeWithdrawalRate)
        }

        return totalBonds
    }

    function calculateTotalCash(): number {
        const cashSavingsContribution = (annualSavings * params.cashAllocationRate)

        let totalCash = total.cash + (total.cash * adjustedCashReturnRate) + cashSavingsContribution

        // Take away the safe withdrawal amount as the user is retired
        if (hasRetired) {
            totalCash = totalCash * (1 - params.safeWithdrawalRate)
        }

        return totalCash
    }

    function calculateTotalNetworth(): number {
        return total.stocks + total.bonds + total.cash
    }

    function updateTotal(): void {
        // Update total stocks
        total.stocks = calculateTotalStocks()
        
        // Update total bonds
        total.bonds = calculateTotalBonds()

        // Update total cash
        total.cash = calculateTotalCash()

        // Update total networth
        total.networth = calculateTotalNetworth()
    }

    function calculateAnnualSavings(): number {
        return annualIncome - params.annualSpending
    }

    function updateAnnualIncomeAndSavings() {
        if (params.incomeGrowthRate) {
            annualIncome = annualIncome + (annualIncome * params.incomeGrowthRate)
        }

        annualSavings = calculateAnnualSavings()
    }

    function update() {
        updateTotal()

        // Only calculate at a point in time in which the user is not retired, this is 
        // because we are setting the savings to 0 when the user retires anyways, so this
        // function does not need to be called
        if (!hasRetired) {
            updateAnnualIncomeAndSavings()
        }
    }

    while ((total.networth * params.safeWithdrawalRate) < params.annualSpending) {
        data.push({ age: age, year: year, networth: total.networth })
        update()

        ++age
        ++year
    }

    data.push({ age: age, year: year, networth: total.networth })

    // Calculate for the extra years after financial independence (if the user has specified a maximum age)
    if (params.retirementAge || params.maximumAge) {
        let ageToQuery: number = 0

        if (params.maximumAge && !params.retirementAge) {
            ageToQuery = params.maximumAge
        } else if (params.maximumAge && params.retirementAge) {
            ageToQuery = params.retirementAge
        }

        let extraAge = age

        while (extraAge < ageToQuery) {
            update()
            data.push({ age: ++extraAge, year: ++year, networth: total.networth })
        }
    }

    // At this point the user has retired, so the annual savings will be set to 0 and each year
    // the safe withdrawal percentage will be taken away from their asset allocations etc.
    hasRetired = true

    // Set annual savings to 0, the person will be retired at this point of time so they are not
    // capable of 'saving' anything as they are not working at a job
    annualSavings = 0

    if (params.maximumAge && params.retirementAge) {
        for (let i = 1; i <= (params.maximumAge - params.retirementAge); ++i) {
            update()      
            data.push({ age: params.retirementAge + i, year: ++year, networth: total.networth })
        }
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
        worksheet.addRow({ age: value.age, year: value.year, networth: currency(value.networth) })
    })

    const retirementAgeRowIndex = outputs.retirementAge - (outputs.data[0].age) + 2

    const row = worksheet.getRow(retirementAgeRowIndex)
    const cellsToHighlight = [row.getCell(1), row.getCell(2), row.getCell(3)]

    for (const cell of cellsToHighlight) {
        cell.fill = {
            type: 'pattern',
            pattern: 'solid',
            fgColor: { argb: 'ffd700' }
        }
    }

    return workbook
}

interface RetirementProjectionPoint {
    age: number
    year: number
    networth: number
}

export interface RetirementCalculatorOutputs {
    retirementAge: number,
    fireNumber: number,
    data: RetirementProjectionPoint[]
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
    retirementAge?: number
    maximumAge?: number
}
