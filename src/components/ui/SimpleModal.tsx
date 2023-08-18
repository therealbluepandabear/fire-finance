import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalCloseButton, ModalFooter, Flex, Button } from '@chakra-ui/react'
import { PropsWithChildren } from 'react'

interface SimpleModalProps extends PropsWithChildren {
    title: string
    onOKClick: () => void
    onClose: () => void
}

export default function SimpleModal(props: SimpleModalProps) {
    return (
        <Modal isOpen={true} onClose={props.onClose} isCentered={true}>
            <ModalOverlay />

            <ModalContent width={{ base: '90%', md: '' }}>
                <Flex alignItems='center'>
                    <ModalHeader
                        fontWeight='normal'
                        fontFamily='Manrope'
                        fontSize='2xl'
                        flexGrow={1}
                    >{props.title}</ModalHeader>

                    <ModalCloseButton
                        position='static'
                        marginEnd='16px'
                        onClick={props.onClose}
                    />
                </Flex>


                <ModalBody>
                    {props.children}
                </ModalBody>

                <ModalFooter>
                    <Flex gap='12px'>
                        <Button 
                            variant='ghost' 
                            height='36px' 
                            onClick={props.onClose}
                        >
                            Cancel
                        </Button>

                        <Button 
                            color='white'
                            background='buttonPrimary' 
                            height='36px' 
                            onClick={props.onOKClick}
                        >
                            OK
                        </Button>
                    </Flex>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}