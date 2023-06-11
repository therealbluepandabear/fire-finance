import { Flex } from '@chakra-ui/react'
import { PropsWithChildren } from 'react'

export interface MenuItemGroupProps extends PropsWithChildren {
    background: string
}

export default function MenuItemGroup(props: MenuItemGroupProps): JSX.Element {
    return (
        <Flex width='100%' gap='8px'>
            {props.children}
        </Flex>
    )
}