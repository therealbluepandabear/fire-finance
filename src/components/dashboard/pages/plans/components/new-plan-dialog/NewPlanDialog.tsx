import {
    Button,
    Flex,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay
} from '@chakra-ui/react'
import { useState } from 'react'
import { MdAttachMoney, MdFace, MdPercent } from 'react-icons/md'
import { PlanEngineInputs } from '../../../../../../models/retirement-calculator'
import StepBar from './StepBar'
import StepPage, { InputModel } from './StepPage'

const iconColor = 'lightgray'

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
    onClose: (inputs: Partial<PlanEngineInputs>) => void
}

export default function PlanStepDialog(props: PlanStepDialogProps) {
    const totalSteps = stepInputModel.length

    const [step, setStep] = useState(1)
    const [inputs, setInputs] = useState<Partial<PlanEngineInputs>>()

    function updateStep(): void {
        setStep(prevStep => prevStep + 1)
    }

    function revertStep(): void {
        setStep(prevStep => prevStep - 1)
    }

    function nextClickHandler(): void {
        updateStep()
    }

    function inputsChangeHandler(data: Partial<PlanEngineInputs>): void {
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