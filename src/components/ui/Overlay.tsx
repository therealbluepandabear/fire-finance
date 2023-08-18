import { Flex, HTMLChakraProps } from '@chakra-ui/react'

export default function Overlay(props: HTMLChakraProps<'div'>) {
    return (
        <Flex
            position='fixed'
            top='0'
            left='0'
            width='100vw'
            height='100vh'
            background='black'
            opacity={0.48}
            {...props}
        />
    )
}