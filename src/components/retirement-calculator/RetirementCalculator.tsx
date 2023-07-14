import { useState } from 'react'
import { Button, Flex, Text } from '@chakra-ui/react'
import { calculateRetirementAge, RetirementCalculatorInputs, RetirementCalculatorOutputs, getExcelWorkbook } from '../../models/retirement-calculator'
import { saveToFile } from '../../utils'

import RetirementCalculatorForm from './RetirementCalculatorForm'
import RetirementCalculatorChart from './RetirementCalculatorChart'
import RetirementCalculatorTable from './RetirementCalculatorTable'

export default function RetirementCalculator() {
    const [outputs, setOutputs] = useState<RetirementCalculatorOutputs | null>(null)

    function submitHandler(inputs: RetirementCalculatorInputs): void {
        const outputs = calculateRetirementAge(inputs)
        setOutputs(outputs)
    }

    async function excelClickHandler() {
        if (!outputs) {
            return
        }

        const workbook = getExcelWorkbook(outputs)

        const xlsxId = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    
        const buffer = await workbook.xlsx.writeBuffer()
        const xlsxBlob = new Blob([buffer], { type: xlsxId })
    
        saveToFile('fire_outlook.xlsx', URL.createObjectURL(xlsxBlob))
    }

    return (
        <Flex flexDirection={{ base: "column", md: "row" }}>
            <Flex flexDirection="column" width={{ base: "100vw", md: "30%" }} padding="24px">
                <RetirementCalculatorForm onSubmit={submitHandler} />
                {outputs && (
                    <Button 
                        fontWeight="normal"
                        onClick={excelClickHandler}
                    >Download Excel File</Button>
                )}
                {outputs && <RetirementCalculatorTable outputs={outputs} />}
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
                    <Text fontSize="3xl">You can achieve financial independence by age{' '}
                        <Text as="span" fontWeight="bold" color="#82ca9d">
                            {outputs.fireAge}
                        </Text>
                    </Text>
                )}
                {outputs && (
                    <RetirementCalculatorChart outputs={outputs} />
                )}
            </Flex>
        </Flex>
    )
}