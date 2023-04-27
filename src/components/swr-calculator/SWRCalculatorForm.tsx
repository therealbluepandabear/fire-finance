import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Flex, FormLabel, Select, Switch, Text } from '@chakra-ui/react'
import { RegisterOptions, useForm } from 'react-hook-form'
import { MdAttachMoney, MdPercent, MdSchedule } from 'react-icons/md'
import { SWRCalculatorInputs } from '../../models/swr-calculator'
import FormInput from '../ui/FormInput'
import FormSubmitButton from '../ui/FormSubmitButton'


interface SWRCalculatorFormProps {
    onSubmit: (params: SWRCalculatorInputs) => void
}

export default function SWRCalculatorForm(props: SWRCalculatorFormProps): JSX.Element {
    const { register, handleSubmit, formState: { errors } } = useForm<SWRCalculatorInputs>()
    
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
                gap="13px" 
            >
                <Text fontSize="3xl">Safe Withdrawal Rate Calculator</Text>

                <FormInput 
                    placeholder="Networth" 
                    inputLeftElement={<MdAttachMoney color="lightgray" />} 
                    isInvalid={!!errors.networth}
                    register={register("networth", numberRegisterOptions)} 
                    tooltipText="Your current networth."
                />

                <FormInput 
                    placeholder="Duration (years)" 
                    inputLeftElement={<MdSchedule color="lightgray" />} 
                    isInvalid={!!errors.duration}
                    register={register("duration", numberRegisterOptions)} 
                    tooltipText="Duration (years)."
                />

                <FormInput 
                    placeholder="Safe Withdrawal Rate" 
                    inputLeftElement={<MdPercent color="lightgray" />} 
                    isInvalid={!!errors.safeWithdrawalRate}
                    register={register("safeWithdrawalRate", percentageRegisterOptions)} 
                    tooltipText="Percentage of retirement savings to withdraw yearly."
                />

                <Text>Asset Allocation</Text>

                <Flex 
                    flexDirection={{ base: "column", xl: "row" }}
                    gap="13px"
                >
                    <FormInput
                        placeholder="Stocks"
                        inputLeftElement={<MdPercent color="lightgray" />}
                        isInvalid={!!errors.stocksAllocationRate}
                        register={register("stocksAllocationRate", percentageRegisterOptions)}
                        tooltipText="Percentage of starting networth to invest in stocks."
                    />

                    <FormInput
                        placeholder="Gold"
                        inputLeftElement={<MdPercent color="lightgray" />}
                        isInvalid={!!errors.goldAllocationRate}
                        register={register("goldAllocationRate", percentageRegisterOptions)}
                        tooltipText="Percentage of starting networth to invest in gold."
                    />

                    <FormInput
                        placeholder="Bonds"
                        inputLeftElement={<MdPercent color="lightgray" />}
                        isInvalid={!!errors.bondsAllocationRate}
                        register={register("bondsAllocationRate", percentageRegisterOptions)}
                        tooltipText="Percentage of starting networth to invest in bonds."
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
                                <Flex flexDirection="row">
                                    <FormLabel htmlFor="loopSwitch">Loop</FormLabel>
                                    <Switch id="loopSwitch" {...register("shouldLoop")}  />
                                </Flex>

                                <Select placeholder='Withdrawal strategy' {...register("strategy")}>
                                    <option value='fixed-percentage'>Fixed percentage</option>
                                    <option value='initial-percentage'>Initial percentage</option>
                                </Select>
                            </Flex>
                        </AccordionPanel>
                    </AccordionItem>
                </Accordion>

                <FormSubmitButton>Calculate</FormSubmitButton>
            </Flex>
        </form>
    )
}