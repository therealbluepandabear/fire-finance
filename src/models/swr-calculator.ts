// This retirement calculator estimates the chance of success given a certain retirement plan. It does this
// by simulating how the plan would play out given the user had (theoretically) begun their retirement plan at a particular
// point in time -- this considers the historical, annual return rate of the stock market for each year throughout history.

// This interface represents a historical, yearly data point for the S&P 500 index
interface StandardsAndPoorsHistoricalPoint {
    year: number
    annualReturnRate: number
}

async function fetchHistoricalReturnData(): Promise<StandardsAndPoorsHistoricalPoint[]> {
    const result = await fetch('data/stocks_return.json')
    return await result.json()
}

// This function calculates whether or not retirement is possible given the current networth
// and the input data. First it calculates the annual spending as being the starting networth times the
// safe withdrawal rate. It then checks whether or not multiply the safe withdrawal rate by the current
// networth yields a value that is equal to or bigger than annual spending.
function isRetirementPossible(params: SWRCalculatorInputs, currentNetworth: number): boolean {
    const annualSpending = params.networth * params.safeWithdrawalRate

    return (currentNetworth * params.safeWithdrawalRate) >= annualSpending
}

export async function calculateChanceOfSuccess(params: SWRCalculatorInputs): Promise<SWRCalculatorOutputs> {
    // Represents the historical S&P data from 1930-2022 as an array (loaded from JSON)
    let data: StandardsAndPoorsHistoricalPoint[] = []

    if (localStorage.getItem('stocks_return')) {
        data = JSON.parse(localStorage.getItem('stocks_return')!)
    } else {
        data = await fetchHistoricalReturnData()
    }
    

    const outputs: SWRCalculatorOutputs = { results: [] }

    // This year is the earliest year for which historical data for the S&P 500 index is available
    // ...as of now this is 1930
    let year = data[0].year
    let sliceIndex = 0
    let sliceLength = params.duration

    while (sliceIndex < 40) {
        let totalNetworth = params.networth
        let slicedData = data.slice(sliceIndex, (sliceIndex + sliceLength) + 1)

        // Represents the investment data for each investment period iteration
        let timelineData: InvestmentTimelinePoint[] = []

        slicedData.forEach((point, index) => {
            timelineData.push({ 
                investmentYear: index, 
                networth: totalNetworth
            })
            
            if (index < slicedData.length - 1) {
                const savingsContribution = totalNetworth + (totalNetworth * point.annualReturnRate)
                totalNetworth = savingsContribution * (1 - params.safeWithdrawalRate) 
            }
        })

        outputs.results.push({ 
            year: year, 
            finalNetworth: totalNetworth, 
            isRetirementPossible: isRetirementPossible(params, totalNetworth), 
            timelineData: timelineData 
        })

        ++sliceIndex
        ++year
    }

    return outputs
}

// This interface represents a certain (theoretical) point in history on the investment timeline
export interface InvestmentTimelinePoint {
    investmentYear: number
    networth: number
}

// This interface represents the result of whether or not a retirement plan would have succeeded 
// given it could theoretically begin at a certain point in time
export interface StartingYearResult {
    year: number
    finalNetworth: number
    isRetirementPossible: boolean

    timelineData: InvestmentTimelinePoint[]
}

// For this calculator, the user simply has to enter a networth and duration. They don't need to
// input the annual income as it is just assumed to be networth * safeWithdrawalRate (which is usually 4%)
export interface SWRCalculatorInputs {
    networth: number
    duration: number
    safeWithdrawalRate: number
}

export interface SWRCalculatorOutputs {
    results: StartingYearResult[]
}