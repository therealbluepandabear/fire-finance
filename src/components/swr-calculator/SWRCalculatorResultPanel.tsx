import { TabList, Tabs, Tab, TabPanels, TabPanel, Flex, Text, Box } from '@chakra-ui/react'
import { StartingYearResult, SWRCalculatorOutputs } from '../../models/swr-calculator'
import { TableContainer, Th, Thead, Tr, Table, Tbody, Td } from '@chakra-ui/table'
import { formatCurrency } from '../../utils'


interface SWRCalculatorTableProps {
    result: StartingYearResult
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
                    {props.result.timelineData.map((point, key) => (
                        <Tr key={key}>
                            <Td>{props.result.year + point.investmentYear}</Td>                                               
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
                        <Box width="20px" height="20px" background={result.isRetirementPossible ? 'lightgreen' : 'red'}></Box>
                        <Tab key={index} flexShrink={0}>{result.year}</Tab>
                    </Flex>
                ))}
            </TabList>

            <TabPanels>
                {props.outputs.results.map((result, index) => (
                    <TabPanel>
                        <Flex flexDirection="column" key={index}>
                            <Text fontSize="xl" color={result.isRetirementPossible ? 'lightgreen' : 'red'}>
                                {result.isRetirementPossible ? 'Retirement is possible' : 'Retirement is not possible'}
                            </Text>

                            <SWRCalculatorTable result={result} />
                        </Flex>
                    </TabPanel>
                ))}
            </TabPanels>
        </Tabs>
    )
}