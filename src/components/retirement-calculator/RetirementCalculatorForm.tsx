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
    Tooltip,
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    FormLabel,
    Alert,
    AlertIcon,
    AlertDescription
} from '@chakra-ui/react'
import { MdFace, MdAttachMoney, MdPercent, MdHelp } from 'react-icons/md'
import { RetirementCalculatorInputs } from '../../models/calculator'
import { RegisterOptions, useForm, UseFormRegisterReturn } from 'react-hook-form'
import { useEffect, useState } from 'react'

interface FormInputProps {
    isInvalid: boolean
    placeholder: string
    icon: JSX.Element
    register: UseFormRegisterReturn
    tooltipText: string
}

function FormInput(props: FormInputProps): JSX.Element {
    return (
        <FormControl isInvalid={props.isInvalid} variant="floating">
            <InputGroup>
                <InputLeftElement>
                    {props.icon}
                </InputLeftElement>

                <Input 
                    borderRadius="24px"
                    size="md"
                    errorBorderColor="red.500"
                    placeholder=" "
                    type="number"
                    {...props.register}
                />

                <FormLabel style={{ marginLeft: "32px" }} color="gray" background="transparent">{props.placeholder}</FormLabel>
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

function PercentageIcon(): JSX.Element {
    return <MdPercent color="lightgray" />
}

function DollarsIcon(): JSX.Element {
    return <MdAttachMoney color="lightgray" />
}

function AgeIcon(): JSX.Element {
    return <MdFace color="lightgray" />
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

interface RetirementCalculatorFormProps {
    onSubmit: (params: RetirementCalculatorInputs) => void
}

export default function RetirementCalculatorForm(props: RetirementCalculatorFormProps): JSX.Element {
    const { register, handleSubmit, formState: { errors }, watch } = useForm<RetirementCalculatorInputs>({ defaultValues: {
        age: 20,
        annualIncome: 70_000,
        annualSpending: 30_000,

        networth: 0,
        safeWithdrawalRate: 4,
        inflationRate: 0,

        stocksAllocationRate: 100,
        bondsAllocationRate: 0,
        cashAllocationRate: 0,

        stocksReturnRate: 7,
        bondsReturnRate: 0,
        cashReturnRate: 0
    }})

    const [invalidAllocation, setInvalidAllocation] = useState(false)

    const stocksAllocationRate = watch('stocksAllocationRate')
    const bondsAllocationRate = watch('bondsAllocationRate')
    const cashAllocationRate = watch('cashAllocationRate')

    useEffect(() => {
        if ((stocksAllocationRate + bondsAllocationRate + cashAllocationRate) !== 1) {
            setInvalidAllocation(true);
        } else {
            setInvalidAllocation(false);
        }
    }, [stocksAllocationRate, bondsAllocationRate, cashAllocationRate]);

    const numberRegisterOptions: RegisterOptions = { 
        required: true, 
        setValueAs: (value: string): number => parseInt(value)
    }
    
    const percentageRegisterOptions: RegisterOptions = {
        required: true,
        setValueAs: (value: string): number => parseInt(value) / 100
    }

    function onSubmit(data: RetirementCalculatorInputs) {
        if (!invalidAllocation) {
            setInvalidAllocation(false)
            props.onSubmit(data)
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Flex 
                flexDirection="column" 
                gap="13px" 
            >
                <Text fontSize="3xl">Retirement Calculator</Text>

                <FormInput 
                    placeholder="Age" 
                    icon={<AgeIcon />} 
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

                <Flex 
                    flexDirection={{ base: "column", xl: "row" }}
                    gap="13px"
                >
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

                <Flex 
                    flexDirection={{ base: "column", xl: "row" }}
                    gap="13px"
                >
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

                <Accordion allowToggle>
                    <AccordionItem>
                        <AccordionButton>
                            <Flex width="100%">
                                Advanced
                                <AccordionIcon marginLeft="auto" />
                            </Flex>
                        </AccordionButton>
                        <AccordionPanel pb={4}>
                            <Flex 
                                flexDirection="column" 
                                gap="13px" 
                            >
                                <FormInput
                                    placeholder="Income Growth Rate"
                                    icon={<PercentageIcon />}
                                    isInvalid={!!errors.incomeGrowthRate}
                                    register={register("incomeGrowthRate", { ...percentageRegisterOptions, required: false })}
                                    tooltipText="Expected annual rate of growth for your annual income."
                                />

                                <FormInput
                                    placeholder="Retirement Age"
                                    icon={<AgeIcon />}
                                    isInvalid={!!errors.retirementAge}
                                    register={register("retirementAge", { ...numberRegisterOptions, required: false })}
                                    tooltipText="Age at which you expect to retire."
                                />

                                <FormInput
                                    placeholder="Maximum Age"
                                    icon={<AgeIcon />}
                                    isInvalid={!!errors.maximumAge}
                                    register={register("maximumAge", { ...numberRegisterOptions, required: false })}
                                    tooltipText="Maximum age for your retirement plan."
                                />
                            </Flex>
                        </AccordionPanel>
                    </AccordionItem>
                </Accordion>

                {invalidAllocation && (
                    <Alert status="error" border="1px solid red" background="#ffcccb">
                        <AlertIcon />
                        <AlertDescription>Asset allocation must add to 100%.</AlertDescription>
                    </Alert>
                )}

                <FormSubmitButton />
            </Flex>
        </form>
    )
}