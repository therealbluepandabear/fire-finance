import { Box, Flex, HTMLChakraProps } from '@chakra-ui/react'
import { PropsWithChildren } from 'react'

interface FScrollableBoxProps extends PropsWithChildren<HTMLChakraProps<'div'>> {
    thickness?: 'normal' | 'thick'
}

export default function FScrollableBox({ children, thickness, ...props }: FScrollableBoxProps): JSX.Element {

    let scrollbarWidth = '8px'

    if (thickness === 'thick') {
        scrollbarWidth = '12px'
    }

    return (
        <Flex 
            {...props}
            sx={{
                '::-webkit-scrollbar': {
                    width: scrollbarWidth
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