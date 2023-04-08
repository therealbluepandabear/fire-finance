import { TableContainer, Th, Thead, Tr, Table, Tbody, Td } from '@chakra-ui/table'
import { RetirementCalculatorOutputs } from '../../models/Calculator'
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
                        <Th>Networth</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {props.outputs.data.map((obj, key): JSX.Element => {
                        return (
                            <Tr 
                                background={obj.age === props.outputs.retirementAge ? 'gold' : 'white'}
                                key={key}
                            >
                                <Td>{obj.age}</Td>
                                <Td>{currency(obj.networth)}</Td>
                            </Tr>
                        )
                    })}
                </Tbody>
            </Table>
        </TableContainer>
    )
}