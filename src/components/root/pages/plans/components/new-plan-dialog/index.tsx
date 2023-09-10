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
import StepBar from './components/StepBar'
import { UseFormRegister, UseFormRegisterReturn, UseFormSetValue, useForm } from 'react-hook-form'
import FormInput from 'components/ui/FormInput'
import AdvancedInputs from './components/AdvancedInputs'
import AssetAllocationRateInputs from './components/AssetAllocationRateInputs'
import AssetReturnRateInputs from './components/AssetReturnRateInputs'
import BasicInfoInputs from './components/BasicInfoInputs'
import FinancialFactorsInputs from './components/FinancialFactorsInputs'
import { formattedInputsKey, rawInputsKey } from './utils'

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

interface NewPlanDialogProps {
    onCancel: () => void
    onClose: (planName: string, inputs: PlanEngineInputs) => void
}

export default function NewPlanDialog(props: NewPlanDialogProps) {
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