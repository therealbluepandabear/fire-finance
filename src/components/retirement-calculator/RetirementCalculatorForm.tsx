import { 
    Flex, 
    Text, 
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Alert,
    AlertIcon,
    AlertDescription
} from '@chakra-ui/react'
import { MdFace, MdAttachMoney, MdPercent } from 'react-icons/md'
import { RetirementCalculatorInputs } from '../../models/retirement-calculator'
import { RegisterOptions, useForm } from 'react-hook-form'
import { useEffect, useState } from 'react'
import FormInput from '../ui/FormInput'
import FormSubmitButton from '../ui/FormSubmitButton'

function PercentageIcon(): JSX.Element {
    return <MdPercent color="lightgray" />
}

function DollarsIcon(): JSX.Element {
    return <MdAttachMoney color="lightgray" />
}

function AgeIcon(): JSX.Element {
    return <MdFace color="lightgray" />
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
        const areAllocationRatesInvalid = (stocksAllocationRate + bondsAllocationRate + cashAllocationRate) !== 1

        if (areAllocationRatesInvalid) {
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
                    inputLeftElement={<AgeIcon />} 
                    isInvalid={!!errors.age}
                    register={register("age", numberRegisterOptions)} 
                    tooltipText="Your current age."
                />

                <FormInput 
                    placeholder="Annual Income" 
                    inputLeftElement={<DollarsIcon />} 
                    isInvalid={!!errors.annualIncome}
                    register={register("annualIncome", numberRegisterOptions)} 
                    tooltipText="Total income earned yearly after tax."
                />

                <FormInput 
                    placeholder="Annual Spending" 
                    inputLeftElement={<DollarsIcon />} 
                    isInvalid={!!errors.annualSpending}
                    register={register("annualSpending", numberRegisterOptions)} 
                    tooltipText="Total money spent yearly."
                />

                <FormInput 
                    placeholder="Networth" 
                    inputLeftElement={<DollarsIcon />} 
                    isInvalid={!!errors.networth}
                    register={register("networth", numberRegisterOptions)} 
                    tooltipText="Total value of assets minus liabilities."
                />

                <FormInput 
                    placeholder="Safe Withdrawal Rate" 
                    inputLeftElement={<PercentageIcon />} 
                    isInvalid={!!errors.safeWithdrawalRate}
                    register={register("safeWithdrawalRate", percentageRegisterOptions)} 
                    tooltipText="Percentage of retirement savings to withdraw yearly."
                />

                <FormInput 
                    placeholder="Inflation Rate" 
                    inputLeftElement={<PercentageIcon />} 
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
                        inputLeftElement={<PercentageIcon />}
                        isInvalid={!!errors.stocksAllocationRate}
                        register={register("stocksAllocationRate", percentageRegisterOptions)}
                        tooltipText="Percentage of annual income to invest in stocks."
                    />

                    <FormInput
                        placeholder="Bonds"
                        inputLeftElement={<PercentageIcon />}
                        isInvalid={!!errors.bondsAllocationRate}
                        register={register("bondsAllocationRate", percentageRegisterOptions)}
                        tooltipText="Percentage of annual income to invest in bonds."
                    />

                    <FormInput 
                        placeholder="Cash"
                        inputLeftElement={<PercentageIcon />}
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
                        inputLeftElement={<PercentageIcon />}
                        isInvalid={!!errors.stocksReturnRate}
                        register={register("stocksReturnRate", percentageRegisterOptions)}
                        tooltipText="Expected annual rate of return for your money invested in stocks."
                    />

                    <FormInput
                        placeholder="Bonds"
                        inputLeftElement={<PercentageIcon />}
                        isInvalid={!!errors.bondsReturnRate}
                        register={register("bondsReturnRate", percentageRegisterOptions)}
                        tooltipText="Expected annual rate of return for your money invested in bonds."
                    />

                    <FormInput
                        placeholder="Cash"
                        inputLeftElement={<PercentageIcon />}
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
                                    inputLeftElement={<PercentageIcon />}
                                    isInvalid={!!errors.incomeGrowthRate}
                                    register={register("incomeGrowthRate", { ...percentageRegisterOptions, required: false })}
                                    tooltipText="Expected annual rate of growth for your annual income."
                                />

                                <FormInput
                                    placeholder="Retirement Age"
                                    inputLeftElement={<AgeIcon />}
                                    isInvalid={!!errors.retirementAge}
                                    register={register("retirementAge", { ...numberRegisterOptions, required: false })}
                                    tooltipText="Age at which you expect to retire."
                                />

                                <FormInput
                                    placeholder="Maximum Age"
                                    inputLeftElement={<AgeIcon />}
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

                <FormSubmitButton>Calculate</FormSubmitButton>
            </Flex>
        </form>
    )
}