import { useDisclosure, Popover, PopoverTrigger, IconButton, PopoverContent, PopoverBody, FocusLock } from '@chakra-ui/react'
import { MdDescription } from 'react-icons/md'
import FScrollableBox from '../../../../ui/ScrollableBox'

interface PlanDescriptionBadgeProps {
    description: string
}

export default function PlanDescriptionBadge(props: PlanDescriptionBadgeProps) {
    const { onOpen, onClose, isOpen } = useDisclosure()

    return (
        <Popover
            variant='responsive'
            placement='left-start'
            trigger='hover'
            isOpen={isOpen}
            onOpen={onOpen}
            onClose={onClose}
        >
            <PopoverTrigger>
                <IconButton
                    icon={<MdDescription size={20} />}
                    aria-label='Description'
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
                        <FScrollableBox
                            padding='8px'
                            maxWidth='200px'
                            maxHeight='200px'
                            wordBreak='break-word'
                            overflowY='scroll'
                        >
                            {props.description}
                        </FScrollableBox>
                    </FocusLock>
                </PopoverBody>
            </PopoverContent>
        </Popover>
    )
}