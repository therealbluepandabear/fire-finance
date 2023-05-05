import { Box, Flex, Text, useColorModeValue } from '@chakra-ui/react'
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip, Label } from 'recharts'
import { CycleInfo, SWRCalculatorOutputs } from '../../models/swr-calculator'
import { formatPercentage } from '../../utils'
import SWRCalculatorChart from './SWRCalculatorChart'
import SWRCalculatorStatsBox from './SWRCalculatorStatsBox'
import SWRCalculatorResultTable from './SWRCalculatorTable'


function ResultPieChart(props: SWRCalculatorResultsProps): JSX.Element {
    const data = [
        { name: 'Successes', value: props.cycleInfo.successes },
        { name: 'Failures', value: props.cycleInfo.failures }
    ]

    const textColor = useColorModeValue('black', 'white')

    return (
        <Box minWidth="0" width="400px" height="400px">
            <ResponsiveContainer>
                <PieChart>
                    <Pie
                        dataKey="value"
                        data={data}
                        innerRadius="70%"
                        outerRadius="90%"
                        stroke=""
                    >
                        <Label
                            value={formatPercentage(props.cycleInfo.successRate)}
                            fontWeight="bold"
                            fontSize="58px"
                            position="center"
                            fill={textColor}
                        />
                        <Label value="Success Rate" fontSize="17px" position="center" dy={45} fill={textColor} />
                        <Cell fill="#57E964" name="Successes" />
                        <Cell fill="red" name="Failures" />
                    </Pie>
                    <Tooltip />
                </PieChart>
            </ResponsiveContainer>
        </Box>
    )
}


interface SWRCalculatorResultsProps {
    outputs: SWRCalculatorOutputs
    cycleInfo: CycleInfo
}

export default function SWRCalculatorResults(props: SWRCalculatorResultsProps): JSX.Element {
    return (
        <Flex flexDirection={{ base: "column", xl: "row" }} flexGrow={1}>
            <Flex flexDirection="column" width={{ base: "100%", xl: "50%" }} height="100%">
                <Flex flexDirection="row" height={{ base: "100%", xl: "50%" }}>
                    <Flex alignItems="center" justifyContent="center" minWidth="0" minHeight="0">
                        <ResultPieChart {...props} />
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

                <Flex flexDirection="column" padding="16px">
                    <Text fontSize="sm" fontWeight="bold">Average Networth by Start Year</Text>


                </Flex>
            </Flex>

            <Flex flexDirection="column" minWidth="0" padding="16px" flexGrow={1}>
                <Flex flexGrow={1}>
                    <SWRCalculatorChart showTooltip={false} outputs={props.outputs} />
                </Flex>

                <Flex flexGrow={1}>
                    <SWRCalculatorResultTable timelineData={props.outputs.results[0].timelineData} />
                </Flex>
            </Flex>
        </Flex>
    )
}