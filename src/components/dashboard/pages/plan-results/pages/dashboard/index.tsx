import { Flex, Text, forwardRef, Button, HTMLChakraProps, useDisclosure, Divider, Popover, PopoverTrigger, PopoverContent, PopoverBody, FocusLock, Box, IconButton, Tab, TabList, Tabs, TabPanel, TabPanels } from '@chakra-ui/react'
import { useState, PropsWithChildren } from 'react'
import { MdBeachAccess, MdFlag, MdOutlineOpenInFull, MdCloseFullscreen, MdAdd, MdOutlineFileDownload, MdChecklist, MdStarOutline, MdDashboard, MdBarChart, MdOutlineDashboard, MdAutoGraph } from 'react-icons/md'
import { TimeRangeFilter, PlanEngineOutputs, getExcelWorkbook, PlanEngine } from '../../../../../../models/retirement-calculator'
import { useAppSelector } from '../../../../../../store'
import { Goal } from '../../../../../../store/plans-slice'
import { saveToFile } from '../../../../../../utils'
import FScrollableBox from '../../../../../ui/ScrollableBox'
import GoalListItem from './components/GoalListItem'
import NewGoalModal from './components/NewGoalModal'
import PlanChart from './components/PlanChart'
import ResultSummary from './components/ResultSummary'
import ResultTable from './components/ResultTable'
import ScenariosPage from '../scenarios'

interface SectionHeaderProps {
    title: string
    contentEnd?: JSX.Element[]
}

function SectionHeader(props: SectionHeaderProps) {
    return (
        <Flex
            borderTopRadius='33px'
            alignItems='center'
            padding='24px'
            width='100%'
            gap='16px'
        >
            <Text fontWeight='bold' fontSize='18px'>{props.title}</Text>

            <Flex marginLeft='auto' gap='12px' alignItems='center'>
                {props.contentEnd && props.contentEnd.map(content => content)}
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

interface TimeRangeFilterOptionsProps {
    onSelectOption: (filter: TimeRangeFilter) => void
}

function TimeRangeFilterOptions(props: TimeRangeFilterOptionsProps) {
    const options: TimeRangeFilter[] = ['1Y', '4Y', '12Y', 'Max']

    const [selectedOption, setSelectedOption] = useState<TimeRangeFilter>('Max')

    return (
        <Flex gap='12px'>
            {options.map((value, index) => (
                <Button
                    key={index}
                    color={value === selectedOption ? 'pastelForeground' : 'gray.400'}
                    fontFamily='Manrope'
                    _hover={{}}
                    _active={{ background: 'gray.50' }}
                    height='30px'
                    padding='10px'
                    background={value === selectedOption ? 'pastelPrimary' : ''}
                    onClick={() => {
                        setSelectedOption(value)
                        props.onSelectOption(value)
                    }}
                    borderRadius='lg'
                >{value}</Button>
            ))}
        </Flex>

    )
}

type SectionProps = SectionHeaderProps & PropsWithChildren & HTMLChakraProps<'div'>

function Section({ title, contentEnd, children, ...props }: SectionProps) {
    return (
        <Flex
            background='white'
            flexDirection='column'
            border='1px solid #e1e1dc'
            borderRadius='2xl'
            {...props}
        >
            <SectionHeader
                title={title}
                contentEnd={contentEnd}
            />

            {children}
        </Flex>
    )
}

const goals: Goal[] = []

function generateGoals(outputs: PlanEngineOutputs): void {
    const retirementTargetNetworth = outputs.data.find(point => point.age === outputs.summary.retirementAge)?.networth ?? 0

    goals.push({ label: 'Retirement', icon: <MdBeachAccess />, targetNetworth: retirementTargetNetworth })
    goals.push({ label: 'Financial Independence', icon: <MdFlag />, targetNetworth: outputs.summary.fireNumber })
}

interface DashboardPageProps {
    planId: string
}

export default function DashboardPage(props: DashboardPageProps) {
    const plan = useAppSelector(state => state.plans.plans.find(plan => plan.id === props.planId))!!

    const planEngine = new PlanEngine(plan.inputs)
    const outputs = planEngine.calculate()

    const [chartExpanded, setChartExpanded] = useState(false)
    const [timeRangeFilter, setTimeRangeFilter] = useState<TimeRangeFilter>('Max')

    const [showNewGoalDialog, setShowNewGoalDialog] = useState(false)

    if (goals.length === 0) {
        generateGoals(outputs)
    }

    const { onOpen, onClose, isOpen } = useDisclosure()

    async function downloadExcelClickHandler(): Promise<void> {
        const workbook = getExcelWorkbook(outputs)

        const xlsxId = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'

        const buffer = await workbook.xlsx.writeBuffer()
        const xlsxBlob = new Blob([buffer], { type: xlsxId })

        saveToFile('fire_outlook.xlsx', URL.createObjectURL(xlsxBlob))
    }

    async function downloadCommaSeparatedValuesClickHandler(): Promise<void> {
        const workbook = getExcelWorkbook(outputs)

        const buffer = await workbook.csv.writeBuffer()
        const csvBlob = new Blob([buffer])

        saveToFile('fire_outlook.csv', URL.createObjectURL(csvBlob))
    }

    return (
        <Box padding={{ base: '16px', md: '48px' }}>
            {showNewGoalDialog && <NewGoalModal onClose={() => setShowNewGoalDialog(false)} />} 

            <Flex
                alignSelf='flex-start'
                width='100%'
                marginBottom={{ base: '16px', md: '18px' }}
            >
                <ResultSummary summary={outputs.summary} />
            </Flex>

            <Flex
                width='100%'
                flexDirection='column'
                marginLeft={{ base: '-32px', md: '0px' }}
                marginRight={{ base: '-32px', md: '0px' }}
                gap='18px'
            >
                <Flex
                    width='100%'
                    maxWidth='100%'
                    gap='18px'
                    flexDirection={{ base: 'column', lg: !chartExpanded ? 'row' : 'column' }}
                >
                    <Section
                        title='Chart'
                        flexGrow={1}
                        minWidth='0'
                    >
                        <Box paddingLeft='24px' marginBottom='32px'>
                            <TimeRangeFilterOptions onSelectOption={filter => setTimeRangeFilter(filter)} />
                        </Box>

                        <Flex height={{ base: '320px', md: '580px' }} width='100%'>
                            <PlanChart data={outputs.data} goals={goals} filter={timeRangeFilter} />
                        </Flex>
                    </Section>
                </Flex>

                <Section
                    marginBottom='24px'
                    title='Table'
                    contentEnd={[
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
                >

                    <ResultTable data={outputs.data} />
                </Section>
            </Flex>
        </Box>
    )
}