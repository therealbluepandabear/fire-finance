import { Flex } from '@chakra-ui/react'
import RetirementCalculatorInputs from './RetirementCalculatorInputs'
import RetirementCalculatorChart from './RetirementCalculatorChart'

export default function RetirementCalculator(): JSX.Element {

    return (
        <Flex flexDirection="row">
            <RetirementCalculatorInputs />

            <Flex 
                flexGrow="1" 
                alignItems="center" 
                justifyContent="center"
                height="100vh"
                padding="56px"
            >
                <RetirementCalculatorChart />
            </Flex>
        </Flex>
    )
}