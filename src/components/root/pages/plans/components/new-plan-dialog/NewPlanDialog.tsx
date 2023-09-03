import {
    Button,
    Flex,
    Input,
    Modal,
    ModalCloseButton,
    ModalContent,
    ModalOverlay,
    Text} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { MdArrowForward, MdAttachMoney, MdPercent, MdPerson } from 'react-icons/md'
import { PlanEngineInputs } from '../../../../../../models/retirement-calculator'
import StepBar from './StepBar'
import { UseFormReset, UseFormSetValue, useForm } from 'react-hook-form'
import FormInput from '../../../../../ui/FormInput'

interface PlanNameInputProps {
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

function PlanNameInput(props: PlanNameInputProps) {
    return (
        <Input
            marginTop='16px'
            size='lg'
            onChange={props.onChange}
            height='65px'
            letterSpacing='0.3px'
            placeholder='Choose a name'
        />
    )
}

const iconColor = 'lightgray'
const localStorageKey = 'new_plan_inputs'

function updateLocalStorage(inputs: Partial<PlanEngineInputs>): void {
    let prevInputs: Partial<PlanEngineInputs> | null = null

    if (localStorage.getItem(localStorageKey)) {
        prevInputs = JSON.parse(localStorage.getItem(localStorageKey)!) as Partial<PlanEngineInputs>
    }

    localStorage.setItem(localStorageKey, JSON.stringify({ ...prevInputs, ...inputs }))
}

function loadLocalStorage(reset: UseFormSetValue<Partial<PlanEngineInputs>>): void {
    if (localStorage.getItem(localStorageKey)) {
        const item = JSON.parse(localStorage.getItem(localStorageKey)!) as Partial<PlanEngineInputs>

        for (const key in item) {
            const asKey = key as keyof Partial<PlanEngineInputs>

            reset(asKey, item[asKey])
        }
    }
}

function BasicInfoInputs() {
    const { register, setValue, watch } = useForm<Partial<PlanEngineInputs>>()

    useEffect(() => {
        loadLocalStorage(setValue)
    }, [])

    watch(inputs => {
        updateLocalStorage(inputs)
    })

    return (
        <>
            <FormInput
                placeholder='Age'
                inputLeftElement={<MdPerson color={iconColor} />}
                type='number'
                {...register('age', { valueAsNumber: true })}
            />
            
            <FormInput
                placeholder='Annual Income'
                inputLeftElement={<MdAttachMoney color={iconColor} />}
                type='number'
                {...register('annualIncome', { valueAsNumber: true })}
            />

            <FormInput
                placeholder='Annual Spending'
                inputLeftElement={<MdAttachMoney color={iconColor} />}
                type='number'
                {...register('annualSpending', { valueAsNumber: true })}
            />

            <FormInput
                placeholder='Networth'
                inputLeftElement={<MdAttachMoney color={iconColor} />}
                type='number'
                {...register('networth', { valueAsNumber: true })}
            />
        </>
    )
}

function FinancialFactorsInputs() {
    const { register, setValue, watch } = useForm<Partial<PlanEngineInputs>>()

    useEffect(() => {
        loadLocalStorage(setValue)
    }, [])

    watch(inputs => {
        updateLocalStorage(inputs)
    })

    return (
        <>
            <FormInput
                placeholder='Safe Withdrawal Rate'
                inputLeftElement={<MdPercent color={iconColor} />}
                type='number'
                {...register('safeWithdrawalRate', { valueAsNumber: true })}
            />

            <FormInput
                placeholder='Inflation Rate'
                inputLeftElement={<MdPercent color={iconColor} />}
                type='number'
                {...register('inflationRate', { valueAsNumber: true })}
            />
        </>
    )
}

function AssetAllocationRateInputs() {
    const { register, setValue, watch } = useForm<Partial<PlanEngineInputs>>()

    useEffect(() => {
        loadLocalStorage(setValue)
    }, [])

    watch(inputs => {
        updateLocalStorage(inputs)
    })

    return (
        <>
            <FormInput
                placeholder='Stocks Allocation Rate'
                inputLeftElement={<MdPercent color={iconColor} />}
                type='number'
                {...register('stocksAllocationRate', { valueAsNumber: true })}
            />

            <FormInput
                placeholder='Bonds Allocation Rate'
                inputLeftElement={<MdPercent color={iconColor} />}
                type='number'
                {...register('bondsAllocationRate', { valueAsNumber: true })}
            />

            <FormInput
                placeholder='Cash Allocation Rate'
                inputLeftElement={<MdPercent color={iconColor} />}
                type='number'
                {...register('cashAllocationRate', { valueAsNumber: true })}
            />
        </>
    )
}

function AssetReturnRateInputs() {
    const { register, setValue, watch } = useForm<Partial<PlanEngineInputs>>()

    useEffect(() => {
        loadLocalStorage(setValue)
    }, [])

    watch(inputs => {
        updateLocalStorage(inputs)
    })

    return (
        <>
            <FormInput
                placeholder='Stocks Return Rate'
                inputLeftElement={<MdPercent color={iconColor} />}
                type='number'
                {...register('stocksReturnRate', { valueAsNumber: true })}
            />

            <FormInput
                placeholder='Bonds Return Rate'
                inputLeftElement={<MdPercent color={iconColor} />}
                type='number'
                {...register('bondsReturnRate', { valueAsNumber: true })}
            />

            <FormInput
                placeholder='Cash Return Rate'
                inputLeftElement={<MdPercent color={iconColor} />}
                type='number'
                {...register('cashReturnRate', { valueAsNumber: true })}
            />
        </>
    )
}

function AdvancedInputs() {
    const { register, setValue, watch } = useForm<Partial<PlanEngineInputs>>()

    useEffect(() => {
        loadLocalStorage(setValue)
    }, [])

    watch(inputs => {
        updateLocalStorage(inputs)
    })

    return (
        <>
            <FormInput
                placeholder='Income Growth Rate'
                inputLeftElement={<MdPercent color={iconColor} />}
                type='number'
                {...register('incomeGrowthRate', { valueAsNumber: true })}
            />

            <FormInput
                placeholder='Retirement Age'
                inputLeftElement={<MdPerson color={iconColor} />}
                type='number'
                {...register('retirementAge', { valueAsNumber: true })}
            />

            <FormInput
                placeholder='Maximum Age'
                inputLeftElement={<MdPerson color={iconColor} />}
                type='number'
                {...register('maximumAge', { valueAsNumber: true })}
            />
        </>
    )
}

interface PlanStepDialogProps {
    onCancel: () => void
    onClose: (planName: string, inputs: PlanEngineInputs) => void
}

export default function PlanStepDialog(props: PlanStepDialogProps) {
    const pages: JSX.Element[] = [
        <PlanNameInput onChange={planNameInputChangeHandler} />,
        <BasicInfoInputs />, 
        <FinancialFactorsInputs />, 
        <AssetAllocationRateInputs />,
        <AssetReturnRateInputs />,
        <AdvancedInputs />
    ]

    const totalSteps = pages.length

    const [planName, setPlanName] = useState('')
    const [step, setStep] = useState(1)

    function planNameInputChangeHandler(e: React.ChangeEvent<HTMLInputElement>): void {
        setPlanName(e.target.value)
    }

    useEffect(() => {
        localStorage.setItem(localStorageKey, JSON.stringify({
            age: 20,
            annualIncome: 70000,
            annualSpending: 30000,
            bondsAllocationRate: 0,
            bondsReturnRate: 0,
            cashAllocationRate: 0,
            cashReturnRate: 0,
            incomeGrowthRate: null,
            inflationRate: 0,
            maximumAge: null,
            networth: 0,
            retirementAge: null,
            safeWithdrawalRate: 0.04,
            stocksAllocationRate: 1,
            stocksReturnRate: 0.07,
        }))

        return () => {
            localStorage.removeItem(localStorageKey)
        }
    }, [])

    function updateStep(): void {
        if (step < totalSteps) {
            setStep(prevStep => prevStep + 1)
        } else {
            props.onClose(planName, JSON.parse(localStorage.getItem(localStorageKey)!) as PlanEngineInputs)
        }
    }

    function revertStep(): void {
        if (step > 1) {
            setStep(prevStep => prevStep - 1)
        }
    }

    return (
        <Modal isOpen={true} onClose={() => {}} isCentered={true}>
            <ModalOverlay />

            <ModalContent 
                width={{ base: '100%', md: '700px' }} 
                maxWidth='100%' 
                height={{ base: '100%', md: '500px' }} 
                overflow='clip'
                borderRadius={{ base: '0px', md: '6px' }}
            >
                <Flex padding='24px' alignItems='center'>
                    <Text
                        fontWeight='normal'
                        fontFamily='Manrope'
                        fontSize='2xl'
                        alignItems='center'
                        flexGrow={1}
                    >New Plan</Text>

                    <ModalCloseButton onClick={props.onCancel} position='static' />
                </Flex>

                <Flex flexGrow={1} flexDirection='column' padding='24px' paddingBottom='40px'>
                    <Flex gap='12px' flexDirection='column'>
                        {pages[step - 1]}
                    </Flex>

                    <Flex marginTop='auto' flexDirection='column' gap='56px'>
                        <Flex marginLeft={{ base: '0px', md: 'auto' }} gap='8px'>
                            <Button 
                                background='white' 
                                border='1px solid #e1e1dc' 
                                onClick={revertStep}
                                justifySelf={{ base: 'flex-start', md: 'flex-end' }}
                            >
                                {step === 1 ? 'Exit' : 'Back'}
                            </Button>

                            <Button 
                                background='buttonPrimary' 
                                color='white' 
                                onClick={updateStep} 
                                rightIcon={<MdArrowForward />}
                                marginLeft={{ base: 'auto', md: '0px' }}
                            >
                                Continue
                            </Button>
                        </Flex>

                        <StepBar step={step} totalSteps={totalSteps} />
                    </Flex>
                </Flex>
            </ModalContent>
        </Modal>
    )
}