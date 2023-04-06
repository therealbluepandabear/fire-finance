function compoundInterestFormula(
    principalBalance: number,
    annualInterestRate: number,
    timeInYears: number
): number {
    return principalBalance * (1 + annualInterestRate) ** timeInYears;
}

export function calculateRetirementAge(params: RetirementCalculatorInputs): number[] {
    const data: number[] = []

    for (let i = 0; i < 100; ++i) {
        data.push(compoundInterestFormula(params.networth, params.investmentReturnRate / 100, i))
    }

    return data
}

export interface RetirementCalculatorInputs {
    age: number,
    annualIncome: number,
    annualSpending: number,
    networth: number,
    investmentReturnRate: number,
    inflationRate: number,
    safeWithdrawalRate: number
}
