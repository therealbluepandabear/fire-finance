import { 
    Flex, 
    Text, 
    InputGroup, 
    InputLeftElement, 
    Input,
    Button, 
    FormErrorMessage,
    FormControl, 
    InputRightElement,
    Tooltip
} from '@chakra-ui/react'
import { MdFace, MdAttachMoney, MdPercent, MdHelp } from 'react-icons/md'
import { RetirementCalculatorInputs } from '../../models/Calculator'
import { RegisterOptions, useForm, UseFormRegisterReturn } from 'react-hook-form'

interface RetirementCalculatorInputProps {
    isInvalid: boolean
    placeholder: string
    icon: JSX.Element
    register: UseFormRegisterReturn
    tooltipText: string
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

                <Tooltip label={props.tooltipText} textAlign="center" fontSize="12px">
                    <InputRightElement>
                        <MdHelp color="lightgray" />
                    </InputRightElement>
                </Tooltip>
            </InputGroup>
            <FormErrorMessage>{props.placeholder} is required</FormErrorMessage>
        </FormControl>
    )
}

interface RetirementCalculatorFormProps {
    onSubmit: (params: RetirementCalculatorInputs) => void
}

export default function RetirementCalculatorForm(props: RetirementCalculatorFormProps): JSX.Element {
    const { register, handleSubmit, formState: { errors }, clearErrors, watch } = useForm<RetirementCalculatorInputs>({
        reValidateMode: 'onSubmit'
    })

    watch((value, { name, type }) => {
        if (name && errors[name]) {
            clearErrors(name)
        }
    });

    const registerOptions: RegisterOptions = { 
        required: true, 
        setValueAs: (value: string): number => parseInt(value)
    }

    return (
        <form onSubmit={handleSubmit(props.onSubmit)}>
            <Flex 
                flexDirection="column" 
                gap="12px" 
            >
                <Text fontSize="3xl">Retirement Calculator</Text>

                <RetirementCalculatorInput 
                    placeholder="Age" 
                    icon={<MdFace color="lightgray" />} 
                    isInvalid={!!errors.age}
                    register={register("age", registerOptions)} 
                    tooltipText="Your current age."
                />

                <RetirementCalculatorInput 
                    placeholder="Annual Income" 
                    icon={<MdAttachMoney color="lightgray" />} 
                    isInvalid={!!errors.annualIncome}
                    register={register("annualIncome", registerOptions)} 
                    tooltipText="Total income earned yearly after tax."
                />

                <RetirementCalculatorInput 
                    placeholder="Annual Spending" 
                    icon={<MdAttachMoney color="lightgray" />} 
                    isInvalid={!!errors.annualSpending}
                    register={register("annualSpending", registerOptions)} 
                    tooltipText="Total money spent yearly."
                />

                <RetirementCalculatorInput 
                    placeholder="Networth" 
                    icon={<MdAttachMoney color="lightgray" />} 
                    isInvalid={!!errors.networth}
                    register={register("networth", registerOptions)} 
                    tooltipText="Total value of assets minus liabilities."
                />

                <RetirementCalculatorInput 
                    placeholder="Investment Return Rate" 
                    icon={<MdPercent color="lightgray" />} 
                    isInvalid={!!errors.investmentReturnRate}
                    register={register("investmentReturnRate", registerOptions)} 
                    tooltipText="Yearly stock market rate of return."
                />

                <RetirementCalculatorInput 
                    placeholder="Safe Withdrawal Rate" 
                    icon={<MdPercent color="lightgray" />} 
                    isInvalid={!!errors.safeWithdrawalRate}
                    register={register("safeWithdrawalRate", registerOptions)} 
                    tooltipText="Percentage of retirement savings to withdraw yearly."
                />

                <RetirementCalculatorInput 
                    placeholder="Inflation Rate" 
                    icon={<MdPercent color="lightgray" />} 
                    isInvalid={!!errors.inflationRate}
                    register={register("inflationRate", registerOptions)} 
                    tooltipText="Annual inflation rate."
                />

                <Button 
                    fontWeight="normal"
                    background="linear-gradient(160deg, #00e9dd 0%, #91d080 100%)"
                    textColor="white"
                    _hover={{ filter: "brightness(108%)" }}
                    _active={{ filter: "brightness(92%)" }}
                    type="submit"
                >Calculate</Button>
            </Flex>
        </form>
    )
}