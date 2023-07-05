import { 
    Box, 
    Button, 
    Flex, 
    FormControl, 
    FormLabel, 
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
    Tooltip,
    Text,
    useDisclosure
} from '@chakra-ui/react'
import { AnimatePresence, motion } from 'framer-motion'
import { PropsWithChildren, useState } from 'react'
import { MdArrowForwardIos, MdArrowRight, MdAttachMoney, MdFace, MdHelp } from 'react-icons/md'

interface StepBarProps {
    step: number
    totalSteps: number
}

function StepBar(props: StepBarProps): JSX.Element {
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

interface FormInputProps {
    inputLeftElement: JSX.Element
    placeholder: string
}

function FormInput(props: FormInputProps): JSX.Element {
    return (
        <FormControl variant='floating'>
            <InputGroup>
                <InputLeftElement>
                    {props.inputLeftElement}
                </InputLeftElement>

                <Input placeholder=' ' tabIndex={-1} />

                <FormLabel
                    style={{ marginLeft: '32px' }}
                    color='gray'
                >{props.placeholder}</FormLabel>

                <Tooltip textAlign='center' fontSize='12px'>
                    <InputRightElement>
                        <MdHelp color='lightgray' />
                    </InputRightElement>
                </Tooltip>
            </InputGroup>
        </FormControl>
    )
}

function FormRoot(props: PropsWithChildren): JSX.Element {
    return (
        <Flex marginTop='16px' gap='16px' flexDirection='column'>
            {props.children}
        </Flex>
    )
}

const iconColor = 'lightgray'

interface StepPageZeroProps {
    onSelectIndex: (index: number) => void
}

function StepPageZero(props: StepPageZeroProps): JSX.Element {

    const [hoverIndex, setHoverIndex] = useState(0)

    return (
        <Flex flexDirection='column' gap='12px' marginTop='16px' marginBottom='16px'>
            <Button 
                variant='outline'
                height='65px'
                onClick={() => props.onSelectIndex(0)}
                onMouseOver={() => setHoverIndex(0)}
                _hover={{ background: 'gray.100' }}
                _active={{ }}
                color='gray.700'
            >
                Simple Walkthrough
            </Button>

            <Button
                variant='outline'
                height='65px'
                onClick={() => props.onSelectIndex(0)}
                onMouseOver={() => setHoverIndex(1)}
                _hover={{ background: 'gray.100' }}
                _active={{ }}
                color='gray.700'
                position='relative'
            >
                Full Walkthrough
            </Button>
        </Flex>
    )
}

function StepPageOne(): JSX.Element {
    return (
        <FormRoot>
            <FormInput 
                placeholder='Age' 
                inputLeftElement={<MdFace color={iconColor} />} 
            />

            <FormInput 
                placeholder='Annual Income' 
                inputLeftElement={<MdAttachMoney color={iconColor} />}
            />
        </FormRoot>
    )
}

function StepPageTwo(): JSX.Element {
    return (
        <FormRoot>
            <FormInput 
                placeholder='Annual Spending' 
                inputLeftElement={<MdAttachMoney color={iconColor} />} 
            />

            <FormInput 
                placeholder='Networth' 
                inputLeftElement={<MdAttachMoney color={iconColor} />} 
            />
        </FormRoot>
    )
}

function StepPageThree(): JSX.Element {
    return (
        <FormRoot>
            <FormInput
                placeholder='Stocks Return Rate'
                inputLeftElement={<MdAttachMoney color={iconColor} />}
            />

            <FormInput
                placeholder='Bonds Return Rate'
                inputLeftElement={<MdAttachMoney color={iconColor} />}
            />

            <FormInput
                placeholder='Gold Return Rate'
                inputLeftElement={<MdAttachMoney color={iconColor} />}
            />
        </FormRoot>
    )
}

function StepPageFour(): JSX.Element {
    return (
        <FormRoot>
            <FormInput
                placeholder='Stocks Allocation Rate'
                inputLeftElement={<MdAttachMoney color={iconColor} />}
            />

            <FormInput
                placeholder='Bonds Allocation Rate'
                inputLeftElement={<MdAttachMoney color={iconColor} />}
            />

            <FormInput
                placeholder='Gold Allocation Rate'
                inputLeftElement={<MdAttachMoney color={iconColor} />}
            />
        </FormRoot>
    )
}

interface PlanStepDialogProps {
    onClose: () => void
}

export default function PlanStepDialog(props: PlanStepDialogProps): JSX.Element {
    const totalSteps = 4

    const [step, setStep] = useState(1)

    function updateStep(): void {
        setStep(prevStep => prevStep + 1)
    }

    function revertStep(): void {
        setStep(prevStep => prevStep - 1)
    }

    function nextClickHandler(): void {
        updateStep()
    }

    return (
        <Modal isOpen={true} onClose={props.onClose} isCentered={true}>
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
                    {step === 1 && <StepPageZero onSelectIndex={(index) => updateStep()} />}
                    {step === 2 && <StepPageTwo />}
                    {step === 3 && <StepPageThree />}
                    {step === 4 && <StepPageFour />}
                </ModalBody>

                <ModalCloseButton marginTop='8px' onClick={props.onClose} />

                {step > 1 && (
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
                                            props.onClose()
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
                                        props.onClose()
                                    }
                                }}
                            >
                                {step === totalSteps ? 'Done' : 'Next'}
                            </Button>
                        </Flex>
                    </ModalFooter>
                )}
            </ModalContent>
        </Modal>
    )
}