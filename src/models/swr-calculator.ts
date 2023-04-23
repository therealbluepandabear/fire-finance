// This retirement calculator estimates the chance of success given a certain retirement plan. It does this
// by simulating how the plan would play out given the user had (theoretically) begun their retirement plan at a particular
// point in time -- this considers the historical, annual return rate of the stock market for each year throughout history.

// This interface represents a historical, yearly data point for the S&P 500 index
interface StandardsAndPoorsHistoricalPoint {
    year: number
    annualReturnRate: number
}


async function fetchHistoricalReturnData(): Promise<StandardsAndPoorsHistoricalPoint[]> {
    if (localStorage.getItem('stocks_return')) {
        return JSON.parse(localStorage.getItem('stocks_return')!)
    } else {
        const result = await fetch('data/stocks_return.json')
        return await result.json()
    }
}


export interface CycleInfo {
    failures: number
    total: number
    successRate: number
}


// Gets the information in a cycle-based format based on the outputs the calculator has given.
export function getCycleInfo(params: SWRCalculatorOutputs): CycleInfo {
    let failures = params.results.filter((result) => result.isRetirementPossible === false).length

    let total = params.results.length
    let successRate = (100 - ((failures / total) * 100)) / 100

    return {
        failures: failures,
        total: total,
        successRate: successRate
    }
}


// This function calculates whether or not retirement is possible given the current networth
// and the input data. First it calculates the annual spending as being the starting networth times the
// safe withdrawal rate. It then checks whether or not multiply the safe withdrawal rate by the current
// networth yields a value that is equal to or bigger than annual spending.
function isRetirementPossible(params: SWRCalculatorInputs, currentNetworth: number): boolean {
    const annualSpending = params.networth * params.safeWithdrawalRate

    return (currentNetworth * params.safeWithdrawalRate) >= annualSpending
}


function generateSimulationData(params: SWRCalculatorInputs, data: StandardsAndPoorsHistoricalPoint[]): StandardsAndPoorsHistoricalPoint[][] {
    const toReturn: StandardsAndPoorsHistoricalPoint[][] = []

    if (!params.shouldLoop) {
        const maxStartYear = data.at(-1)!.year - params.duration
        const minStartYear = data[0].year

        const maxIndex = maxStartYear - minStartYear

        for (let i = 0; i <= maxIndex; ++i) {
            toReturn.push(data.slice(i, (params.duration + i) + 1))
        }
    } else {
        for (let i = 0; i < data.length; ++i) {
            const maxSliceIndex = i + params.duration + 1
            const hasRem = maxSliceIndex > data.length

            if (!hasRem) {
                toReturn.push(data.slice(i, maxSliceIndex))
            } else {
                const rem = maxSliceIndex - data.length

                const sliceA = data.slice(i, maxSliceIndex - rem) // acts like Math.clamp function
                const sliceB = data.slice(0, rem)

                toReturn.push(sliceA.concat(sliceB))
            }
        }
    }

    return toReturn
}


export async function calculateChanceOfSuccess(params: SWRCalculatorInputs): Promise<SWRCalculatorOutputs> {
    // Represents the historical S&P data from 1930-2022 as an array (loaded from JSON)
    let data: StandardsAndPoorsHistoricalPoint[] = await fetchHistoricalReturnData()

    params.shouldLoop = true

    const outputs: SWRCalculatorOutputs = { results: [] }
    

    for (let slice of generateSimulationData(params, data)) {
        let totalNetworth = params.networth

        // Represents the investment data for each investment period iteration
        let timelineData: InvestmentTimelinePoint[] = []

        slice.forEach((point, index) => {
            timelineData.push({ 
                year: point.year,
                investmentYear: index, 
                networth: totalNetworth
            })
            
            if (index < slice.length - 1) {
                const savingsContribution = totalNetworth + (totalNetworth * point.annualReturnRate)
                totalNetworth = savingsContribution * (1 - params.safeWithdrawalRate) 
            }
        })

        outputs.results.push({ 
            year: slice[0].year, 
            finalNetworth: totalNetworth, 
            averageNetworth: (timelineData.map((obj) => obj.networth).reduce((acc, cur) => acc + cur)) / timelineData.length,
            isRetirementPossible: isRetirementPossible(params, totalNetworth), 
            timelineData: timelineData 
        })
    }

    return outputs
}


// This interface represents a certain (theoretical) point in history on the investment timeline
export interface InvestmentTimelinePoint {
    investmentYear: number
    // NOTE: Might seem useless but it is important as looped years exist
    year: number                                
    networth: number
}


// This interface represents the result of whether or not a retirement plan would have succeeded 
// given it could theoretically begin at a certain point in time
export interface StartingYearResult {
    year: number

    finalNetworth: number
    averageNetworth: number

    isRetirementPossible: boolean

    timelineData: InvestmentTimelinePoint[]
}


// For this calculator, the user simply has to enter a networth and duration. They don't need to
// input the annual income as it is just assumed to be networth * safeWithdrawalRate (which is usually 4%)
export interface SWRCalculatorInputs {
    networth: number
    duration: number

    strategy: SWRStrategy
    safeWithdrawalRate: number

    shouldLoop: boolean
}


export interface SWRCalculatorOutputs {
    results: StartingYearResult[]
}


// This models the safe withdrawal rate strategy to use for the simulation. Fixed-percentage strategy is a 
// strategy which basically pulls X% each year from your investment portfolio. This is not the strategy used 
// in the original trinity study though it still may be useful.
//
// The initial percentage strategy is the strategy used in the original trinity study. It basically means that
// for the first year you pull X% from your investment portfolio -- giving you a total of $Z. For the years after
// you simply pull the $Z from your investment portfolio until you have no money left.
type SWRStrategy = 'fixed-percentage' | 'initial-percentage'