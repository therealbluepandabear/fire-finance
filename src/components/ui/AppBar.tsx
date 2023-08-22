import { Flex, IconButton, Text } from '@chakra-ui/react'
import { MdMenu } from 'react-icons/md'

interface AppBarProps {
    title: string
    onMenuClick: () => void
}

export default function AppBar(props: AppBarProps) {
    return (
        <Flex
            width='100%'
            height='76px'
            minHeight='76px'
            borderBottom={{ base: '0px solid', md: '1px solid #e1e1dc' }}
            alignItems='center'
            paddingStart='16px'
            paddingEnd='16px'
            gap='16px'
            as='nav'
        >
            <IconButton
                onClick={props.onMenuClick}
                icon={<MdMenu size={25} />}
                background='transparent'
                aria-label='Menu'
                borderRadius='999px'
                width='52px'
                height='52px'
            />

            <Text fontSize={{ base: 'lg', md: '2xl' }} fontFamily='manrope'>{props.title}</Text>
        </Flex>
    )
}