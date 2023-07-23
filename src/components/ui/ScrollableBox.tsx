import { Flex, HTMLChakraProps } from '@chakra-ui/react'
import { PropsWithChildren } from 'react'

export default function FScrollableBox({ children, ...props }: PropsWithChildren<HTMLChakraProps<'div'>>) {
    return (
        <Flex 
            {...props}
            sx={{
                '::-webkit-scrollbar': {
                    width: '9px',
                    height: '9px',
                    overflowY: 'auto'
                },
                '::-webkit-scrollbar-thumb:hover': {
                    background: 'darkgray'
                },
                '::-webkit-scrollbar-thumb:active': {
                    background: 'gray'
                },
                '::-webkit-scrollbar-thumb': {
                    background: 'lightgray',
                    borderRadius: '999px'
                }
            }}
        >
            {children}
        </Flex>
    )
}