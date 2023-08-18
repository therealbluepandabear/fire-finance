import { Box, Flex, Table, TableContainer, Tbody, Td, Th, Thead, Tr, useColorModeValue } from '@chakra-ui/react'
import { ColumnDef, flexRender, getCoreRowModel, getSortedRowModel, SortingState, useReactTable } from '@tanstack/react-table'
import { useEffect, useRef, useState } from 'react'
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
    const [showHeaderShadow, setShowHeaderShadow] = useState<boolean>(false)

    const rootRef = useRef<HTMLDivElement>(null)
    const targetRef = useRef<HTMLTableRowElement>(null)

    function mouseOverHandler(headerIndex: number): void {
        setHoveredHeaderIndex(headerIndex)
    }

    function mouseOutHandler(): void {
        setHoveredHeaderIndex(null)
    }

    useEffect(() => {
        const options: IntersectionObserverInit = {
            rootMargin: '0px',
            threshold: 1,
            root: rootRef.current!!
        }
        
        const observer = new IntersectionObserver(
            ([entry]) => {
                setShowHeaderShadow(!entry.isIntersecting)
            },
            options
        )

        const target = targetRef.current!!
        observer.observe(target)

        return () => observer.disconnect()
    }, [])

    return (
        <Flex 
            height='600px'
            minHeight='600px'
            overflowY='scroll'
            width='100%'
            ref={rootRef}
            sx={{
                '::-webkit-scrollbar': {
                    width: '9px',
                    height: '9px',
                    overflowY: 'auto'
                },
                '::-webkit-scrollbar-thumb:hover': {
                    background: 'darkgray'
                },
                '::-webkit-scrollbar-thumb:active': {
                    background: 'gray'
                },
                '::-webkit-scrollbar-thumb': {
                    background: 'lightgray',
                    borderRadius: '999px'
                }
            }}
        >
            <Table>
                <Thead>
                    {table.getHeaderGroups().map((headerGroup) => (
                        <Tr key={headerGroup.id} ref={targetRef}>
                            {headerGroup.headers.map((header, index) => (
                                <Th 
                                    key={header.id} 
                                    textTransform='none' 
                                    fontSize='md' 
                                    height='60px' 
                                    top='0'
                                    color='black'
                                    paddingBottom='0px'
                                    paddingRight='0px'
                                    fontWeight='normal'
                                    background='white'
                                    position='sticky'
                                    fontFamily='Manrope'
                                    onMouseOver={mouseOverHandler.bind(null, index)}
                                    onMouseOut={mouseOutHandler}
                                    _after={{
                                        marginLeft: '-24px',
                                        content: `""`,
                                        display: showHeaderShadow ? 'block' : 'none',
                                        shadow: 'md',
                                        height: '16px',
                                        background: 'white',
                                        marginTop: '-16px',
                                    }}
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
        </Flex>
    )
}