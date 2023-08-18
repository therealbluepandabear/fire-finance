import { Flex, Text } from '@chakra-ui/react'

export interface SectionHeaderProps {
    title: string
    contentEnd?: JSX.Element[]
}

export default function SectionHeader(props: SectionHeaderProps) {
    return (
        <Flex
            padding='24px'
            width='100%'
            gap='16px'
            alignItems='baseline'
        >
            <Text fontWeight='bold' fontSize='18px'>{props.title}</Text>

            <Flex marginLeft='auto' height='100%' gap='12px'>
                {props.contentEnd && props.contentEnd.map(content => content)}
            </Flex>
        </Flex>
    )
}