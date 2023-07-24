import { Flex, Text } from '@chakra-ui/react'
import Card from '../../../../ui/Card'

interface SummaryCardProps {
    label: string
    content: string
    icon: JSX.Element
}

export default function SummaryCard(props: SummaryCardProps) {
    return (
        <Card
            padding='22px'
            alignItems='center'
        >
            <Flex flexDirection='column'>
                <Flex gap='6px' alignItems='center'>
                    {props.icon}
                    <Text fontSize='sm'>{props.label}</Text>
                </Flex>

                <Text fontSize='4xl' fontFamily='Manrope'>{props.content}</Text>
            </Flex>
        </Card>
    )
}