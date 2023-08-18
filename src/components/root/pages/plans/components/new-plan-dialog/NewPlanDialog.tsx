import {
    Button,
    Flex,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useBreakpointValue,
    Text,
    Portal
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
        { key: 'safeWithdrawalRate', inputType: 'percentage', defaultValue: '4', placeholder: 'Safe Withdrawal Rate', icon: <MdPercent color={iconColor} /> },
        { key: 'inflationRate', inputType: 'percentage', defaultValue: '0', placeholder: 'Inflation Rate', icon: <MdPercent color={iconColor} /> }
    ],

    [
        { key: 'stocksAllocationRate', inputType: 'percentage', defaultValue: '100', placeholder: 'Stocks Allocation Rate', icon: <MdPercent color={iconColor} /> },
        { key: 'bondsAllocationRate', inputType: 'percentage', defaultValue: '0', placeholder: 'Bonds Allocation Rate', icon: <MdPercent color={iconColor} /> },
        { key: 'cashAllocationRate', inputType: 'percentage', defaultValue: '0', placeholder: 'Cash Allocation Rate', icon: <MdPercent color={iconColor} /> }
    ],
    
    [
        { key: 'stocksReturnRate', inputType: 'percentage', defaultValue: '7',placeholder: 'Stocks Return Rate', icon: <MdPercent color={iconColor} /> },
        { key: 'bondsReturnRate', inputType: 'percentage', defaultValue: '0', placeholder: 'Bonds Return Rate', icon: <MdPercent color={iconColor} /> },
        { key: 'cashReturnRate', inputType: 'percentage', defaultValue: '0', placeholder: 'Cash Return Rate', icon: <MdPercent color={iconColor} /> }
    ]
]

interface PlanStepDialogProps {
    onCancel: () => void
    onClose: (planName: string, inputs: Partial<PlanEngineInputs>) => void
}

export default function PlanStepDialog(props: PlanStepDialogProps) {
    const totalSteps = stepInputModel.length + 1

    const [step, setStep] = useState(1)
    const [inputs, setInputs] = useState<Partial<PlanEngineInputs>>()

    const [planName, setPlanName] = useState('')

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
        if (step === totalSteps) {
            props.onClose(planName, inputs ?? {})
        } else {
            props.onCancel()
        }
    }

    function planNameInputChangeHandler(e: React.ChangeEvent<HTMLInputElement>): void {
        setPlanName(e.currentTarget.value)
    }

    return (
        <Modal isOpen={true} onClose={() => {}} isCentered={true}>
            <ModalOverlay />

            <ModalContent width={{ base: '90%', md: '' }}>
                <Flex alignItems='center'>
                    <ModalHeader
                        fontWeight='normal'
                        fontFamily='Manrope'
                        fontSize='2xl'
                        alignItems='center'
                        flexGrow={1}
                    >New Plan</ModalHeader>


                    <ModalCloseButton 
                        position='static' 
                        marginEnd='16px' 
                        onClick={closeHandler}
                    />
                </Flex>

                <StepBar step={step} totalSteps={totalSteps} />

                <input type='text' style={{ display: 'none' }} />

                <ModalBody>
                    {step === 1 && (
                        <Input
                            fontFamily='Manrope'
                            marginTop='16px'
                            size='lg'
                            height='65px'
                            fontSize='2xl'
                            letterSpacing='0.3px'
                            placeholder='Choose a name'
                            variant='flushed'
                            value={planName}
                            onChange={planNameInputChangeHandler}
                        />
                    )}

                    {step > 1 && stepInputModel.map((inputs, index) => (
                        step === (index + 2) && <StepPage inputModels={inputs} onInputsChange={inputsChangeHandler} />
                    ))}
                </ModalBody>
                        
                <ModalFooter>
                    <Flex gap='12px'>
                        {step > 0 && (
                            <Button onClick={() => (step > 1) ? revertStep() : closeHandler()}>
                                {step === 1 ? 'Cancel' : 'Back'}
                            </Button>
                        )}

                        <Button
                            color='white'
                            background='buttonPrimary'
                            onClick={() => (step < totalSteps) ? nextClickHandler() : closeHandler()}                        >
                            {step === totalSteps ? 'Done' : 'Next'}
                        </Button>
                    </Flex>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}