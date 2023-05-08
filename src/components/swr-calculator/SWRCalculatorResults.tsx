import { Flex, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from '@chakra-ui/react'
import SWRCalculatorPieChart from './charts/SWRCalculatorPieChart'
import { CycleInfo, SWRCalculatorOutputs } from '../../models/swr-calculator'
import { formatPercentage } from '../../utils'
import SWRCalculatorResultsChart from './charts/SWRCalculatorResultsChart'
import SWRCalculatorStatsBox from './SWRCalculatorStatsBox'
import SWRCalculatorResultTable from './SWRCalculatorTable'
import SWRCalculatorAvgNetworthChart from './charts/SWRCalculatorAvgNetworthChart'
import { useRef, useState } from 'react'


interface EzTabProps {
    headers: string[]
    content: JSX.Element[]
}

function EzTab(props: EzTabProps): JSX.Element {
    const [isDragging, setIsDragging] = useState(false)
    const [startX, setStartX] = useState<number | null>(null)
    const [scrollLeft, setScrollLeft] = useState(0)

    const tabListRef = useRef<HTMLDivElement>(null);

    function mouseDownHandler(e: React.MouseEvent<HTMLDivElement>) {
        setIsDragging(true)
        setStartX(e.pageX)
        setScrollLeft(tabListRef.current!.scrollLeft)
    }

    function mouseMoveHandler(e: React.MouseEvent<HTMLDivElement>) {
        if (!isDragging) {
            return
        }

        const delta = e.pageX - (startX ?? 0)
        tabListRef.current!.scrollLeft = scrollLeft - delta
    }

    function mouseUpHandler() {
        setIsDragging(false)
    }

    return (
        <Tabs isLazy>
            <TabList
                ref={tabListRef}
                onMouseDown={mouseDownHandler}
                onMouseMove={mouseMoveHandler}
                onMouseUp={mouseUpHandler}
                onMouseLeave={mouseUpHandler}
                overflowY="scroll"
                sx={{
                    "::-webkit-scrollbar": {
                        display: "none"
                    }
                }}
            >
                {props.headers.map((header) => (
                    <Tab height="40px" width="55px" alignItems="center" justifyContent="center">
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


interface SWRCalculatorResultsProps {
    outputs: SWRCalculatorOutputs
    cycleInfo: CycleInfo
}

export default function SWRCalculatorResults(props: SWRCalculatorResultsProps): JSX.Element {
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
                        <Text fontSize="sm" fontWeight="bold">Average Networth by Start Year</Text>

                        <Flex flexGrow={1}>
                            <SWRCalculatorAvgNetworthChart data={props.outputs.results} />
                        </Flex>
                    </Flex>
                </Flex>

                <Flex flexDirection="column" minWidth="0" padding="16px" width={{ base: "100%", xl: "50%" }}>
                    <Flex flexGrow={1}>
                        <SWRCalculatorResultsChart showTooltip={false} outputs={props.outputs} />
                    </Flex>

                    <EzTab 
                        headers={props.outputs.results.map((result) => result.year.toString())}
                        content={props.outputs.results.map((result) => (
                            <TabPanel padding="0px">
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