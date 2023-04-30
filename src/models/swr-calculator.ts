// This retirement calculator estimates the chance of success given a certain retirement plan. It does this
// by simulating how the plan would play out given the user had (theoretically) begun their retirement plan at a particular
// point in time -- this considers the historical, annual return rate of the stock market for each year throughout history.

import { average } from '../utils'
import { adjustForInflation } from './calculator-utils'

// This interface represents a historical, yearly data point for the S&P 500 index
export interface HistoricalPoint {
    year: number

    stocksReturnRate: number
    goldReturnRate: number
    bondsReturnRate: number
    inflationRate: number
}


// Data may not be 100 percent accurate
async function fetchHistoricalReturnData(): Promise<HistoricalPoint[]> {
    if (localStorage.getItem('yearly_return')) {
        return JSON.parse(localStorage.getItem('yearly_return')!)
    } else {
        const result = await fetch('data/yearly_return.json')
        return await result.json()
    }
}


export interface CycleInfo {
    successes: number
    failures: number

    total: number

    successRate: number
    failureRate: number

    bestPerformingStartYear: number
    worstPerformingStartYear: number
}


// Gets the information in a cycle-based format based on the outputs the calculator has given.
export function getCycleInfo(params: SWRCalculatorOutputs): CycleInfo {
    const successes = params.results.filter((result) => result.isRetirementPossible).length
    const failures = params.results.filter((result) => !result.isRetirementPossible).length

    const total = params.results.length

    const successRate = (100 - ((failures / total) * 100)) / 100
    const failureRate = ((failures / total) * 100) / 100

    let bestPerformingResult = params.results[0]
    let worstPerformingResult = params.results[0]

    for (const result of params.results) {
        const averageNetworth = average(result.timelineData.map((point) => point.networth))

        if (averageNetworth > average(bestPerformingResult.timelineData.map((point) => point.networth))) {
            bestPerformingResult = result
        }

        if (averageNetworth < average(worstPerformingResult.timelineData.map((point) => point.networth))) {
            worstPerformingResult = result
        }
    }

    return {
        successes: successes,
        failures: failures,
        total: total,
        successRate: successRate,
        failureRate: failureRate,
        bestPerformingStartYear: bestPerformingResult.year,
        worstPerformingStartYear: worstPerformingResult.year
    }
}


// This function calculates whether or not retirement is possible given the current networth
// and the input data. First it calculates the annual spending as being the starting networth times the
// safe withdrawal rate. It then checks whether or not multiply the safe withdrawal rate by the current
// networth yields a value that is equal to or bigger than annual spending.
function isRetirementPossible(params: SWRCalculatorInputs, currentNetworth: number, initialNetworth?: number): boolean {
    if (params.strategy === 'fixed-percentage') {
        const annualSpending = params.networth * params.safeWithdrawalRate

        return (currentNetworth * params.safeWithdrawalRate) >= annualSpending
    } 

    if (!initialNetworth) {
        throw new Error('`initialNetworth` must be defined if strategy is not fixed-percentage')
    }

    return currentNetworth >= (initialNetworth * params.safeWithdrawalRate)
}


function generateSimulationData(params: SWRCalculatorInputs, data: HistoricalPoint[]): HistoricalPoint[][] {
    const toReturn: HistoricalPoint[][] = []

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

function calculateAdjustedReturnRate(params: SWRCalculatorInputs, point: HistoricalPoint) {
    if (params.adjustForInflation) {
        return {
            adjustedStocksReturnRate: adjustForInflation(point.stocksReturnRate, point.inflationRate),
            adjustedGoldReturnRate: adjustForInflation(point.goldReturnRate, point.inflationRate),
            adjustedBondsReturnRate: adjustForInflation(point.bondsReturnRate, point.inflationRate)
        }
    }

    return {
        adjustedStocksReturnRate: point.stocksReturnRate,
        adjustedGoldReturnRate: point.goldReturnRate,
        adjustedBondsReturnRate: point.bondsReturnRate
    }
}

// mockData is only used in unit test
export async function calculateChanceOfSuccess(params: SWRCalculatorInputs, mockData?: HistoricalPoint[]): Promise<SWRCalculatorOutputs> {
    // Represents the historical S&P data from 1930-2022 as an array (loaded from JSON)
    let data: HistoricalPoint[] = []
    
    if (!mockData) {
        data = await fetchHistoricalReturnData()
    } else {
        data = mockData
    }

    const outputs: SWRCalculatorOutputs = { results: [] }


    // Modelled as a class for general ease of use
    class Total {
        networth: number
        stocks: number
        gold: number
        bonds: number

        constructor() {
            this.networth = params.networth
            // Unlike the retirement calculator, the allocation rate split calculations are done only in the
            // beginning as there is no extra savings being added each year
            this.stocks = params.networth * params.stocksAllocationRate
            this.gold = params.networth * params.goldAllocationRate
            this.bonds = params.networth * params.bondsAllocationRate
        }
    }

    function calculateTotal(total: Total, type: 'stocks' | 'gold' | 'bonds', returnRate: number, initialNetworth?: number): number {
        let totalAmount = total[type] + (total[type] * returnRate) 

        if (params.strategy === 'fixed-percentage') {
            totalAmount = totalAmount * (1 - params.safeWithdrawalRate) 
        } else {
            if (!initialNetworth) {
                throw new Error('`initialNetworth` must be defined if strategy is not fixed-percentage')
            }

            totalAmount = totalAmount - (initialNetworth * params.safeWithdrawalRate) 
        }

        return totalAmount
    }
    
    for (let slice of generateSimulationData(params, data)) {
        // Represents the investment data for each investment period iteration
        let timelineData: InvestmentTimelinePoint[] = []

        let total = new Total()

        slice.forEach((point, index) => {
            timelineData.push({ 
                year: point.year,
                investmentYear: index, 
                networth: total.networth,
                assetGrowthRate: 0 // stub
            })
            
            if (index < slice.length - 1) {
                let { adjustedStocksReturnRate, adjustedGoldReturnRate, adjustedBondsReturnRate } = calculateAdjustedReturnRate(params, point)

                total.stocks = calculateTotal(total, 'stocks', adjustedStocksReturnRate, timelineData[0].networth)
                total.gold = calculateTotal(total, 'gold', adjustedGoldReturnRate, timelineData[0].networth)
                total.bonds = calculateTotal(total, 'bonds', adjustedBondsReturnRate, timelineData[0].networth)

                total.networth = total.stocks + total.gold + total.bonds
            }

            timelineData[timelineData.length - 1].assetGrowthRate = (((total.networth - timelineData[timelineData.length - 1].networth) / timelineData[timelineData.length - 1].networth) * 100) / 100
        })

        outputs.results.push({ 
            year: slice[0].year, 
            finalNetworth: total.networth, 
            isRetirementPossible: isRetirementPossible(params, total.networth, timelineData[0].networth), 
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

    assetGrowthRate: number
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

    stocksAllocationRate: number
    goldAllocationRate: number
    bondsAllocationRate: number

    strategy: SWRStrategy

    safeWithdrawalRate: number
    shouldLoop: boolean
    adjustForInflation: boolean
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