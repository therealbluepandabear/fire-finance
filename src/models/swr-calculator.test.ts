import { calculateChanceOfSuccess, HistoricalPoint } from './swr-calculator'

const data = require('../../public/data/yearly_return.json') as HistoricalPoint[]

test('outputs are correct (1)', async () => {
    const startingNetworth = 800_000
    const safeWithdrawalRate = 0.03

    const outputs = await calculateChanceOfSuccess({
        networth: startingNetworth,
        duration: 12,

        stocksAllocationRate: 1,
        goldAllocationRate: 0,
        bondsAllocationRate: 0,

        strategy: 'fixed-percentage',

        safeWithdrawalRate: safeWithdrawalRate,
        shouldLoop: false
    }, data)

    const queriableData = outputs.results[0].timelineData

    expect(queriableData.length).toBe(13)
    expect(queriableData[0].networth).toBe(startingNetworth)

    const v1 = (startingNetworth + (startingNetworth * data[0].stocksReturnRate))
    const v2 = v1 * (1 - safeWithdrawalRate)
    expect(queriableData[1].networth).toBe(v2)

    const v3 = v2 + (v2 * data[1].stocksReturnRate)
    const v4 = v3 * (1 - safeWithdrawalRate)
    expect(queriableData[2].networth).toBe(v4)

    const v5 = v4 + (v4 * data[2].stocksReturnRate)
    const v6 = v5 * (1 - safeWithdrawalRate)
    expect(queriableData[3].networth).toBe(v6)
})

test('outputs are correct (2)', async () => {
    const startingNetworth = 500_000
    const safeWithdrawalRate = 0.03

    const stocksAllocationRate = 0.2
    const goldAllocationRate = 0.2
    const bondsAllocationRate = 0.6

    const outputs = await calculateChanceOfSuccess({
        networth: startingNetworth,
        duration: 5,

        stocksAllocationRate: stocksAllocationRate,
        goldAllocationRate: goldAllocationRate,
        bondsAllocationRate: bondsAllocationRate,

        strategy: 'fixed-percentage',

        safeWithdrawalRate: safeWithdrawalRate,
        shouldLoop: false
    }, data)

    const queriableData = outputs.results[0].timelineData

    expect(queriableData[0].networth).toBe(startingNetworth)



    const stocksAmount = startingNetworth * stocksAllocationRate
    const goldAmount = startingNetworth * goldAllocationRate
    const bondsAmount = startingNetworth * bondsAllocationRate

    const stocksAmountV1 = stocksAmount + (stocksAmount * data[0].stocksReturnRate)
    const goldAmountV1 = stocksAmount + (goldAmount * data[0].goldReturnRate)
    const bondsAmountV1 = bondsAmount + (bondsAmount * data[0].bondsReturnRate)

    const stocksAmountV2 = stocksAmountV1 * (1 - safeWithdrawalRate)
    const goldAmountV2 = goldAmountV1 * (1 - safeWithdrawalRate)
    const bondsAmountV2 = bondsAmountV1 * (1 - safeWithdrawalRate)

    expect(queriableData[1].networth).toBe(stocksAmountV2 + goldAmountV2 + bondsAmountV2)
})

export {}