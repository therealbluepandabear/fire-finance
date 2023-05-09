import { Button, Flex, HTMLChakraProps, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react'
import SWRCalculatorPieChart from './charts/SWRCalculatorPieChart'
import { CycleInfo, SWRCalculatorOutputs } from '../../models/swr-calculator'
import { formatPercentage } from '../../utils'
import SWRCalculatorResultsChart from './charts/SWRCalculatorResultsChart'
import SWRCalculatorStatsBox from './SWRCalculatorStatsBox'
import SWRCalculatorResultTable from './SWRCalculatorTable'
import SWRCalculatorNetworthChart, { ChartFocus, ChartType } from './charts/SWRCalculatorNetworthChart'
import { useEffect, useRef, useState } from 'react'
import { MdAreaChart, MdBarChart } from 'react-icons/md'


interface EzTabProps {
    headers: string[]
    content: JSX.Element[]
}

function EzTab(props: EzTabProps): JSX.Element {
    const [isDragging, setIsDragging] = useState(false)
    const [startX, setStartX] = useState<number | null>(null)
    const [scrollLeft, setScrollLeft] = useState(0)

    const tabListRef = useRef<HTMLDivElement>(null)

    useEffect(() => {
        if (isDragging) {
            document.addEventListener('mousemove', mouseMoveHandler)
            document.addEventListener('mouseup', mouseUpHandler)
        }
    }, [isDragging])

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
        console.log(isDragging)
        setIsDragging(false)

        document.removeEventListener('mousemove', mouseMoveHandler)
        document.removeEventListener('mouseup', mouseUpHandler)
    }

    return (
        <Tabs isLazy>
            <TabList
                ref={tabListRef}
                onMouseDown={mouseDownHandler}
                overflowY="scroll"
                sx={{
                    "::-webkit-scrollbar": {
                        display: "none"
                    }
                }}
            >
                {props.headers.map((header, index) => (
                    <Tab key={index} height="40px" width="55px" alignItems="center" justifyContent="center">
                        {header}
                    </Tab>
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


interface EzChipsProps extends HTMLChakraProps<'div'> {
    chipContent: JSX.Element[]
    onIndexChange: (index: number) => void
}

function EzChips({ onIndexChange, chipContent, ...props }: EzChipsProps): JSX.Element {
    const [index, setIndex] = useState(0)

    console.log(chipContent)

    useEffect(() => {
        onIndexChange(index)
    }, [index])

    function chipClickHandler(index: number) {
        setIndex(index)
    }

    return (
        <Flex 
            {...props}
            borderRadius="999px" 
            outline="2px solid"
            outlineOffset="-2px"
            outlineColor="gray.600"
            overflow="hidden"
        >
            {chipContent.map((jsx, itrIndex) => (
                <Button
                    key={itrIndex}
                    height="100%"
                    borderRadius="0"
                    color={itrIndex === index ? "gray.800" : ""}
                    background={itrIndex === index ? "gray.600" : ""}
                    onClick={chipClickHandler.bind(null, itrIndex)}
                >
                    {jsx}
                </Button>
            ))}
        </Flex>
    )
}


interface SWRCalculatorResultsProps {
    outputs: SWRCalculatorOutputs
    cycleInfo: CycleInfo
}

export default function SWRCalculatorResults(props: SWRCalculatorResultsProps): JSX.Element {
    const [chartType, setChartType] = useState<ChartType>('area')
    const [chartFocus, setChartFocus] = useState<ChartFocus>('averageNetworth')

    function chartTypeChangeHandler(index: number) {
        if (index === 0) {
            setChartType('bar')
        } else {
            setChartType('area')
        }
    }

    function chartFocusChangeHandler(index: number) {
        if (index === 0) {
            setChartFocus('averageNetworth')
        } else {
            setChartFocus('finalNetworth')
        }
    }

    return (
        <Flex flexDirection="column" flexGrow={1}>
            <Flex flexDirection={{ base: "column", xl: "row" }} height="100%">
                <Flex flexDirection="column" width={{ base: "100%", xl: "50%" }} height="100%">
                    <Flex flexDirection={{ base: "column", md: "row" }} height={{ base: "100%", xl: "50%" }}>
                        <Flex alignItems="center" justifyContent="center" minWidth="0" minHeight="0">
                            <SWRCalculatorPieChart {...props} />
                        </Flex>

                        <Flex padding="16px" flexGrow={1}>
                            <Flex flexDirection="row" width="100%" gap="8px">
                                <Flex flexDirection="column" gap="8px" width="100%">
                                    <SWRCalculatorStatsBox header="Successes" statistic={props.cycleInfo.successes.toString()} />
                                    <SWRCalculatorStatsBox header="Success Rate" statistic={formatPercentage(props.cycleInfo.successRate)} />
                                    <SWRCalculatorStatsBox header="Best Start Year" statistic={props.cycleInfo.bestPerformingStartYear.toString()} />
                                </Flex>

                                <Flex flexDirection="column" gap="8px" width="100%">
                                    <SWRCalculatorStatsBox header="Failures" statistic={props.cycleInfo.failures.toString()} />
                                    <SWRCalculatorStatsBox header="Failure Rate" statistic={formatPercentage(props.cycleInfo.failureRate)} />
                                    <SWRCalculatorStatsBox header="Worst Start Year" statistic={props.cycleInfo.worstPerformingStartYear.toString()} />
                                </Flex>
                            </Flex>
                        </Flex>
                    </Flex>

                    <Flex flexDirection="column" padding="16px" flexGrow={1} gap="8px">
                        <Flex flexDirection="row">
                            <Text fontSize="sm" fontWeight="bold">Start Year Statistics</Text>

                            <Flex marginLeft="auto" gap="8px">
                                <EzChips
                                    chipContent={[
                                        <Text fontSize="12px">Avg</Text>,
                                        <Text fontSize="12px">Final</Text>
                                    ]}
                                    height="100%"
                                    onIndexChange={chartFocusChangeHandler}
                                />

                                <EzChips
                                    chipContent={[
                                        <MdBarChart />,
                                        <MdAreaChart />
                                    ]}
                                    height="100%"
                                    onIndexChange={chartTypeChangeHandler}
                                />
                            </Flex>
                        </Flex>

                        <Flex flexGrow={1}>
                            <SWRCalculatorNetworthChart type={chartType} data={props.outputs.results} focus={chartFocus} />
                        </Flex>
                    </Flex>
                </Flex>

                <Flex flexDirection="column" minWidth="0" padding="16px" width={{ base: "100%", xl: "50%" }}>
                    <Flex flexGrow={1}>
                        <SWRCalculatorResultsChart showTooltip={false} outputs={props.outputs} />
                    </Flex>

                    <EzTab 
                        headers={props.outputs.results.map((result) => result.year.toString())}
                        content={props.outputs.results.map((result, index) => (
                            <TabPanel key={index} padding="0px">
                                <Flex height="350px">
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