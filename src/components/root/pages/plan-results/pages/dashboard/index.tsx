import { Flex, Text, forwardRef, Button, HTMLChakraProps, useDisclosure, Divider, Popover, PopoverTrigger, PopoverContent, PopoverBody, FocusLock, Box, IconButton, Tab, TabList, Tabs, TabPanel, TabPanels } from '@chakra-ui/react'
import { useState, PropsWithChildren, useEffect } from 'react'
import { MdBeachAccess, MdFlag, MdOutlineOpenInFull, MdCloseFullscreen, MdAdd, MdOutlineFileDownload, MdChecklist, MdStarOutline, MdDashboard, MdBarChart, MdOutlineDashboard, MdAutoGraph } from 'react-icons/md'
import { TimeRangeFilter, PlanEngineOutputs, getExcelWorkbook, PlanEngine, ProjectionPoint } from '../../../../../../models/retirement-calculator'
import { saveToFile } from '../../../../../../utils'
import NewGoalModal from './components/NewGoalModal'
import PlanChart from './components/PlanChart'
import ResultSummary from './components/ResultSummary'
import ResultTable from './components/ResultTable'
import ScenariosPage from '../scenarios'
import Section from './components/Section'
import { PlanResultsPageProps } from '../..'

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
    const options: TimeRangeFilter[] = ['1Y', '4Y', '12Y', 'MAX']

    const [selectedOption, setSelectedOption] = useState<TimeRangeFilter>('MAX')

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

interface DashboardPageProps {
    outputs: PlanEngineOutputs
}

export default function DashboardPage(props: DashboardPageProps) {
    const [timeRangeFilter, setTimeRangeFilter] = useState<TimeRangeFilter>('MAX')
    const [showNewGoalDialog, setShowNewGoalDialog] = useState(false)

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
        <Box padding={{ base: '16px', md: '48px' }} position='relative'>
            {showNewGoalDialog && <NewGoalModal onClose={() => setShowNewGoalDialog(false)} />} 

            <Flex
                alignSelf='flex-start'
                width='100%'
                marginBottom='18px'
            >
                <ResultSummary summary={props.outputs.summary} />
            </Flex>

            <Flex
                width='100%'
                flexDirection='column'
                gap='18px'
            >
                <Flex
                    width='100%'
                    maxWidth='100%'
                    gap='18px'
                    flexDirection='column'
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
                            <PlanChart checkpoints={props.outputs.checkpoints} data={props.outputs.data} filter={timeRangeFilter} />
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
                                <Box cursor='pointer' _active={{ color: 'gray' }}>
                                    <MdOutlineFileDownload size={22} />
                                </Box>
                            </PopoverTrigger>

                            <PopoverContent>
                                <PopoverBody padding='0px'>
                                    <FocusLock persistentFocus={false}>
                                        <Flex flexDirection='column' width='300px'>
                                            <Button
                                                borderRadius='0'
                                                onClick={downloadExcelClickHandler}
                                                height='45px'
                                            >Microsoft Excel (.xlsx)</Button>

                                            <Divider />

                                            <Button
                                                borderRadius='0'
                                                onClick={downloadCommaSeparatedValuesClickHandler}
                                                height='45px'
                                            >Comma Separated Values (.csv)</Button>
                                        </Flex>
                                    </FocusLock>
                                </PopoverBody>
                            </PopoverContent>
                        </Popover>
                    ]}
                >

                    <ResultTable data={props.outputs.data} />
                </Section>
            </Flex>
        </Box>
    )
}