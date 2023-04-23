import { TabList, Tabs, Tab, TabPanels, TabPanel, Flex, Text, Box } from '@chakra-ui/react'
import { InvestmentTimelinePoint, SWRCalculatorOutputs } from '../../models/swr-calculator'
import { TableContainer, Th, Thead, Tr, Table, Tbody, Td } from '@chakra-ui/table'
import { formatCurrency } from '../../utils'


interface SWRCalculatorTableProps {
    timelineData: InvestmentTimelinePoint[]
}

function SWRCalculatorTable(props: SWRCalculatorTableProps): JSX.Element {
    return (
        <TableContainer>
            <Table>
                <Thead>
                    <Tr>
                        <Th>Year</Th>
                        <Th>Investment Year</Th>
                        <Th>Networth</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {props.timelineData.map((point, key) => (
                        <Tr key={key} background={props.timelineData[0].networth <= point.networth ? '#57E964' : 'red'}>
                            <Td>{point.year}</Td>                                               
                            <Td>{point.investmentYear}</Td>
                            <Td>{formatCurrency(point.networth)}</Td>
                        </Tr>
                    ))}
                </Tbody>
            </Table>
        </TableContainer>
    )
}


interface SWRCalculatorResultPanelProps {
    outputs: SWRCalculatorOutputs
}

export default function SWRCalculatorResultPanel(props: SWRCalculatorResultPanelProps): JSX.Element {
    return (
        <Tabs>
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
                            <Text fontSize="xl" fontWeight="bold" color={result.isRetirementPossible ? '#57E964' : 'red'}>
                                {result.isRetirementPossible ? 'Retirement is possible' : 'Retirement is not possible'}
                            </Text>

                            <Text fontSize="md">Average networth: {formatCurrency(result.averageNetworth)}</Text>

                            <SWRCalculatorTable timelineData={result.timelineData} />
                        </Flex>
                    </TabPanel>
                ))}
            </TabPanels>
        </Tabs>
    )
}