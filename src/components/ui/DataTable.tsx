import { Box, Flex, Table, TableContainer, Tbody, Td, Th, Thead, Tr, useColorModeValue } from '@chakra-ui/react'
import { ColumnDef, flexRender, getCoreRowModel, getSortedRowModel, SortingState, useReactTable } from '@tanstack/react-table'
import { useState } from 'react'
import { MdArrowDownward, MdArrowUpward } from 'react-icons/md'


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

    const [hoveredHeaderIndex, setHoveredHeaderIndex] = useState<number | null>(null)

    function mouseOverHandler(headerIndex: number): void {
        setHoveredHeaderIndex(headerIndex)
    }

    function mouseOutHandler(): void {
        setHoveredHeaderIndex(null)
    }

    return (
        <Table>
            <Thead>
                {table.getHeaderGroups().map((headerGroup) => (
                    <Tr key={headerGroup.id}>
                        {headerGroup.headers.map((header, index) => (
                            <Th 
                                key={header.id} 
                                textTransform='none' 
                                fontSize='sm' 
                                height='60px' 
                                onMouseOver={mouseOverHandler.bind(null, index)}
                                onMouseOut={mouseOutHandler}
                            >
                                <Flex 
                                    onClick={header.column.getToggleSortingHandler()} 
                                    alignItems='center'
                                    height='100%' 
                                >
                                    {flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                    )}

                                    <Box marginLeft='8px'>
                                        {header.column.getIsSorted() === 'desc' && (
                                            <MdArrowUpward size={18} />
                                        )}

                                        {header.column.getIsSorted() === 'asc' && (
                                            <MdArrowDownward size={18} />
                                        )}

                                        {header.column.getIsSorted() !== 'asc' && header.column.getIsSorted() !== 'desc' && (
                                            <MdArrowUpward size={18} opacity={hoveredHeaderIndex === index ? 0.3 : 0} />
                                        )}
                                    </Box>
                                </Flex>
                            </Th>
                        ))}
                    </Tr>
                ))}
            </Thead>
            <Tbody>
                {table.getRowModel().rows.map((row, index) => (
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
    )
}