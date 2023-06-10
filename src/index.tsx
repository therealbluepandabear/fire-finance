import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import theme from './theme'

import { ChakraProvider, ColorModeScript } from '@chakra-ui/react'
import { ApiProvider } from '@reduxjs/toolkit/dist/query/react'
import { userApi } from './api'


const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
)

root.render(
    <ChakraProvider theme={theme}>
        <React.StrictMode>
            <ApiProvider api={userApi}>
                <ColorModeScript initialColorMode={theme.config.initialColorMode} />
                <App />
            </ApiProvider>
        </React.StrictMode>
    </ChakraProvider>
)