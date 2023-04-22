import SWRCalculatorForm from './SWRCalculatorForm'
import { Flex, Text } from '@chakra-ui/react'
import { calculateChanceOfSuccess, CycleInfo, getCycleInfo, SWRCalculatorInputs, SWRCalculatorOutputs } from '../../models/swr-calculator'
import { useState } from 'react'
import SWRCalculatorChart from './SWRCalculatorChart'
import SWRCalculatorResultPanel from './SWRCalculatorResultPanel'

export default function SWRCalculator(): JSX.Element {
    const [outputs, setOutputs] = useState<SWRCalculatorOutputs | null>(null)
    const [cycleInfo, setCycleInfo] = useState<CycleInfo | null>(null)   

    async function submitHandler(inputs: SWRCalculatorInputs): Promise<void> {
        const outputs = await calculateChanceOfSuccess(inputs)
        setOutputs(outputs)

        const cycleInfo = getCycleInfo(outputs)
        setCycleInfo(cycleInfo)
    }

    return (  
        <Flex flexDirection={{ base: "column", md: "row" }}>
            <Flex flexDirection="column" width={{ base: "100vw", md: "30%" }} padding="24px">
                <SWRCalculatorForm onSubmit={submitHandler} />

                {outputs && (
                    <SWRCalculatorResultPanel outputs={outputs} />
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
                 {cycleInfo && (
                    <Flex flexDirection="column">
                        <Text fontSize="xl">Failures: {cycleInfo.failures} / {cycleInfo.total}</Text>
                        <Text fontSize="xl">Success rate: {(cycleInfo.successRate * 100).toFixed(2)}%</Text>
                    </Flex>
                )}
                {outputs && (
                    <SWRCalculatorChart outputs={outputs} />
                )}
            </Flex>
        </Flex>
    )
}