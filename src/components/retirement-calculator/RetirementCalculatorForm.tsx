import { Flex, Text, InputGroup, InputLeftElement, Input, Button, FormErrorMessage, FormControl, Box } from '@chakra-ui/react'
import { MdFace, MdAttachMoney, MdPercent } from 'react-icons/md'
import { RetirementCalculatorInputs } from '../../models/Calculator'
import { RegisterOptions, SubmitHandler, useForm, UseFormRegisterReturn } from 'react-hook-form'

interface RetirementCalculatorInputProps {
    isInvalid: boolean
    placeholder: string
    errorMessage: string
    icon: JSX.Element
    register: UseFormRegisterReturn
}

function RetirementCalculatorInput(props: RetirementCalculatorInputProps): JSX.Element {
    return (
        <FormControl isInvalid={props.isInvalid}>
            <InputGroup>
                <InputLeftElement>
                    {props.icon}
                </InputLeftElement>

                <Input 
                    borderRadius="24px"
                    size="md"
                    errorBorderColor="red.500"
                    placeholder={props.placeholder} 
                    type="number"
                    {...props.register}
                />
            </InputGroup>
            <FormErrorMessage>{props.errorMessage}</FormErrorMessage>
        </FormControl>
    )
}

interface RetirementCalculatorFormProps {
    onSubmit: (params: RetirementCalculatorInputs) => void
}

export default function RetirementCalculatorForm(props: RetirementCalculatorFormProps): JSX.Element {
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

                    <RetirementCalculatorInput 
                        placeholder="Age" 
                        icon={<MdFace color="lightgray" />} 
                        isInvalid={!!errors.age}
                        errorMessage="Age is required."
                        register={register("age", registerOptions)} 
                    />

                    <RetirementCalculatorInput 
                        placeholder="Annual Income" 
                        icon={<MdAttachMoney color="lightgray" />} 
                        isInvalid={!!errors.annualIncome}
                        errorMessage="Annual Income is required."
                        register={register("annualIncome", registerOptions)} 
                    />

                    <RetirementCalculatorInput 
                        placeholder="Annual Spending" 
                        icon={<MdAttachMoney color="lightgray" />} 
                        isInvalid={!!errors.annualSpending}
                        errorMessage="Annual Spending is required."
                        register={register("annualSpending", registerOptions)} 
                    />

                    <RetirementCalculatorInput 
                        placeholder="Networth" 
                        icon={<MdAttachMoney color="lightgray" />} 
                        isInvalid={!!errors.networth}
                        errorMessage="Networth is required."
                        register={register("networth", registerOptions)} 
                    />

                    <RetirementCalculatorInput 
                        placeholder="Investment Return Rate" 
                        icon={<MdPercent color="lightgray" />} 
                        isInvalid={!!errors.investmentReturnRate}
                        errorMessage="Investment Return Rate is required."
                        register={register("investmentReturnRate", registerOptions)} 
                    />

                    <RetirementCalculatorInput 
                        placeholder="Safe Withdrawal Rate" 
                        icon={<MdPercent color="lightgray" />} 
                        isInvalid={!!errors.safeWithdrawalRate}
                        errorMessage="Safe Withdrawal Rate is required."
                        register={register("safeWithdrawalRate", registerOptions)} 
                    />

                    <Button 
                        sx={buttonStyle}
                        type="submit"
                    >Calculate</Button>
                </Flex>
            </form>
        </Box>
    )
}