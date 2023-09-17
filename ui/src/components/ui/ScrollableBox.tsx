import { Flex, HTMLChakraProps } from '@chakra-ui/react'
import { PropsWithChildren } from 'react'

export default function ScrollableBox({ children, ...props }: PropsWithChildren<HTMLChakraProps<'div'>>) {
    return (
        <Flex 
            {...props}
        >
            {children}
        </Flex>
    )
}