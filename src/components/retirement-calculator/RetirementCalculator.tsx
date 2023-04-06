import { useState } from 'react'
import { Flex, Text } from '@chakra-ui/react'
import { calculateRetirementAge, RetirementCalculatorInputs } from '../../models/Calculator'

import RetirementCalculatorForm from './RetirementCalculatorForm'
import RetirementCalculatorChart from './RetirementCalculatorChart'

export default function RetirementCalculator(): JSX.Element {
    const [networth100yrs, setNetworth100yrs] = useState<number>(0)
    const [inputs, setInputs] = useState<RetirementCalculatorInputs | null>(null)

    function submitHandler(inputs: RetirementCalculatorInputs): void {
        setInputs(inputs)
    }

    return (
        <Flex flexDirection="row">
            <RetirementCalculatorForm onSubmit={submitHandler} />

            <Flex 
                flexGrow="1" 
                alignItems="center" 
                justifyContent="center"
                height="100vh"
                padding="56px"
                flexDirection="column"
            >
                <Text fontSize="3xl">Your networth in 100 years will be <Text as="span" fontWeight="bold" color="orange" textDecoration="underline">${networth100yrs}</Text></Text>
                <RetirementCalculatorChart age={inputs?.age ?? 0} networth={networth100yrs} />
            </Flex>
        </Flex>
    )
}