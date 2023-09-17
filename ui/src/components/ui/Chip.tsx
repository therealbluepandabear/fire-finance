import { Button, HTMLChakraProps } from '@chakra-ui/react'
import { PropsWithChildren } from 'react'

export default function Chip({ children, ...props }: PropsWithChildren<HTMLChakraProps<'button'>>) {
    return (
        <Button
            height='100%'
            borderRadius='999px'
            fontWeight='normal'
            _hover={{ }}
            _active={{ background: 'gray.50' }}
            {...props}
        >
            {children}
        </Button>
    )
}