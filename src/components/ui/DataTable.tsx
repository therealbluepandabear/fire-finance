import { Flex, Table, TableContainer, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react'
import { ColumnDef, flexRender, getCoreRowModel, getSortedRowModel, SortingState, useReactTable } from '@tanstack/react-table'
import { useState } from 'react'
import { MdArrowDownward, MdArrowUpward, MdExpandLess, MdExpandMore } from 'react-icons/md'


interface DataTableProps<Data extends object> {
    data: Data[]
    columns: ColumnDef<Data, any>[]
}

export default function DataTable<Data extends object>(props: DataTableProps<Data>) {
    const [sortingState, setSortingState] = useState<SortingState>([])

    const table = useReactTable({
        data: props.data,
        columns: props.columns,
        state: {
            sorting: sortingState
        },
        onSortingChange: setSortingState,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel()
    })

    return (
        <TableContainer>
            <Table>
                <Thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <Tr key={headerGroup.id}>
                            {headerGroup.headers.map((header) => (
                                <Th key={header.id}>
                                    <Flex onClick={header.column.getToggleSortingHandler()}>
                                        {flexRender(
                                            header.column.columnDef.header,
                                            header.getContext()
                                        )}

                                        {header.column.getIsSorted() === 'desc' && (
                                            <MdArrowUpward />
                                        )}

                                        {header.column.getIsSorted() === 'asc' && (
                                            <MdArrowDownward />
                                        )}
                                    </Flex>
                                </Th>
                            ))}
                        </Tr>
                    ))}
                </Thead>
                <Tbody>
                    {table.getRowModel().rows.map((row) => (
                        <Tr key={row.id}>
                            {row.getVisibleCells().map((cell) => (
                                <Td key={cell.id}>
                                    {flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext()
                                    )}
                                </Td>
                            ))}
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </TableContainer>
    )
}