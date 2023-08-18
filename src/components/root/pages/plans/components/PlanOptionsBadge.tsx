import { useDisclosure, Popover, PopoverTrigger, IconButton, PopoverContent, PopoverBody, FocusLock, Flex, Portal } from '@chakra-ui/react'
import { MdMoreVert, MdDescription, MdEdit, MdContentCopy, MdDelete } from 'react-icons/md'
import PlanPopoverButton from './PlanPopoverButton'
import Overlay from '../../../../ui/Overlay'

function Options(props: PlanOptionsBadgeProps & { onClose: () => void }) {
    return (
        <>
            <PlanPopoverButton
                icon={<MdDescription />}
                onClick={() => {
                    props.onEditDescription()
                    props.onClose()
                }}
                text='Edit Description'
            />

            <PlanPopoverButton
                icon={<MdEdit />}
                onClick={() => {
                    props.onRename()
                    props.onClose()
                }}
                text='Rename'
            />

            <PlanPopoverButton
                icon={<MdContentCopy />}
                onClick={() => {
                    props.onDuplicate()
                    props.onClose()
                }}
                text='Duplicate'
            >Duplicate</PlanPopoverButton>

            <PlanPopoverButton
                icon={<MdDelete />}
                onClick={() => {
                    props.onDelete()
                    props.onClose()
                }}
                text='Delete'
            >Delete</PlanPopoverButton>
        </>
    )
}

interface PlanOptionsBadgeProps {
    onEditDescription: () => void
    onRename: () => void
    onDuplicate: () => void
    onDelete: () => void
}

export default function PlanOptionsBadge(props: PlanOptionsBadgeProps) {
    const { onOpen, onClose, isOpen } = useDisclosure()

    return (
        <>
            <Portal>
                <Overlay
                    display={{ base: isOpen ? 'block' : 'none', md: 'none' }}
                    onClick={() => onClose()}
                />

                <Flex 
                    transform={isOpen ? 'translateY(0%)' : 'translateY(100%)'}
                    transition='transform 0.26s ease-out'
                    display={{ base: 'block', md: 'none' }}
                    position='fixed'
                    width='100vh'
                    left='0'
                    bottom='0'
                    marginTop='auto' 
                    background='white'
                >
                    <Flex flexDirection='column'>
                        <Options {...props} onClose={onClose} />
                    </Flex>
                </Flex>
            </Portal>

            <Popover
                variant='responsive'
                placement='left-start'
                isOpen={isOpen}
                onOpen={onOpen}
                onClose={onClose}
            >
                <PopoverTrigger>
                    <IconButton
                        icon={<MdMoreVert size={20} />}
                        aria-label='Options'
                        width='30px'
                        height='30px'
                        minWidth='0px'
                        minHeight='0px'
                        borderRadius='999px'
                        onClick={(e) => e.stopPropagation()}
                    />
                </PopoverTrigger>
                <PopoverContent borderRadius='lg' overflow='clip' display={{ base: 'none', md: 'block' }}>
                    <PopoverBody padding='0px'>
                        <FocusLock persistentFocus={false}>
                            <Flex flexDirection='column' width='200px'>
                                <Options {...props} onClose={onClose} />
                            </Flex>
                        </FocusLock>
                    </PopoverBody>
                </PopoverContent>
            </Popover>
        </>
    )
}