import { Flex, Text, InputGroup, InputLeftElement, Input, Button, FormErrorMessage, FormControl, Box } from '@chakra-ui/react'
import { MdFace, MdAttachMoney, MdPercent } from 'react-icons/md'
import { RetirementCalculatorInputs } from '../../models/Calculator'
import { RegisterOptions, SubmitHandler, useForm } from 'react-hook-form'

interface RetirementCalculatorInputProps {
    onSubmit: (params: RetirementCalculatorInputs) => void
}

export default function RetirementCalculatorForm(props: RetirementCalculatorInputProps): JSX.Element {
    const inputStyle = {
        borderRadius: '24px',
        size: 'md',
        errorBorderColor: 'red.500',
    }

    const buttonStyle = {
        fontWeight: "normal" ,
        background: "linear-gradient(160deg, #00e9dd 0%, #91d080 100%)",
        textColor: "white",
        _hover: { filter: "brightness(108%)" },
        _active: { filter: "brightness(92%)" }
    }

    const { register, handleSubmit, formState: { errors } } = useForm<RetirementCalculatorInputs>()
    
    const submitHandler: SubmitHandler<RetirementCalculatorInputs> = function(inputs: RetirementCalculatorInputs): void {
        props.onSubmit(inputs)
    }

    const registerOptions: RegisterOptions = { 
        required: true, 
        setValueAs: (value: string): number => parseInt(value) 
    }

    return (
        <Box width={{ base: "100vw", md: "30%" }} padding="24px">
            <form onSubmit={handleSubmit(submitHandler)}>
                <Flex 
                    flexDirection="column" 
                    gap="12px" 
                >
                    <Text fontSize="3xl">Retirement Calculator</Text>

                    <FormControl isInvalid={!!errors.age}>
                        <InputGroup>
                            <InputLeftElement>
                                <MdFace color="lightgray" />
                            </InputLeftElement>

                            <Input 
                                sx={inputStyle} 
                                placeholder="Age" 
                                type="number"
                                {...register("age", registerOptions)}
                            />
                        </InputGroup>
                        <FormErrorMessage>Age is required.</FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={!!errors.annualIncome}>
                        <InputGroup>
                            <InputLeftElement>
                                <MdAttachMoney color="lightgray" />
                            </InputLeftElement>

                            <Input 
                                sx={inputStyle} 
                                placeholder="Annual Income" 
                                {...register("annualIncome", registerOptions)}
                            />
                        </InputGroup>
                        <FormErrorMessage>Annual Income is required.</FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={!!errors.annualSpending}>
                        <InputGroup>
                            <InputLeftElement>
                                <MdAttachMoney color="lightgray" />
                            </InputLeftElement>

                            <Input 
                                sx={inputStyle} 
                                placeholder="Annual Spending"  
                                {...register("annualSpending", registerOptions)}
                            />
                        </InputGroup>
                        <FormErrorMessage>Annual Spending is required.</FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={!!errors.networth}>
                        <InputGroup>
                            <InputLeftElement>
                                <MdAttachMoney color="lightgray" />
                            </InputLeftElement>

                            <Input 
                                sx={inputStyle} 
                                placeholder="Networth"  
                                {...register("networth", registerOptions)}
                            />
                        </InputGroup>
                        <FormErrorMessage>Networth is required.</FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={!!errors.investmentReturnRate}>
                        <InputGroup>
                            <InputLeftElement>
                                <MdPercent color="lightgray" />
                            </InputLeftElement>

                            <Input 
                                sx={inputStyle} 
                                placeholder="Investment Return Rate"   
                                {...register("investmentReturnRate", registerOptions)}
                            />
                        </InputGroup>
                        <FormErrorMessage>Investment Return Rate is required.</FormErrorMessage>
                    </FormControl>

                    <FormControl isInvalid={!!errors.safeWithdrawalRate}>
                        <InputGroup>
                            <InputLeftElement>
                                <MdPercent color="lightgray" />
                            </InputLeftElement>

                            <Input 
                                sx={inputStyle} 
                                placeholder="Safe Withdrawal Rate"  
                                {...register("safeWithdrawalRate", registerOptions)}
                            />
                        </InputGroup>
                        <FormErrorMessage>Safe Withdrawal Rate is required.</FormErrorMessage>
                    </FormControl>

                    <Button 
                        sx={buttonStyle}
                        type="submit"
                    >Calculate</Button>
                </Flex>
            </form>
        </Box>
    )
}