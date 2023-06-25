import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
    fonts: {
        body: 'Noto Sans, sans-serif',
        heading: 'Noto Sans, sans-serif'
    },
    components: {
        Button: {
            baseStyle: {
                fontWeight: 'normal'
            },
            variants: {
                base: {
                    _hover: {
                        backgroundImage: 'linear-gradient(rgb(0 0 0/15%) 0 0)'
                    },
                    _active: {
                        backgroundImage: 'linear-gradient(rgb(0 0 0/25%) 0 0)'
                    }
                }
            },
            defaultProps: {
                variant: 'base'
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
        buttonPrimary: '#1E90FF'
    },
    initialColorMode: 'light',
    useSystemColorMode: false
})

export default theme