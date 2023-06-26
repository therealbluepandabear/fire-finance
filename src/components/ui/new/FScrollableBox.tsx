import { Box, HTMLChakraProps } from '@chakra-ui/react'
import { PropsWithChildren } from 'react'

export default function FScrollableBox({ children, ...props }: HTMLChakraProps<'div'> & PropsWithChildren): JSX.Element {
    return (
        <Box 
            {...props}
            sx={{
                '::-webkit-scrollbar': {
                    width: '8px'
                },
                '::-webkit-scrollbar-thumb': {
                    background: 'lightgray'
                }
            }}
        >
            {children}
        </Box>
    )
}