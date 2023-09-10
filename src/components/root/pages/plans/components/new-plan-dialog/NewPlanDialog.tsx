import {
    Button,
    Flex,
    Input,
    Modal,
    ModalCloseButton,
    ModalContent,
    ModalOverlay,
    Select,
    Text} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { MdArrowForward, MdAttachMoney, MdPercent, MdPerson } from 'react-icons/md'
import { PlanEngineInputs } from '../../../../../../models/retirement-calculator'
import StepBar from './StepBar'
import { UseFormRegister, UseFormRegisterReturn, UseFormSetValue, useForm } from 'react-hook-form'
import FormInput from 'components/ui/FormInput'

const iconColor = 'lightgray'

const rawInputsKey = 'new_plan_inputs_raw'
const formattedInputsKey = 'new_plan_inputs_formatted'

function updateLocalStorage(key: string, inputs: Partial<PlanEngineInputs>): void {
    let prevInputs: Partial<PlanEngineInputs> | null = null

    if (localStorage.getItem(key)) {
        prevInputs = JSON.parse(localStorage.getItem(key)!) as Partial<PlanEngineInputs>
    }

    localStorage.setItem(key, JSON.stringify({ ...prevInputs, ...inputs }))
}

function updateFormattedInputs(inputs: Partial<PlanEngineInputs>) {
    updateLocalStorage(formattedInputsKey, inputs)
}

function updateRawInputs(inputs: Partial<PlanEngineInputs>): void {
    updateLocalStorage(rawInputsKey, inputs)
}

function loadLocalStorage(reset: UseFormSetValue<Partial<PlanEngineInputs>>): void {
    if (localStorage.getItem(rawInputsKey)) {
        const item = JSON.parse(localStorage.getItem(rawInputsKey)!) as Partial<PlanEngineInputs>

        for (const key in item) {
            const asKey = key as keyof Partial<PlanEngineInputs>

            reset(asKey, item[asKey])
        }
    }
}

function shouldShowDefaultValue(key: keyof PlanEngineInputs): boolean {
    if (localStorage.getItem(rawInputsKey)) {
        return (JSON.parse(localStorage.getItem(rawInputsKey)!) as Partial<PlanEngineInputs>)[key] === undefined
    }
    return true
}

function globalOnInput(e: React.FormEvent<HTMLInputElement>, percentage: boolean = false): void {
    let newValue = parseInt(e.currentTarget.value)

    if (percentage) {
        newValue /= 100
    }

    updateFormattedInputs({ [e.currentTarget.name]: newValue })
}

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

interface LocalInputProps {
    placeholder: string
    icon: JSX.Element
    register: UseFormRegisterReturn
}

function LocalInput(props: LocalInputProps) {
    return (
        <FormInput
            placeholder={props.placeholder}
            inputLeftElement={props.icon}
            type='number'
            onInput={globalOnInput}
            defaultValue={shouldShowDefaultValue(props.register.name as keyof PlanEngineInputs) ? defaultTextualInput[props.register.name as keyof PlanEngineInputs]?.toString() : undefined}
            {...props.register}
        />
    )
}

// IMPORTANT: Percentages are formatted differently as this is a textual input :)
const defaultTextualInput: PlanEngineInputs = {
    age: 20,
    annualIncome: 70_000,
    annualSpending: 30_000,
    networth: 0,
    withdrawalStrategy: { type: 'DEFAULT', safeWithdrawalRate: 0.04 },
    inflationRate: 0,
    stocksAllocationRate: 100,
    bondsAllocationRate: 0,
    cashAllocationRate: 0,
    stocksReturnRate: 7,
    bondsReturnRate: 0,
    cashReturnRate: 0,
    maximumAge: 100,
    retirementAge: 70,
    incomeGrowthRate: 0
}

function BasicInfoInputs() {
    const { register, setValue, watch } = useForm<Partial<PlanEngineInputs>>()

    useEffect(() => {
        loadLocalStorage(setValue)
    }, [])

    watch(inputs => {
        updateRawInputs(inputs as Partial<PlanEngineInputs>)
    })

    return (
        <>
            <LocalInput
                placeholder='Age'
                icon={<MdPerson color={iconColor} />}
                register={register('age')}
            />
            
            <LocalInput
                placeholder='Annual Income'
                icon={<MdAttachMoney color={iconColor} />}
                register={register('annualIncome')}
            />

            <LocalInput
                placeholder='Annual Spending'
                icon={<MdAttachMoney color={iconColor} />}
                register={register('annualSpending')}
            />

            <LocalInput
                placeholder='Networth'
                icon={<MdAttachMoney color={iconColor} />}
                register={register('networth')}
            />
        </>
    )
}

function FinancialFactorsInputs() {
    const { register, setValue, watch, unregister } = useForm<Partial<PlanEngineInputs>>()

    const withdrawalStrategyType = watch('withdrawalStrategy.type')

    useEffect(() => {
        loadLocalStorage(setValue)
    }, [])

    watch(inputs => {
        updateRawInputs(inputs as Partial<PlanEngineInputs>)
    })

    function selectChangeHandler(): void {
        // not the cleanest of code, but will do for now
        unregister('withdrawalStrategy.amount')
        unregister('withdrawalStrategy.safeWithdrawalRate')
    }

    return (
        <>
            <Select {...register('withdrawalStrategy.type', { onChange: selectChangeHandler })} >
                <option value='DEFAULT'>Default</option>
                <option value='FIXED_PERCENTAGE'>Fixed Percentage</option>
                <option value='FIXED_DOLLAR'>Fixed Dollar</option>
            </Select>

            {withdrawalStrategyType === 'FIXED_DOLLAR' && (
                <LocalInput 
                    placeholder='Amount'
                    icon={<MdAttachMoney color={iconColor} />}
                    register={register('withdrawalStrategy.amount')}
                />
            )}

            {withdrawalStrategyType === 'FIXED_PERCENTAGE' && (
                <LocalInput
                    placeholder='Amount'
                    icon={<MdPercent color={iconColor} />}
                    register={register('withdrawalStrategy.amount')}
                />
            )}

            {withdrawalStrategyType === 'DEFAULT' && (
                <LocalInput
                    placeholder='Safe Withdrawal Rate'
                    icon={<MdPercent color={iconColor} />}
                    register={register('withdrawalStrategy.safeWithdrawalRate')}
                />
            )}

            <LocalInput
                placeholder='Inflation Rate'
                icon={<MdPercent color={iconColor} />}
                register={register('inflationRate')}
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
        updateRawInputs(inputs as Partial<PlanEngineInputs>)
    })

    return (
        <>
            <LocalInput
                placeholder='Stocks Allocation Rate'
                icon={<MdPercent color={iconColor} />}
                register={register('stocksAllocationRate')}
            />

            <LocalInput
                placeholder='Bonds Allocation Rate'
                icon={<MdPercent color={iconColor} />}
                register={register('bondsAllocationRate')}
            />

            <LocalInput
                placeholder='Cash Allocation Rate'
                icon={<MdPercent color={iconColor} />}
                register={register('cashAllocationRate')}
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
        updateRawInputs(inputs as Partial<PlanEngineInputs>)
    })

    return (
        <>
            <LocalInput
                placeholder='Stocks Return Rate'
                icon={<MdPercent color={iconColor} />}
                register={register('stocksReturnRate')}
            />

            <LocalInput
                placeholder='Bonds Return Rate'
                icon={<MdPercent color={iconColor} />}
                register={register('bondsReturnRate')}
            />

            <LocalInput
                placeholder='Cash Return Rate'
                icon={<MdPercent color={iconColor} />}
                register={register('cashReturnRate')}
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
        updateRawInputs(inputs as Partial<PlanEngineInputs>)
    })

    return (
        <>
            <LocalInput
                placeholder='Income Growth Rate'
                icon={<MdPercent color={iconColor} />}
                register={register('incomeGrowthRate')}
            />

            <LocalInput
                placeholder='Retirement Age'
                icon={<MdPerson color={iconColor} />}
                register={register('retirementAge')}
            />

            <LocalInput
                placeholder='Maximum Age'
                icon={<MdPerson color={iconColor} />}
                register={register('maximumAge')}
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
        <AdvancedInputs />,
    ]

    const totalSteps = pages.length

    const [planName, setPlanName] = useState('')
    const [step, setStep] = useState(1)

    function planNameInputChangeHandler(e: React.ChangeEvent<HTMLInputElement>): void {
        setPlanName(e.target.value)
    }

    useEffect(() => {
        return () => {
            localStorage.removeItem(rawInputsKey)
            localStorage.removeItem(formattedInputsKey)
        }
    }, [])

    function updateStep(): void {
        if (step < totalSteps) {
            setStep(prevStep => prevStep + 1)
        } else {
            props.onClose(planName, JSON.parse(localStorage.getItem(rawInputsKey)!) as PlanEngineInputs)
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