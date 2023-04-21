import { TableContainer, Th, Thead, Tr, Table, Tbody, Td } from '@chakra-ui/table'
import { RetirementCalculatorOutputs } from '../../models/retirement-calculator'
import { currency } from '../../utils'

interface RetirementCalculatorTableProps {
    outputs: RetirementCalculatorOutputs
}

export default function RetirementCalculatorTable(props: RetirementCalculatorTableProps) {
    return (
        <TableContainer>
            <Table>
                <Thead>
                    <Tr>
                        <Th>Age</Th>
                        <Th>Year</Th>
                        <Th>Networth</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {props.outputs.data.map((point, key): JSX.Element => {
                        return (
                            <Tr 
                                background={point.age === props.outputs.fireAge ? 'gold' : 'white'}
                                key={key}
                            >
                                <Td>{point.age}</Td>
                                <Td>{point.year}</Td>
                                <Td>{currency(point.networth)}</Td>
                            </Tr>
                        )
                    })}
                </Tbody>
            </Table>
        </TableContainer>
    )
}