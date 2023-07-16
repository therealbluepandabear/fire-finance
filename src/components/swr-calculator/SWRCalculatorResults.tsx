import { Box, Button, Flex, HTMLChakraProps, Tab, TabList, TabPanel, TabPanels, Tabs, Text, useColorModeValue } from '@chakra-ui/react'
import SWRCalculatorPieChart from './charts/SWRCalculatorPieChart'
import { CycleInfo, SWRCalculatorOutputs } from '../../models/swr-calculator'
import { formatPercentage } from '../../utils'
import SWRCalculatorResultsChart from './charts/SWRCalculatorResultsChart'
import SWRCalculatorStatsBox from './SWRCalculatorStatsBox'
import SWRCalculatorResultTable from './SWRCalculatorTable'
import SWRCalculatorNetworthChart, { ChartFocus, ChartType } from './charts/SWRCalculatorNetworthChart'
import { useEffect, useRef, useState } from 'react'
import { MdAreaChart, MdBarChart } from 'react-icons/md'
import Chips from '../ui/Chips'
import Chip from '../ui/Chip'


interface EzTabProps {
    headers: string[]
    content: JSX.Element[]
}

function EzTab(props: EzTabProps) {
    const [isDragging, setIsDragging] = useState(false)
    const [startX, setStartX] = useState<number | null>(null)
    const [scrollLeft, setScrollLeft] = useState(0)

    const [tabIndex, setTabIndex] = useState(0)

    const tabListRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (isDragging) {
            document.addEventListener('mousemove', mouseMoveHandler)
            document.addEventListener('mouseup', mouseUpHandler)
        }
    }, [isDragging])

    function tabChangeHandler(index: number) {
        const scrollOffset = scrollLeft - tabListRef.current!.scrollLeft

        if (Math.abs(scrollOffset) <= 15 && Math.abs(scrollOffset) >= 0) {
            setTabIndex(index)
        }
    }

    function mouseDownHandler(e: React.MouseEvent<HTMLDivElement>) {
        setIsDragging(true)
        setStartX(e.pageX)
        setScrollLeft(tabListRef.current!.scrollLeft)
    }

    function mouseMoveHandler(e: MouseEvent) {
        if (!isDragging) {
            return
        }

        const delta = e.pageX - (startX ?? 0)
        tabListRef.current!.scrollLeft = scrollLeft - delta
    }

    function mouseUpHandler() {
        setIsDragging(false)

        document.removeEventListener('mousemove', mouseMoveHandler)
        document.removeEventListener('mouseup', mouseUpHandler)
    }

    return (
        <Tabs isManual={true} isLazy={true} variant='unstyled' onChange={tabChangeHandler} index={tabIndex}>
            <TabList
                ref={tabListRef}
                onMouseDown={mouseDownHandler}
                overflowY='scroll'
                sx={{
                    '::-webkit-scrollbar': {
                        display: 'none'
                    }
                }}
            >
                {props.headers.map((header, index) => (
                    <Flex flexDirection='column'>
                        <Tab 
                            key={index} 
                            height='40px' 
                            width='55px' 
                            alignItems='center'
                            justifyContent='center'
                            textColor={tabIndex === index ? 'blue.500' : ''}
                        >
                            {header}
                        </Tab>
                        {tabIndex === index && (
                            <Box width='100%' height='3px' background={tabIndex === index ? 'blue.500' : ''} />
                        )}
                    </Flex>
                ))}
            </TabList>
            
            <TabPanels>
                {props.content.map((jsx) => (
                    jsx
                ))}
            </TabPanels>
        </Tabs>
    )
}


interface SWRCalculatorResultsProps {
    outputs: SWRCalculatorOutputs
    cycleInfo: CycleInfo
}

export default function SWRCalculatorResults(props: SWRCalculatorResultsProps) {
    const [chartType, setChartType] = useState<ChartType>('area')
    const [chartFocus, setChartFocus] = useState<ChartFocus>('averageNetworth')

    function chartFocusChangeHandler(index: number) {
        if (index === 0) {
            setChartFocus('averageNetworth')
        } else {
            setChartFocus('finalNetworth')
        }
    }

    function chartTypeChangeHandler(index: number) {
        if (index === 0) {
            setChartType('bar')
        } else {
            setChartType('area')
        }
    }

    return (
        <Flex flexDirection='column' width='100%'>
            <Flex flexDirection={{ base: 'column', xl: 'row' }} height='100%'>
                <Flex flexDirection='column' width={{ base: '100%', xl: '50%' }} height='100%'>
                    <Flex flexDirection={{ base: 'column', md: 'row' }} height={{ base: '100%', xl: '50%' }}>
                        <Flex alignItems='center' justifyContent='center' minWidth='0' minHeight='0'>
                            <SWRCalculatorPieChart {...props} />
                        </Flex>

                        <Flex padding='16px' flexGrow={1}>
                            <Flex width='100%' gap='8px'>
                                <Flex flexDirection='column' gap='8px' width='100%'>
                                    <SWRCalculatorStatsBox header='Successes' statistic={props.cycleInfo.successes.toString()} />
                                    <SWRCalculatorStatsBox header='Success Rate' statistic={formatPercentage(props.cycleInfo.successRate)} />
                                    <SWRCalculatorStatsBox header='Best Start Year' statistic={props.cycleInfo.bestPerformingStartYear.toString()} />
                                </Flex>

                                <Flex flexDirection='column' gap='8px' width='100%'>
                                    <SWRCalculatorStatsBox header='Failures' statistic={props.cycleInfo.failures.toString()} />
                                    <SWRCalculatorStatsBox header='Failure Rate' statistic={formatPercentage(props.cycleInfo.failureRate)} />
                                    <SWRCalculatorStatsBox header='Worst Start Year' statistic={props.cycleInfo.worstPerformingStartYear.toString()} />
                                </Flex>
                            </Flex>
                        </Flex>
                    </Flex>

                    <Flex flexDirection='column' padding='16px' flexGrow={1} gap='8px'>
                        <Flex>
                            <Text fontSize='sm' fontWeight='bold' padding='3px'>Start Year Statistics</Text>

                            <Flex marginLeft='auto' gap='8px'>
                                {/* <Chips 
                                    height='100%'
                                    onIndexChange={chartFocusChangeHandler}
                                >
                                    <Chip>
                                        <Text fontSize='12px'>Avg</Text>
                                    </Chip>

                                    <Chip>
                                        <Text fontSize='12px'>Final</Text>
                                    </Chip>
                                </Chips>

                                <Chips
                                    height='100%'
                                    onIndexChange={chartTypeChangeHandler}
                                    defaultIndex={1}
                                >
                                    <Chip>
                                        <MdBarChart />
                                    </Chip>

                                    <Chip>
                                        <MdAreaChart />
                                    </Chip>
                                </Chips> */}
                            </Flex>
                        </Flex>

                        {/* <Flex flexGrow={1} minWidth='0'>
                            <SWRCalculatorNetworthChart type={chartType} data={props.outputs.results} focus={chartFocus} />
                        </Flex> */}
                    </Flex>
                </Flex>

                <Flex 
                    flexDirection='column' 
                    minWidth='0' 
                    padding='16px' 
                    width={{ base: '100%', xl: '50%' }}
                >
                    {/* <Flex flexGrow={1}>
                        <SWRCalculatorResultsChart showTooltip={false} outputs={props.outputs} />
                    </Flex> */}

                    <EzTab 
                        headers={props.outputs.results.map((result) => result.year.toString())}
                        content={props.outputs.results.map((result, index) => (
                            <TabPanel key={index} padding='0px'>
                                <Flex height='350px'>
                                    <SWRCalculatorResultTable timelineData={result.timelineData} />
                                </Flex>
                            </TabPanel>
                        ))}
                    />
                </Flex>
            </Flex>
        </Flex>
    )
}