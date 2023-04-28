import { calculateChanceOfSuccess, HistoricalPoint } from './swr-calculator'

test('outputs are correct (1)', async () => {
    const data = require('../../public/data/yearly_return.json') as HistoricalPoint[]

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
})

export {}