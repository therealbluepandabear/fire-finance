import { Flex, IconButton, Text } from '@chakra-ui/react'
import { useState } from 'react'
import { MdDeleteOutline } from 'react-icons/md'
import { formatCurrency } from '../../../../utils'
import { Goal } from '../../../../store/plans-slice'

interface GoalListItemProps {
    goal: Goal
}

export default function GoalListItem(props: GoalListItemProps) {
    const [showDeleteIcon, setShowDeleteIcon] = useState(false)

    function mouseEnterHandler(): void {
        setShowDeleteIcon(true)
    }

    function mouseLeaveHandler(): void {
        setShowDeleteIcon(false)
    }

    return (
        <Flex
            paddingLeft='24px'
            gap='12px'
            onMouseEnter={mouseEnterHandler}
            onMouseLeave={mouseLeaveHandler}
            alignItems='center'
            _hover={{ shadow: 'md' }}
            _active={{ background: 'gray.50' }}
            padding='16px'
            paddingRight='24px'
        >
            <Flex
                background='buttonPrimary'
                color='white'
                padding='12px'
                borderRadius='999px'
            >
                {props.goal.icon}
            </Flex>

            <Flex flexDirection='column'>
                <Text fontWeight='bold'>{props.goal.label}</Text>
                <Text>{formatCurrency(props.goal.targetNetworth, false)}</Text>
            </Flex>

            <Flex marginLeft='auto' display={showDeleteIcon ? 'flex' : 'none'} color='red'>
                <IconButton aria-label='Delete' borderRadius='999px' icon={<MdDeleteOutline size={22} />} />
            </Flex>
        </Flex>
    )
}