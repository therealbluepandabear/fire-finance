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
                    "@media (hover: hover)": {
                        _hover: {
                            backgroundImage: 'linear-gradient(rgb(0 0 0/15%) 0 0)'
                        },
                    },
                 
                    _active: {
                        backgroundImage: 'linear-gradient(rgb(0 0 0/25%) 0 0)'
                    },
                    height: '35px'
                },
                fab: {
                    width: '56px',
                    height: '56px',
                    right: '0',
                    bottom: '0',
                    background: 'buttonPrimary',
                    position: 'fixed',
                    borderRadius: '999px',
                    margin: '16px',
                    boxShadow: 'rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;'
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
        buttonPrimary: '#5e83ff',
        pastelPrimary: '#edf1ff',
        pastelForeground: '#1a73e8'
    },
    initialColorMode: 'light',
    useSystemColorMode: false
})

export default theme