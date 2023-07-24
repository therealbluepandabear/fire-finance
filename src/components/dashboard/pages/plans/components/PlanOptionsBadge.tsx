import { useDisclosure, Popover, PopoverTrigger, IconButton, PopoverContent, PopoverBody, FocusLock, Flex } from '@chakra-ui/react'
import { MdMoreVert, MdDescription, MdEdit, MdContentCopy, MdDelete } from 'react-icons/md'
import PlanPopoverButton from './PlanPopoverButton'

interface PlanOptionsBadgeProps {
    onEditDescription: () => void
    onRename: () => void
    onDuplicate: () => void
    onDelete: () => void
}

export default function PlanOptionsBadge(props: PlanOptionsBadgeProps) {
    const { onOpen, onClose, isOpen } = useDisclosure()

    return (
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
                />
            </PopoverTrigger>
            <PopoverContent>
                <PopoverBody padding='0px'>
                    <FocusLock persistentFocus={false}>
                        <Flex flexDirection='column' width='200px'>
                            <PlanPopoverButton
                                icon={<MdDescription />}
                                onClick={props.onEditDescription}
                                text='Edit Description'
                            />

                            <PlanPopoverButton
                                icon={<MdEdit />}
                                onClick={props.onRename}
                                text='Rename'
                            />

                            <PlanPopoverButton
                                icon={<MdContentCopy />}
                                onClick={() => {
                                    props.onDuplicate()
                                    onClose()
                                }}
                                text='Duplicate'
                            >Duplicate</PlanPopoverButton>

                            <PlanPopoverButton
                                icon={<MdDelete />}
                                onClick={() => {
                                    props.onDelete()
                                    onClose()
                                }}
                                text='Delete'
                            >Delete</PlanPopoverButton>
                        </Flex>
                    </FocusLock>
                </PopoverBody>
            </PopoverContent>
        </Popover>
    )
}