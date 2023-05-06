import { Box, Flex, Text } from '@chakra-ui/react'
import SWRCalculatorPieChart from './charts/SWRCalculatorPieChart'
import { CycleInfo, SWRCalculatorOutputs } from '../../models/swr-calculator'
import { formatPercentage } from '../../utils'
import SWRCalculatorResultsChart from './charts/SWRCalculatorResultsChart'
import SWRCalculatorStatsBox from './SWRCalculatorStatsBox'
import SWRCalculatorResultTable from './SWRCalculatorTable'
import SWRCalculatorAvgNetworthChart from './charts/SWRCalculatorAvgNetworthChart'


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

            <Flex flexDirection="column" minWidth="0" padding="16px" flexGrow={1}>
                <Flex flexGrow={1}>
                    <SWRCalculatorResultsChart showTooltip={false} outputs={props.outputs} />
                </Flex>

                <Flex flexGrow={1}>
                    <SWRCalculatorResultTable timelineData={props.outputs.results[0].timelineData} />
                </Flex>
            </Flex>
        </Flex>
    )
}