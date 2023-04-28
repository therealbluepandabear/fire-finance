import { TabList, Tabs, Tab, TabPanels, TabPanel, Flex, Text, Box, Button } from '@chakra-ui/react'
import { InvestmentTimelinePoint, SWRCalculatorOutputs } from '../../models/swr-calculator'
import { formatCurrency, formatPercentage } from '../../utils'
import { useEffect, useState } from 'react'
import { createColumnHelper } from '@tanstack/react-table'
import SWRCalculatorChart from './SWRCalculatorChart'
import DataTable from '../ui/DataTable'


interface ResultTableProps {
    timelineData: InvestmentTimelinePoint[]
}

function ResultTable(props: ResultTableProps): JSX.Element {
    const columnHelper = createColumnHelper<InvestmentTimelinePoint>()

    const columns = [
        columnHelper.accessor('year', {
            header: 'Year',
            id: 'year'
        }),

        columnHelper.accessor('investmentYear', {
            header: 'Investment Year',
            id: 'investmentYear'
        }),

        columnHelper.accessor('networth', {
            header: 'Networth',
            cell: (info) => formatCurrency(info.getValue())
        }),

        columnHelper.accessor('assetGrowthRate', {
            header: 'Asset Growth Rate',
            cell: (info) => formatPercentage(info.getValue())
        })
    ]

    return (
        <DataTable columns={columns} data={props.timelineData} />
    )
}


interface SWRCalculatorResultPanelProps {
    outputs: SWRCalculatorOutputs
}

export default function SWRCalculatorResultPanel(props: SWRCalculatorResultPanelProps): JSX.Element {
    const [showResultChart, setShowResultChart] = useState(false)
    const [filteredOutputs, setFilteredOutputs] = useState<SWRCalculatorOutputs | null>(null)

    const [tabIndex, setTabIndex] = useState(0)
    const currentResult = props.outputs.results[tabIndex]

    function tabChangeHandler(index: number): void {
        setTabIndex(index)
    }

    function toggleChartHandler(): void {
        setShowResultChart((prevShowResultChart) => !prevShowResultChart)

        updateFilteredOutputs()
    }

    function updateFilteredOutputs(): void {
        setFilteredOutputs({ results: [currentResult] })
    }

    useEffect(() => {
        if (showResultChart) {
            updateFilteredOutputs()
        }
    }, [tabIndex, props.outputs])

    return (
        <Tabs onChange={tabChangeHandler}>
            <TabList overflowY="hidden">
                {props.outputs.results.map((result, index) => (
                    <Flex
                        flexDirection="row"
                        justifyContent="center"
                        alignItems="center"
                    >
                        <Box width="20px" height="20px" background={result.isRetirementPossible ? '#57E964' : 'red'}></Box>
                        <Tab key={index} flexShrink={0}>{result.year}</Tab>
                    </Flex>
                ))}
            </TabList>

            <TabPanels>
                {props.outputs.results.map((result, index) => (
                    <TabPanel>
                        <Flex flexDirection="column" key={index}>
                            {(showResultChart && filteredOutputs) && (
                                <Flex height="200px">
                                    <SWRCalculatorChart outputs={filteredOutputs} showTooltip={true} />
                                </Flex>
                            )}

                            <Flex flexDirection="row" width="100%">
                                <Text fontSize="xl" fontWeight="bold" color={result.isRetirementPossible ? '#57E964' : 'red'}>
                                    {result.isRetirementPossible ? 'Retirement is possible' : 'Retirement is not possible'}
                                </Text>

                                <Button 
                                    marginLeft="auto" 
                                    fontWeight="normal"
                                    onClick={toggleChartHandler}
                                >{showResultChart ? 'Hide' : 'Show'} Chart</Button>
                            </Flex>

                            <ResultTable timelineData={result.timelineData} />
                        </Flex>
                    </TabPanel>
                ))}
            </TabPanels>
        </Tabs>
    )
}