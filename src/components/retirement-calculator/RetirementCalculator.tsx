import { useState } from 'react'
import { Flex, Text } from '@chakra-ui/react'
import { calculateRetirementAge, RetirementCalculatorInputs, RetirementCalculatorOutputs } from '../../models/Calculator'

import RetirementCalculatorForm from './RetirementCalculatorForm'
import RetirementCalculatorChart from './RetirementCalculatorChart'

export default function RetirementCalculator(): JSX.Element {
    const [outputs, setOutputs] = useState<RetirementCalculatorOutputs | null>(null)

    function submitHandler(inputs: RetirementCalculatorInputs): void {
        setOutputs(calculateRetirementAge(inputs))
    }

    return (
        <Flex flexDirection={{ base: "column", md: "row" }}>
            <RetirementCalculatorForm onSubmit={submitHandler} />

            <Flex 
                flexGrow="1" 
                alignItems="center" 
                justifyContent="center"
                height="100vh"
                padding="56px"
                flexDirection="column"
                minWidth="0" /* Allow resizing */
            >
                {outputs && <Text fontSize="3xl">You can retire by age <Text as="span" fontWeight="bold" color="#82ca9d">{outputs.retirementAge}</Text></Text>}
                {outputs && <RetirementCalculatorChart outputs={outputs} />}
            </Flex>
        </Flex>
    )
}