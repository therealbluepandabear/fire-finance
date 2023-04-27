import { createColumnHelper } from '@tanstack/react-table'
import { RetirementCalculatorOutputs, RetirementProjectionPoint } from '../../models/retirement-calculator'
import { formatCurrency } from '../../utils'
import DataTable from '../ui/DataTable'


interface RetirementCalculatorTableProps {
    outputs: RetirementCalculatorOutputs
}

export default function RetirementCalculatorTable(props: RetirementCalculatorTableProps): JSX.Element {
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
        <DataTable columns={columns} data={props.outputs.data} />
    )
}