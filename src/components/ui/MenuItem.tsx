import { Button, HTMLChakraProps } from '@chakra-ui/react'

interface MenuItemProps extends HTMLChakraProps<'button'> {
    label: string
}

export default function MenuItem({ label, ...props }: MenuItemProps) {
    return (
        <Button
            borderRadius='0'
            background='transparent'
            fontWeight='normal'
            justifyContent='flex-start'
            {...props}
        >{label}</Button>
    )
}