import React from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider } from 'styled-components'
import Home from './pages/index'
import GlobalStyle from './styles/global'
import theme from './styles/theme'

const root = ReactDOM.createRoot(document.getElementById('app'))
root.render(
    <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Home />
    </ThemeProvider>
)
