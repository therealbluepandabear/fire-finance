import { createColumnHelper } from '@tanstack/react-table'
import { ProjectionPoint } from '../../../../../../../models/retirement-calculator'
import { formatCurrency } from '../../../../../../../utils'
import DataTable from '../../../../../../ui/DataTable'


interface ResultTableProps {
    data: ProjectionPoint[]
}

export default function ResultTable(props: ResultTableProps) {
    const columnHelper = createColumnHelper<ProjectionPoint>()

    const columns = [
        columnHelper.accessor('age', {
            header: 'Age',
            id: 'age'
        }),

        columnHelper.accessor('year', {
            header: 'Year',
            id: 'year'
        }),

        columnHelper.accessor('yearsElapsed', {
            header: 'Years Elapsed',
            id: 'yearElapsed'
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