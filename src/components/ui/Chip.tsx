import { Button, HTMLChakraProps } from '@chakra-ui/react'
import { PropsWithChildren } from 'react'


export default function Chip({ children, ...props }: PropsWithChildren<HTMLChakraProps<'button'>>) {
    return (
        <Button
            _hover={{ filter: 'brightness(108%)' }}
            _active={{ filter: 'brightness(92%)' }}
            height='100%'
            borderRadius='0'
            fontWeight='normal'
            {...props}
        >
            {children}
        </Button>
    )
}