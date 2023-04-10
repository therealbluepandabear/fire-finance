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

interface FormInputProps {
    isInvalid: boolean
    placeholder: string
    icon: JSX.Element
    register: UseFormRegisterReturn
    tooltipText: string
}

function FormInput(props: FormInputProps): JSX.Element {
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

function PercentageIcon(): JSX.Element {
    return <MdPercent color="lightgray" />
}

function DollarsIcon(): JSX.Element {
    return <MdAttachMoney color="lightgray" />
}

function FormSubmitButton(): JSX.Element {
    return (
        <Button 
            fontWeight="normal"
            background="linear-gradient(160deg, #00e9dd 0%, #91d080 100%)"
            textColor="white"
            _hover={{ filter: "brightness(108%)" }}
            _active={{ filter: "brightness(92%)" }}
            type="submit"
        >Calculate</Button>
    )
}

export default function RetirementCalculatorForm(props: RetirementCalculatorFormProps): JSX.Element {
    const { register, handleSubmit, formState: { errors }, clearErrors, watch } = useForm<RetirementCalculatorInputs>({
        reValidateMode: 'onSubmit'
    })

    watch((value, { name, type }) => {
        if (name && errors[name]) {
            clearErrors(name)
        } 
    })

    const numberRegisterOptions: RegisterOptions = { 
        required: true, 
        setValueAs: (value: string): number => parseInt(value)
    }
    
    const percentageRegisterOptions: RegisterOptions = {
        required: true,
        setValueAs: (value: string): number => parseInt(value) / 100
    }

    return (
        <form onSubmit={handleSubmit(props.onSubmit)}>
            <Flex 
                flexDirection="column" 
                gap="12px" 
            >
                <Text fontSize="3xl">Retirement Calculator</Text>

                <FormInput 
                    placeholder="Age" 
                    icon={<MdFace color="lightgray" />} 
                    isInvalid={!!errors.age}
                    register={register("age", numberRegisterOptions)} 
                    tooltipText="Your current age."
                />

                <FormInput 
                    placeholder="Annual Income" 
                    icon={<DollarsIcon />} 
                    isInvalid={!!errors.annualIncome}
                    register={register("annualIncome", numberRegisterOptions)} 
                    tooltipText="Total income earned yearly after tax."
                />

                <FormInput 
                    placeholder="Annual Spending" 
                    icon={<DollarsIcon />} 
                    isInvalid={!!errors.annualSpending}
                    register={register("annualSpending", numberRegisterOptions)} 
                    tooltipText="Total money spent yearly."
                />

                <FormInput 
                    placeholder="Networth" 
                    icon={<DollarsIcon />} 
                    isInvalid={!!errors.networth}
                    register={register("networth", numberRegisterOptions)} 
                    tooltipText="Total value of assets minus liabilities."
                />

                <FormInput 
                    placeholder="Safe Withdrawal Rate" 
                    icon={<PercentageIcon />} 
                    isInvalid={!!errors.safeWithdrawalRate}
                    register={register("safeWithdrawalRate", percentageRegisterOptions)} 
                    tooltipText="Percentage of retirement savings to withdraw yearly."
                />

                <FormInput 
                    placeholder="Inflation Rate" 
                    icon={<PercentageIcon />} 
                    isInvalid={!!errors.inflationRate}
                    register={register("inflationRate", percentageRegisterOptions)} 
                    tooltipText="Annual inflation rate."
                />

                <Text>Asset Allocation</Text>

                <Flex flexDirection="row" gap="12px">
                    <FormInput
                        placeholder="Stocks"
                        icon={<PercentageIcon />}
                        isInvalid={!!errors.stocksAllocationRate}
                        register={register("stocksAllocationRate", percentageRegisterOptions)}
                        tooltipText="Percentage of annual income to invest in stocks."
                    />

                    <FormInput
                        placeholder="Bonds"
                        icon={<PercentageIcon />}
                        isInvalid={!!errors.bondsAllocationRate}
                        register={register("bondsAllocationRate", percentageRegisterOptions)}
                        tooltipText="Percentage of annual income to invest in bonds."
                    />

                    <FormInput 
                        placeholder="Cash"
                        icon={<PercentageIcon />}
                        isInvalid={!!errors.cashAllocationRate}
                        register={register("cashAllocationRate", percentageRegisterOptions)}
                        tooltipText="Percentage of annual income to invest in cash."
                    />
                </Flex>

                <Text>Expected Rate of Return</Text>

                <Flex flexDirection="row" gap="12px">
                    <FormInput
                        placeholder="Stocks"
                        icon={<PercentageIcon />}
                        isInvalid={!!errors.stocksReturnRate}
                        register={register("stocksReturnRate", percentageRegisterOptions)}
                        tooltipText="Expected annual rate of return for your money invested in stocks."
                    />

                    <FormInput
                        placeholder="Bonds"
                        icon={<PercentageIcon />}
                        isInvalid={!!errors.bondsReturnRate}
                        register={register("bondsReturnRate", percentageRegisterOptions)}
                        tooltipText="Expected annual rate of return for your money invested in bonds."
                    />

                    <FormInput
                        placeholder="Cash"
                        icon={<PercentageIcon />}
                        isInvalid={!!errors.cashReturnRate}
                        register={register("cashReturnRate", percentageRegisterOptions)}
                        tooltipText="Expected annual rate of return for your money invested in cash."
                    />
                </Flex>

                <FormSubmitButton />
            </Flex>
        </form>
    )
}