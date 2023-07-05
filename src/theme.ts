import { extendTheme } from '@chakra-ui/react'

const activeLabelStyles = {
    transform: 'scale(0.85) translateY(-24px) translateX(-16px)'
}

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
        },
        Form: {
            variants: {
                floating: {
                    container: {
                        _focusWithin: {
                            label: {
                                ...activeLabelStyles
                            }
                        },
                        'input:not(:placeholder-shown) + label, .chakra-select__wrapper + label, textarea:not(:placeholder-shown) ~ label': {
                            ...activeLabelStyles
                        },
                        label: {
                            top: 0,
                            left: 0,
                            zIndex: 2,
                            position: 'absolute',
                            pointerEvents: 'none',
                            mx: 3,
                            px: 1,
                            my: 2,
                            transformOrigin: 'left top',
                            background: 'white'
                        }
                    }
                }
            }
        }
    },
    colors: {
        buttonPrimary: '#5E83FF',
        pastelPrimary: '#edf1ff',
        pastelForeground: '#1a73e8'
    },
    initialColorMode: 'light',
    useSystemColorMode: false
})

export default theme