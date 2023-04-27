import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import theme from './theme'

import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'


const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
)

root.render(
    <ChakraProvider theme={theme}>
        <React.StrictMode>
            <ColorModeScript initialColorMode={theme.config.initialColorMode} />
            <App />
        </React.StrictMode>
    </ChakraProvider>
)