import { Button, HTMLChakraProps } from '@chakra-ui/react'
import { PropsWithChildren } from 'react'

interface FChipProps extends PropsWithChildren<HTMLChakraProps<'button'>> { }

export default function FChip({ children, ...props }: FChipProps) {
    return (
        <Button
            height='100%'
            borderRadius='999px'
            fontWeight='normal'
            _hover={{ }}
            _active={{ backgroundImage: 'linear-gradient(rgb(0 0 0/2%) 0 0)' }}
            {...props}
        >
            {children}
        </Button>
    )
}