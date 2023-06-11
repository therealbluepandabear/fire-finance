import { Flex, IconButton, Text } from '@chakra-ui/react'
import {  MdMenu } from 'react-icons/md'

interface AppBarProps {
    isHamburgerMenu: boolean
    contentRight: JSX.Element[]
}

export default function AppBar(props: AppBarProps): JSX.Element {
    return (
        <Flex
            width='100%'
            height='76px'
            borderBottom='1px solid #e1e1dc'
            alignItems='center'
            paddingStart='36px'
            paddingEnd='36px'
        >
            {props.isHamburgerMenu && (
                <IconButton
                    icon={<MdMenu size={25} />}
                    background='transparent'
                    aria-label='Menu'
                    borderRadius='999px'
                />
            )}

            <Text fontSize={{ base: 'lg', md: '2xl' }}>FireFinance</Text>

            <Flex
                marginLeft='auto'
                gap='16px'
                alignItems='center'
            >
                {props.contentRight.map((jsx) => jsx)}
            </Flex>
        </Flex>
    )
}