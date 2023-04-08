export function calculateRetirementAge(params: RetirementCalculatorInputs): RetirementCalculatorOutputs {    
    const data: { age: number, networth: number }[] = []

    const yearlySavings = params.annualIncome - params.annualSpending
    let money = params.networth
    let age = params.age

    function calculateMoney(): number {
        return money + yearlySavings + (money * (params.investmentReturnRate / 100))
    }

    while (money * (params.safeWithdrawalRate / 100) < params.annualSpending) {
        data.push({ age: age, networth: money })
        money = calculateMoney()

        ++age
    }

    data.push({ age: age, networth: money })
    money = calculateMoney()

    const retirementYears = 30

    for (let i = 1; i <= retirementYears; ++i) {
        data.push({ age: age + i, networth: money })
        money = calculateMoney()
    }

    return { 
        retirementAge: age,
        fireNumber: params.annualSpending / (params.safeWithdrawalRate / 100),
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
    investmentReturnRate: number,
    safeWithdrawalRate: number
}
