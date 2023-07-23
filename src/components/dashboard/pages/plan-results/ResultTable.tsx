import { createColumnHelper } from '@tanstack/react-table'
import { RetirementProjectionPoint } from '../../../../models/retirement-calculator'
import { formatCurrency } from '../../../../utils'
import DataTable from '../../../ui/DataTable'

interface ResultTableProps {
    data: RetirementProjectionPoint[]
}

export default function ResultTable(props: ResultTableProps) {
    const columnHelper = createColumnHelper<RetirementProjectionPoint>()

    const columns = [
        columnHelper.accessor('age', {
            header: 'Age',
            id: 'age'
        }),

        columnHelper.accessor('year', {
            header: 'Year',
            id: 'year'
        }),

        columnHelper.accessor('networth', {
            header: 'Networth',
            cell: (info) => formatCurrency(info.getValue()),
        })
    ]

    return (
        <DataTable columns={columns} data={props.data} />
    )
}