import { extendTheme } from '@chakra-ui/react'

const activeLabelStyles = {
    transform: 'scale(0.85) translateY(-24px) translateX(-16px)'
}

const theme = extendTheme({
    fonts: {
        body: 'Noto Sans, sans-serif',
        heading: 'Noto Sans, sans-serif'
    },
    // Floating label integration (officially from the official ChakraUI documentation)
    // which can be found here: https://chakra-ui.com/community/recipes/floating-labels
    components: {
        Button: {
            baseStyle: {
                fontWeight: 'normal',
                hover: { background: 'blue' },
                active: { filter: "brightness(92%)" }
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
                            transformOrigin: 'left top'
                        }
                    }
                }
            }
        }
    },
    initialColorMode: 'light',
    useSystemColorMode: false
})

export default theme