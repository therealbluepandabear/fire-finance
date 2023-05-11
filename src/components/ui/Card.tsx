import { Flex, HTMLChakraProps, useColorModeValue } from '@chakra-ui/react'
import { PropsWithChildren } from 'react'

export default function Card({ children, ...props }: PropsWithChildren<HTMLChakraProps<'div'>>) {
    const color = useColorModeValue('white', '#1f2836')

    return (
        <Flex
            {...props}
            flexDirection="column"
            shadow="md"
            borderRadius="md"
            background={color}
        >
            {children}
        </Flex>
    )
}