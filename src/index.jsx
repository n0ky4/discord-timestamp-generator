import React from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider } from 'styled-components'
import { Toaster } from 'react-hot-toast'

import Home from './pages/index'
import GlobalStyle from './styles/global'
import theme from './styles/theme'

import './i18n'

const app = ReactDOM.createRoot(document.getElementById('app'))
app.render(
    <ThemeProvider theme={theme}>
        <Toaster />
        <GlobalStyle />
        <Home />
    </ThemeProvider>
)
