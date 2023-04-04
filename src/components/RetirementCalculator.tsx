import { Flex, Input, InputGroup, InputLeftElement, Text, Button } from '@chakra-ui/react'
import { MdAttachMoney, MdFace, MdPercent } from 'react-icons/md'

function calculateYearsToRetirement(
    age: number, 
    annualIncome: number,
    annualSpending: number, 
    networth: number,
    investmentReturn: number,
    inflationRate: number
): number {
    return 5;
}

export default function RetirementCalculator(): JSX.Element {
    const inputStyle = {
        borderRadius: "24px",
        size: "md",
        type: "number"
    }

    const gap = "12px"

    return (
        <Flex flexDirection="column" padding="24px" gap={gap} width={{ base: "100%", md: "50%" }}>
            <Text fontSize="3xl">Retirement Calculator</Text>

            <InputGroup>
                <InputLeftElement>
                    <MdFace color="lightgray" />
                </InputLeftElement>

                <Input sx={inputStyle} placeholder="Age" />
            </InputGroup>

            <InputGroup>
                <InputLeftElement>
                    <MdAttachMoney color="lightgray" />
                </InputLeftElement>

                <Input sx={inputStyle} placeholder="Annual Income" />
            </InputGroup>

            <InputGroup>
                <InputLeftElement>
                    <MdAttachMoney color="lightgray" />
                </InputLeftElement>

                <Input sx={inputStyle} placeholder="Annual Spending" />
            </InputGroup>

            <InputGroup>
                <InputLeftElement>
                    <MdAttachMoney color="lightgray" />
                </InputLeftElement>

                <Input sx={inputStyle} placeholder="Current Networth" />
            </InputGroup>

            <InputGroup>
                <InputLeftElement>
                    <MdPercent color="lightgray" />
                </InputLeftElement>

                <Input sx={inputStyle} placeholder="Investment Return" />
            </InputGroup>

            <InputGroup>
                <InputLeftElement>
                    <MdPercent color="lightgray" />
                </InputLeftElement>

                <Input sx={inputStyle} placeholder="Inflation Rate" />
            </InputGroup>

            <InputGroup>
                <InputLeftElement>
                    <MdPercent color="lightgray" />
                </InputLeftElement>

                <Input sx={inputStyle} placeholder="Safe Withdrawal Rate" />
            </InputGroup>

            <Button 
                fontWeight="normal" 
                background="linear-gradient(160deg, #00e9dd 0%, #91d080 100%)" 
                textColor="white"
                _hover={{ filter: "brightness(108%)" }}
                _active={{ filter: "brightness(92%)" }}
            >Calculate</Button>
        </Flex>
    )
}