import { Button, HTMLChakraProps } from '@chakra-ui/react'
import { PropsWithChildren } from 'react'

interface FChipProps extends PropsWithChildren<HTMLChakraProps<'button'>> {
    icon: JSX.Element
}

export default function FChip({ children, icon, ...props }: FChipProps) {
    return (
        <Button
            leftIcon={icon}
            height='100%'
            borderRadius='0'
            fontWeight='normal'
            _hover={{ }}
            _active={{ backgroundImage: 'linear-gradient(rgb(0 0 0/2%) 0 0)' }}
            {...props}
        >
            {children}
        </Button>
    )
}