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

    const rowColor = useColorModeValue('#f7f7f7', 'gray.900')
    const headerColor = useColorModeValue('', '#1f2836')
    const scrollbarColor = useColorModeValue('gray.400', 'gray.600')

    const [hoveredHeaderIndex, setHoveredHeaderIndex] = useState<number | null>(null)

    function mouseOverHandler(headerIndex: number): void {
        setHoveredHeaderIndex(headerIndex)
    }

    function mouseOutHandler(): void {
        setHoveredHeaderIndex(null)
    }

    return (
        <TableContainer 
            width='100%'
            overflowY='scroll'
            sx={
                {'::-webkit-scrollbar': {
                    width: '8px'
                },
                '::-webkit-scrollbar-thumb': {
                    background: scrollbarColor,
                    borderRadius: '999px'
                }}
            }
        >
            <Box borderRadius='md' overflow='hidden'>
                <Table>
                    <Thead>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <Tr key={headerGroup.id} background={headerColor}>
                                {headerGroup.headers.map((header, index) => (
                                    <Th 
                                        key={header.id} 
                                        textTransform='none' 
                                        fontSize='sm' 
                                        height='60px' 
                                        onMouseOver={mouseOverHandler.bind(null, index)}
                                        onMouseOut={mouseOutHandler}
                                        padding='0'
                                    >
                                        <Flex 
                                            onClick={header.column.getToggleSortingHandler()} 
                                            alignItems='center'
                                            height='100%' 
                                            paddingLeft='18px'
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
                            <Tr key={row.id} background={index % 2 === 0 ? '' : rowColor}>
                                {row.getVisibleCells().map((cell) => (
                                    <Td key={cell.id} padding='18px'>
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
            </Box>
        </TableContainer>
    )
}