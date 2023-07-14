import { Box, Flex, HTMLChakraProps } from '@chakra-ui/react'
import { PropsWithChildren } from 'react'

export type ScrollbarThumbThickness = 'normal' | 'thick'

interface FScrollableBoxProps extends PropsWithChildren<HTMLChakraProps<'div'>> {
    thickness?: ScrollbarThumbThickness
}

export default function FScrollableBox({ children, thickness, ...props }: FScrollableBoxProps) {

    let scrollbarWidth = '9px'



    return (
        <Flex 
            {...props}
            sx={{
                '::-webkit-scrollbar': {
                    width: scrollbarWidth,
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