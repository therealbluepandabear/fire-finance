function calculateAnnualSavings(params: RetirementCalculatorInputs): number {
    return params.annualIncome - params.annualSpending
}

function calculateAdjustedReturnRate(params: RetirementCalculatorInputs) {
    return {
        adjustedStocksReturnRate: params.stocksReturnRate - params.inflationRate,
        adjustedBondsReturnRate: params.bondsReturnRate - params.inflationRate,
        adjustedCashReturnRate: params.cashReturnRate - params.inflationRate
    }
}

export function calculateRetirementAge(params: RetirementCalculatorInputs): RetirementCalculatorOutputs {    
    const data: { age: number, networth: number }[] = []

    const annualSavings = calculateAnnualSavings(params)

    const total = { 
        networth: params.networth, 
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

    while ((total.networth * params.safeWithdrawalRate) < params.annualSpending) {
        data.push({ age: age, networth: total.networth })
        updateTotal()

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

export interface RetirementCalculatorOutputs {
    retirementAge: number,
    fireNumber: number,
    data: { age: number, networth: number }[]
}

export interface RetirementCalculatorInputs {
    age: number,
    annualIncome: number,
    annualSpending: number,
    networth: number,

    safeWithdrawalRate: number,
    inflationRate: number,

    stocksAllocationRate: number,
    bondsAllocationRate: number,
    cashAllocationRate: number,

    stocksReturnRate: number
    bondsReturnRate: number,
    cashReturnRate: number
}
