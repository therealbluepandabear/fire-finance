import { Flex, HTMLChakraProps, useColorModeValue } from '@chakra-ui/react'
import { PropsWithChildren } from 'react'

export default function Card({ children, ...props }: PropsWithChildren<HTMLChakraProps<'div'>>) {
    return (
        <Flex
            border='1px solid #e1e1dc'
            _hover={{ shadow: 'md' }}
            _active={{ background: 'gray.50', shadow: 'none' }}
            borderRadius='lg'
            {...props}
        >
            {children}
        </Flex>
    )
}