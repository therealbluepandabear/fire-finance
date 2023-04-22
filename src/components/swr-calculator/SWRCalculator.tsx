import SWRCalculatorForm from './SWRCalculatorForm'
import { Flex } from '@chakra-ui/react'
import { calculateChanceOfSuccess, SWRCalculatorInputs, SWRCalculatorOutputs } from '../../models/swr-calculator'
import { useState } from 'react'
import SWRCalculatorChart from './SWRCalculatorChart'
import SWRCalculatorTable from './SWRCalculatorTable'

export default function SWRCalculator(): JSX.Element {
    const [outputs, setOutputs] = useState<SWRCalculatorOutputs | null>(null)

    async function submitHandler(inputs: SWRCalculatorInputs): Promise<void> {
        const outputs = await calculateChanceOfSuccess(inputs)
        setOutputs(outputs)
    }

    return (  
        <Flex flexDirection={{ base: "column", md: "row" }}>
            <Flex flexDirection="column" width={{ base: "100vw", md: "30%" }} padding="24px">
                <SWRCalculatorForm onSubmit={submitHandler} />

                {outputs && (
                    <SWRCalculatorTable outputs={outputs} />
                )}
            </Flex>

            <Flex 
                flexGrow="1" 
                alignItems="center" 
                justifyContent="center"
                height="100vh"
                padding="56px"
                flexDirection="column"
                minWidth="0" /* Allow resizing */
            >
                {outputs && (
                    <SWRCalculatorChart outputs={outputs} />
                )}
            </Flex>
        </Flex>
    )
}