import { createColumnHelper } from '@tanstack/react-table'
import { InvestmentTimelinePoint } from '../../models/swr-calculator'
import { formatCurrency, formatPercentage } from '../../utils'
import DataTable from '../ui/DataTable'


interface SWRCalculatorResultTableProps {
    timelineData: InvestmentTimelinePoint[]
}

export default function SWRCalculatorResultTable(props: SWRCalculatorResultTableProps) {
    const columnHelper = createColumnHelper<InvestmentTimelinePoint>()

    const columns = [
        columnHelper.accessor('year', {
            header: 'Year',
            id: 'year'
        }),

        columnHelper.accessor('investmentYear', {
            header: 'Investment Year',
            id: 'investmentYear'
        }),

        columnHelper.accessor('networth', {
            header: 'Networth',
            cell: (info) => formatCurrency(info.getValue())
        }),

        columnHelper.accessor('assetGrowthRate', {
            header: 'Asset Growth Rate',
            cell: (info) => formatPercentage(info.getValue())
        })
    ]

    return (
        <DataTable columns={columns} data={props.timelineData} />
    )
}