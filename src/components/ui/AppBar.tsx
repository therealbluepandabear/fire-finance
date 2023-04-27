import { Text, Flex, Box, useColorMode } from '@chakra-ui/react'
import { MdDarkMode, MdLightMode } from 'react-icons/md'


interface AppBarProps {
    selectedItemIndex: number
    onItemClick: (itemIndex: number) => void 
}

export default function AppBar(props: AppBarProps) {
    const { colorMode, toggleColorMode } = useColorMode()

    return (
        <Flex 
            flexDirection="row" 
            width="100%" 
            padding="16px"
            background="lightblue" 
            gap="16px" 
            alignItems="center"  
        >
            {['Retirement Calculator', 'Safe Withdrawal Rate Calculator'].map((text, index) => (
                <Text 
                    fontSize="md" 
                    cursor="pointer" 
                    onClick={props.onItemClick.bind(null, index)}
                    color={index === props.selectedItemIndex ? 'green' : 'black'}
                >{text}</Text>
            ))}

            <Box marginLeft="auto" cursor="pointer" onClick={toggleColorMode}>
                {colorMode === 'light' && (
                    <MdDarkMode size="22" />
                )}

                {colorMode === 'dark' && (
                    <MdLightMode size="22" />
                )}
            </Box>
        </Flex>
    )
}