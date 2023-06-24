import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
    fonts: {
        body: 'Noto Sans, sans-serif',
        heading: 'Noto Sans, sans-serif'
    },
    components: {
        Button: {
            baseStyle: {
                fontWeight: 'normal',
                _hover: {
                    backgroundImage: 'linear-gradient(rgb(0 0 0/40%) 0 0)'
                },
                _active: {
                    backgroundImage: 'linear-gradient(rgb(0 0 0/80%) 0 0)'
                }
            }
        },
        Popover: {
            variants: {
                responsive: {
                    content: { 
                        width: 'unset' 
                    }
                }
            }
        }
    },
    colors: {
        buttonPrimary: {
            500: '#404040'
        }
    },
    initialColorMode: 'light',
    useSystemColorMode: false
})

export default theme