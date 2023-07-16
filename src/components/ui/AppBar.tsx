import { Flex, IconButton, Text } from '@chakra-ui/react'
import { MdMenu } from 'react-icons/md'

type AppBarProps = 
    { isMenu: true, onMenuClick: () => void, contentRight: JSX.Element } | 
    { isMenu: false, contentRight: JSX.Element }

export default function AppBar(props: AppBarProps) {
    const height = '76px'

    return (
        <Flex
            width='100%'
            height={height}
            minHeight={height}
            borderBottom='1px solid #e1e1dc'
            alignItems='center'
            paddingStart='16px'
            paddingEnd='16px'
            gap='16px'
            as='nav'
        >
            {props.isMenu && (
                <IconButton
                    onClick={props.onMenuClick}
                    icon={<MdMenu size={25} />}
                    background='transparent'
                    aria-label='Menu'
                    borderRadius='999px'
                    width='52px'
                    height='52px'
                />
            )}

            <Text fontSize={{ base: 'lg', md: '2xl' }} fontFamily='manrope'>FireFinance</Text>

            <Flex marginLeft='auto' alignItems='center'>
                {props.contentRight}
            </Flex>
        </Flex>
    )
}