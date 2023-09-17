import { HTMLChakraProps, Flex } from '@chakra-ui/react'
import { PropsWithChildren } from 'react'
import SectionHeader, { SectionHeaderProps } from './SectionHeader'

type SectionProps = SectionHeaderProps & PropsWithChildren & HTMLChakraProps<'div'>

export default function Section({ title, contentEnd, children, ...props }: SectionProps) {
    return (
        <Flex
            background='white'
            flexDirection='column'
            border='1px solid #e1e1dc'
            borderRadius='2xl'
            {...props}
        >
            <SectionHeader
                title={title}
                contentEnd={contentEnd}
            />

            {children}
        </Flex>
    )
}