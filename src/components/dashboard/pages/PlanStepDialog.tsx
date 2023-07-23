import { 
    Box, 
    Button, 
    Flex, 
    FormControl, 
    FormLabel, 
    HTMLChakraProps, 
    Input, 
    InputGroup, 
    InputLeftElement, 
    InputRightElement, 
    Modal, 
    ModalBody, 
    ModalCloseButton,
    ModalContent, 
    ModalFooter, 
    ModalHeader, 
    ModalOverlay,
    Tooltip
} from '@chakra-ui/react'
import FormInput from '../../ui/FormInput'
import { useState } from 'react'
import { MdAttachMoney, MdFace, MdHelp, MdPercent } from 'react-icons/md'
import { RetirementCalculatorInputs } from '../../../models/retirement-calculator'
import { Controller, RegisterOptions, useForm } from 'react-hook-form'

interface StepBarProps {
    step: number
    totalSteps: number
}

function StepBar(props: StepBarProps) {
    return (
        <Flex
            width='100%'
            height='4px'
            background='pastelPrimary'
        >
            <Box 
                width={`${(props.step / props.totalSteps) * 100}%`} 
                background='buttonPrimary' 
                transition='width 0.2s ease-in-out'
            />
        </Flex>
    )
}

const iconColor = 'lightgray'

interface InputModel {
    key: keyof RetirementCalculatorInputs
    placeholder: string
    defaultValue: string
    icon: JSX.Element
}

interface StepPageProps {
    inputs: InputModel[]
    onInputsChange: (data: Partial<RetirementCalculatorInputs>) => void 
}

function StepPage(props: StepPageProps) {
    
    const { control, watch } = useForm<Partial<RetirementCalculatorInputs>>({ 
        defaultValues: Object.fromEntries(
            props.inputs.map((inputModel) => [inputModel.key, inputModel.defaultValue])
        )
    })

    watch(inputs => {
        props.onInputsChange(inputs)

        console.log(inputs)
    })

    return (
        <Flex marginTop='16px' gap='16px' flexDirection='column'>
            {props.inputs.map(inputModel => (
                <Controller
                    key={inputModel.key}
                    name={inputModel.key}
                    control={control}
                    render={({ field: { onChange, onBlur, value }  }) => (
                        <FormInput
                            placeholder={inputModel.placeholder}
                            inputLeftElement={inputModel.icon}
                            onChange={(e) => onChange(parseInt(e.target.value))}
                            onBlur={onBlur}
                            value={value}
                        />
                    )}
                />
            ))}
        </Flex>
    )
}

const stepInputModel: InputModel[][] = [
    [
        { key: 'age', defaultValue: '20', placeholder: 'Age', icon: <MdFace color={iconColor} /> },
        { key: 'annualIncome', defaultValue: '70000', placeholder: 'Annual Income', icon: <MdAttachMoney color={iconColor} /> },
        { key: 'annualSpending', defaultValue: '30000', placeholder: 'Annual Spending', icon: <MdAttachMoney color={iconColor} /> },
        { key: 'networth', defaultValue: '0', placeholder: 'Networth', icon: <MdAttachMoney color={iconColor} /> }
    ],

    [
        { key: 'safeWithdrawalRate', defaultValue: '4', placeholder: 'Safe Withdrawal Rate', icon: <MdPercent color={iconColor} /> },
        { key: 'inflationRate', defaultValue: '0', placeholder: 'Inflation Rate', icon: <MdPercent color={iconColor} /> }
    ],

    [
        { key: 'stocksAllocationRate', defaultValue: '100', placeholder: 'Stocks Allocation Rate', icon: <MdPercent color={iconColor} /> },
        { key: 'bondsAllocationRate', defaultValue: '0', placeholder: 'Bonds Allocation Rate', icon: <MdPercent color={iconColor} /> }, 
        { key: 'cashAllocationRate', defaultValue: '0', placeholder: 'Cash Allocation Rate', icon: <MdPercent color={iconColor} /> }
    ],

    [
        { key: 'stocksReturnRate', defaultValue: '7', placeholder: 'Stocks Return Rate', icon: <MdPercent color={iconColor} /> },
        { key: 'bondsReturnRate', defaultValue: '0', placeholder: 'Bonds Return Rate', icon: <MdPercent color={iconColor} /> },
        { key: 'cashReturnRate', defaultValue: '0', placeholder: 'Cash Return Rate', icon: <MdPercent color={iconColor} /> }
    ]
]

interface PlanStepDialogProps {
    onClose: (inputs: Partial<RetirementCalculatorInputs>) => void
}

export default function PlanStepDialog(props: PlanStepDialogProps) {

    const totalSteps = stepInputModel.length

    const [step, setStep] = useState(1)
    const [inputs, setInputs] = useState<Partial<RetirementCalculatorInputs>>()

    function updateStep(): void {
        setStep(prevStep => prevStep + 1)
    }

    function revertStep(): void {
        setStep(prevStep => prevStep - 1)
    }

    function nextClickHandler(): void {
        updateStep()
    }

    function inputsChangeHandler(data: Partial<RetirementCalculatorInputs>): void {
        setInputs(prevInputs => ({ ...prevInputs, ...data }))
    }

    function closeHandler(): void {
        props.onClose(inputs ?? {})
    }

    return (
        <Modal isOpen={true} onClose={closeHandler} isCentered={true}>
            <ModalOverlay />

            <ModalContent overflow='hidden'>
                <ModalHeader 
                    fontWeight='normal' 
                    fontFamily='Manrope' 
                    fontSize='2xl'
                    alignItems='center'
                >New Plan</ModalHeader>

                <StepBar step={step} totalSteps={totalSteps} />

                <input type='text' style={{ display: 'none' }} />

                <ModalBody>
                    {stepInputModel.map((inputs, index) => (
                        step === (index + 1) && <StepPage inputs={inputs} onInputsChange={inputsChangeHandler} />
                    ))}
                </ModalBody>

                <ModalCloseButton marginTop='8px' onClick={closeHandler} />

                <ModalFooter>
                    <Flex gap='12px'>
                        {step > 0 && (
                            <Button 
                                variant='ghost' 
                                height='36px' 
                                onClick={() => {
                                    if (step > 1) {
                                        revertStep()
                                    } else {
                                        closeHandler()
                                    }
                                }}
                            >
                                {step === 1 ? 'Cancel' : 'Back'}
                            </Button>
                        )}

                        <Button 
                            color='white' 
                            background='buttonPrimary' 
                            height='36px' 
                            onClick={() => {
                                if (step < totalSteps) {
                                    nextClickHandler()
                                } else {
                                    closeHandler()
                                }
                            }}
                        >
                            {step === totalSteps ? 'Done' : 'Next'}
                        </Button>
                    </Flex>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}