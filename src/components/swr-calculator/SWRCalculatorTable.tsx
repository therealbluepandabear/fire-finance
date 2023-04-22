import { TabList, Tabs, Tab, TabPanels, TabPanel, Flex, Text } from '@chakra-ui/react'
import { InvestmentTimelinePoint, StartingYearResult, SWRCalculatorOutputs } from '../../models/swr-calculator'
import { TableContainer, Th, Thead, Tr, Table, Tbody, Td } from '@chakra-ui/table'
import { formatCurrency } from '../../utils'

interface SWRCalculatorTableProps {
    outputs: SWRCalculatorOutputs
}

export default function SWRCalculatorTable(props: SWRCalculatorTableProps): JSX.Element {
    return (
        <Tabs>
            <TabList overflowY="hidden">
                {props.outputs.results.map((result, index) => (
                    <Tab key={index} flexShrink={0}>{result.year}</Tab>
                ))}
            </TabList>

            <TabPanels>
                {props.outputs.results.map((result, index) => (
                    <TabPanel>
                        <Flex flexDirection="column" key={index}>
                            <Text fontSize="xl" color={result.isRetirementPossible ? 'limegreen' : 'red'}>
                                {result.isRetirementPossible ? 'Retirement is possible' : 'Retirement is not possible'}
                            </Text>

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
                                        {result.timelineData.map((point, key) => (
                                            <Tr key={key}>
                                                <Td>{result.year + point.investmentYear}</Td>                                               
                                                <Td>{point.investmentYear}</Td>
                                                <Td>{formatCurrency(point.networth)}</Td>
                                            </Tr>
                                        ))}
                                    </Tbody>
                                </Table>
                            </TableContainer>
                        </Flex>
                    </TabPanel>
                ))}
            </TabPanels>
        </Tabs>
    )
}