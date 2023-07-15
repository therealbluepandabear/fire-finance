import { Box, Button, Divider, Flex, FocusLock, Grid, IconButton, Input, Popover, PopoverBody, PopoverContent, PopoverTrigger, Select, Table, Tbody, Td, Text, Th, Thead, Tr, useBreakpointValue, useDisclosure } from '@chakra-ui/react'
import { Area, AreaChart, CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, TooltipProps } from 'recharts'
import FDivider from '../../ui/FDivider'
import { MdAdd, MdBeachAccess, MdCalendarMonth, MdCheck, MdChecklist, MdClose, MdCloseFullscreen, MdContentCopy, MdDelete, MdDeleteOutline, MdDescription, MdDownload, MdEdit, MdExpand, MdFace, MdFilter, MdFilterList, MdFlag, MdImportExport, MdInfo, MdIosShare, MdLocalFireDepartment, MdMoreVert, MdNotes, MdOpenInFull, MdOutlineAutoGraph, MdOutlineDownload, MdOutlineFileDownload, MdOutlineOpenInFull, MdOutlineStickyNote2, MdPageview, MdPerson, MdSchedule, MdStarOutline, MdStickyNote2, MdUpload } from 'react-icons/md'
import FScrollableBox from '../../ui/FScrollableBox'
import { RetirementCalculatorOutputs, RetirementProjectionPoint, TimeRangeFilter, filterTimeRange, getExcelWorkbook } from '../../../models/retirement-calculator'
import { formatCurrency, saveToFile } from '../../../utils'
import DataTable from '../../ui/DataTable'
import { createColumnHelper } from '@tanstack/react-table'
import { useState } from 'react'
import { GrDocumentCsv, GrDocumentExcel } from 'react-icons/gr'
import { forwardRef } from '@chakra-ui/react'

interface ResultCardProps {
    label: string
    content: string
    icon: JSX.Element
}

function ResultCard(props: ResultCardProps) {
    return (
        <Flex 
            height='120px' 
            paddingStart='24px' 
            border='1px solid #e1e1dc'
            _hover={{ shadow: 'md' }}
            alignItems='center'
            borderRadius='lg'
            background='white'
        >
            <Flex flexDirection='column'>
                <Flex gap='6px' alignItems='center'>
                    {props.icon}
                    <Text fontSize='sm'>{props.label}</Text>
                </Flex>

                <Text fontSize='4xl' fontFamily='Manrope'>{props.content}</Text>
            </Flex>
        </Flex>
    )
}

interface SectionHeaderProps {
    title: string
    contentRight: JSX.Element[]
}

function SectionHeader(props: SectionHeaderProps) {
    return (
        <Flex 
            borderTopRadius='33px' 
            alignItems='center' 
            padding='16px'
            paddingLeft='28px'
            width='100%'
        >
            <Text fontWeight='bold' fontSize='xl'>{props.title}</Text>

            <Flex marginLeft='auto' gap='12px' height='100%' alignItems='center'>
                {props.contentRight.map(content => content)}
            </Flex>
        </Flex>
    )
}

interface SectionHeaderButtonProps {
    ariaLabel: string
    icon: JSX.Element
    onClick: () => void
}

const SectionHeaderButton = forwardRef((props: SectionHeaderButtonProps, ref) => {
    return (
        <IconButton
            ref={ref}
            aria-label={props.ariaLabel}
            icon={props.icon}
            borderRadius='999px'
            onClick={props.onClick}
        />
    )
})

function ResultTable(props: PlanFormProps) {
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

interface TooltipRowProps {
    label: string
    data: string
}

function TooltipRow(props: TooltipRowProps) {
    return (
        <Flex gap='24px'>
            <Text fontSize='md' fontWeight='bold' as='span' marginRight='4px'>{props.label}</Text>

            <Text marginLeft='auto'>
                {props.data}
            </Text>
        </Flex>
    )
}

function ChartTooltip({ active, payload, label }: TooltipProps<number, number>): JSX.Element | null {
    if (active && payload && payload[0]) {

        const tooltipData = payload[0]

        return (
            <Box padding='12px' border='1px solid #e1e1dc' borderRadius='md' background='white'>
                <TooltipRow label='Age' data={label} />
                <TooltipRow label='Year' data={tooltipData.payload.year} />
                <TooltipRow label='Networth' data={formatCurrency(tooltipData.value ?? 0)} />
            </Box>
        )
    }

    return null
}

function Chart(props: PlanFormProps & { filter: TimeRangeFilter }) {
    return (
        <ResponsiveContainer>
            <AreaChart data={filterTimeRange(props.outputs, props.filter)} {...{ overflow: 'visible' }} margin={{ top: 16, right: 0, bottom: 12, left: 16 }}>
                <CartesianGrid vertical={false} strokeWidth={0.6} stroke='#bdbcbc' />

                <Area
                    isAnimationActive={false}
                    dataKey='networth'
                    stroke='#50C878'
                    fill='#a1e7b2'
                    strokeWidth={3}
                    fillOpacity={0.4}
                />

                <XAxis
                    tick={{ fill: '#bdbcbc', fontSize: '13px' }}
                    tickLine={false}
                    stroke='#9e9f9f'
                    strokeWidth={0.6}
                    interval={Math.floor(props.outputs.data.length / 5)}
                />

                <YAxis
                    tick={{ fill: '#bdbcbc', fontSize: '13px' }}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => formatCurrency(value, true)}
                />

                <Tooltip animationDuration={200} wrapperStyle={{ outline: 'none' }} content={<ChartTooltip />} />
            </AreaChart>
        </ResponsiveContainer>
    )
}

function ResultsGrid(props: PlanFormProps) {
    return (
        <Grid
            templateColumns={{
                base: 'repeat(1, 1fr)',
                md: 'repeat(2, 1fr)',
                xl: 'repeat(4, 1fr)'
            }}
            width='100%'
            gap='16px'
        >
            <ResultCard
                icon={<MdBeachAccess />}
                label='Retirement Age'
                content={props.outputs.retirementAge!!.toString()}
            />

            <ResultCard
                icon={<MdSchedule />}
                label='Years Till Retirement'
                content={(props.outputs.retirementAge!! - props.outputs.data[0].age).toString()}
            />

            <ResultCard
                icon={<MdLocalFireDepartment />}
                label='Fire Age'
                content={props.outputs.fireAge.toString()}
            />

            <ResultCard
                icon={<MdLocalFireDepartment />}
                label='Fire Number'
                content={formatCurrency(props.outputs.fireNumber, true)}
            />
        </Grid>
    )
}

interface GoalListItemProps {
    label: string
    icon: JSX.Element
}

function GoalListItem(props: GoalListItemProps) {

    const [showDeleteIcon, setShowDeleteIcon] = useState(false)

    function mouseEnterHandler(): void {
        setShowDeleteIcon(true)
    }

    function mouseLeaveHandler(): void {
        setShowDeleteIcon(false)
    }

    return (
        <Flex 
            paddingLeft='24px' 
            gap='12px' 
            onMouseEnter={mouseEnterHandler}
            onMouseLeave={mouseLeaveHandler}
            alignItems='center' 
            _hover={{  shadow: 'md' }}
            _active={{ background: 'gray.50' }}
            padding='16px'
            paddingRight='24px'
        >
            <Flex
                background='buttonPrimary'
                color='white'
                padding='12px'
                borderRadius='999px'
            >
                {props.icon}
            </Flex>

            <Flex flexDirection='column'>
                <Text fontWeight='bold'>{props.label}</Text>
                <Text>$55.5</Text>
            </Flex>

            <Flex marginLeft='auto' display={showDeleteIcon ? 'flex' : 'none'} color='red'>
                <IconButton aria-label='Delete' borderRadius='999px' icon={<MdDeleteOutline size={22} />} />
            </Flex>
        </Flex>
    )
}

interface TimeRangeFilterOptionsProps {
    onSelectOption: (filter: TimeRangeFilter) => void
}

function TimeRangeFilterOptions(props: TimeRangeFilterOptionsProps) {

    const options: TimeRangeFilter[] = ['1Y', '4Y', '12Y', 'Max']

    const [selectedOption, setSelectedOption] = useState<TimeRangeFilter>('Max')

    return (
        <Flex>
            {options.map((value, index) => (
                <Button
                    key={index}
                    color={value === selectedOption ? 'buttonPrimary' : 'gray.400'}
                    fontFamily='Manrope'
                    _hover={{ }}
                    _active={{ background: 'gray.50' }}
                    height='30px'
                    background={value === selectedOption ? 'pastelPrimary' : ''}
                    padding='12px'
                    onClick={() => {
                        console.log('ok')
                        setSelectedOption(value)
                        props.onSelectOption(value)
                    }}
                    borderRadius='999px'
                >{value}</Button>
            ))}
        </Flex>

    )
}

interface PlanFormProps {
    outputs: RetirementCalculatorOutputs
}

export default function PlanResultsPage(props: PlanFormProps) {

    const [chartExpanded, setChartExpanded] = useState(false)
    const [timeRangeFilter, setTimeRangeFilter] = useState<TimeRangeFilter>('Max')

    const { onOpen, onClose, isOpen } = useDisclosure()

    async function downloadExcelClickHandler(): Promise<void> {
        const workbook = getExcelWorkbook(props.outputs)

        const xlsxId = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'

        const buffer = await workbook.xlsx.writeBuffer()
        const xlsxBlob = new Blob([buffer], { type: xlsxId })

        saveToFile('fire_outlook.xlsx', URL.createObjectURL(xlsxBlob))
    }

    async function downloadCommaSeparatedValuesClickHandler(): Promise<void> {
        const workbook = getExcelWorkbook(props.outputs)

        const buffer = await workbook.csv.writeBuffer()
        const csvBlob = new Blob([buffer])

        saveToFile('fire_outlook.csv', URL.createObjectURL(csvBlob))
    }

    return (
        <FScrollableBox 
            height='100%'
            width='100%'
            overflowY='scroll'
            flexDirection='column' 
            minWidth='0' 
            alignItems='center' 
            padding={{ base: '0px', md: '64px' }} 
        >  
            <Flex 
                alignSelf='flex-start' 
                width='100%' 
                marginBottom={{ base: '0px', md: '32px' }} 
                padding={{ base: '16px', md: '0px' }}
            >
                <ResultsGrid {...props} />
            </Flex>

            <Flex 
                width='100%' 
                flexDirection='column' 
                marginLeft={{ base: '-32px', md: '0px' }} 
                marginRight={{ base: '-32px', md: '0px' }} 
                gap='32px'
            >
                <Flex 
                    width='100%' 
                    maxWidth='100%' 
                    gap='32px' 
                    flexDirection={{ base: 'column', lg: !chartExpanded ? 'row' : 'column' }}
                >
                    <Flex 
                        flexDirection='column'
                        border='1px solid #e1e1dc'
                        background='white'
                        borderRadius='2xl'
                        flexGrow={1}
                        minWidth='0'
                    >      
                        <SectionHeader 
                            title='Chart' 
                            contentRight={[
                                <TimeRangeFilterOptions onSelectOption={filter => setTimeRangeFilter(filter)} />,

                                <Divider orientation='vertical' height='20px' display={{ base: 'none', lg: 'flex' }} />,

                                <Flex display={{ base: 'none', lg: 'flex' }}>
                                    <SectionHeaderButton
                                        ariaLabel='Add'
                                        icon={!chartExpanded ? <MdOutlineOpenInFull size={22} /> : <MdCloseFullscreen size={22} />}
                                        onClick={() => setChartExpanded(prevChartExpanded => !prevChartExpanded)}
                                    />
                                </Flex>
                            ]} 
                        />

                        <Flex height={{ base: '320px', md: '580px' }} width='100%'>
                            <Chart {...props} filter={timeRangeFilter} />
                        </Flex>
                    </Flex>

                    <Flex 
                        width={{ base: '100%', lg: !chartExpanded ? '300px' : '100%' }}
                        minWidth={{ base: '100%', lg: !chartExpanded ? '300px' : '100%' }}
                        overflow='hidden'
                        border='1px solid #e1e1dc'
                        background='white'
                        borderRadius='2xl'
                        flexDirection='column'
                    >
                        <SectionHeader title='Goals' contentRight={[<IconButton
                            aria-label='Add'
                            icon={<MdAdd size={22} />}
                            borderRadius='999px'
                            marginLeft='auto'
                        />]} />

                        <Flex flexDirection='column'>
                            <GoalListItem label='Retirement' icon={<MdBeachAccess />} />

                            <Divider />

                            <GoalListItem label='Financial Independence' icon={<MdFlag />} />

                            <Divider />
                        </Flex>
                    </Flex>
                </Flex>


                <Flex 
                    flexDirection='column' 
                    border='1px solid #e1e1dc'
                    background='white'
                    borderRadius='2xl' 
                    marginBottom='24px'
                >
                    <SectionHeader 
                        title='Table' 
                        contentRight={[
                            <Popover
                                variant='responsive'
                                placement='left-start'
                                isOpen={isOpen}
                                onOpen={onOpen}
                                onClose={onClose}
                            >
                                <PopoverTrigger>
                                    <SectionHeaderButton
                                        ariaLabel='Download'
                                        icon={<MdOutlineFileDownload size={22} />}
                                        onClick={() => { }}
                                    />
                                </PopoverTrigger>
                                
                                <PopoverContent>
                                    <PopoverBody padding='0px'>
                                        <FocusLock persistentFocus={false}>
                                            <Flex flexDirection='column' width='300px'>
                                                <Button 
                                                    borderRadius='0'
                                                    onClick={downloadExcelClickHandler}
                                                >Microsoft Excel (.xlsx)</Button>

                                                <Divider />

                                                <Button 
                                                    borderRadius='0'
                                                    onClick={downloadCommaSeparatedValuesClickHandler}
                                                >Comma Separated Values (.csv)</Button>
                                            </Flex>
                                        </FocusLock>
                                    </PopoverBody>
                                </PopoverContent>
                            </Popover>
                        ]} 
                    />

                    <FScrollableBox 
                        height='600px' 
                        minHeight='600px' 
                        overflowY='scroll' 
                        width='100%' 
                    >
                        <ResultTable {...props} />
                    </FScrollableBox>
                </Flex>
            </Flex>
        </FScrollableBox>
    )
}