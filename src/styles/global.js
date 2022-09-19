import { createGlobalStyle } from 'styled-components'

const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
        font-family: ${(props) => props.theme.font};
    }

    body {
        color: ${(props) => props.theme.colors.text_normal};
        background-color: ${(props) => props.theme.colors.background_primary};
    }

    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }

    input[type=number] {
        -moz-appearance: textfield;
    }

    ::-webkit-scrollbar {
        width: 4px;
    }

    ::-webkit-scrollbar-track {
        background: ${(props) => props.theme.colors.background_secondary};
    }

    ::-webkit-scrollbar-thumb {
        background: ${(props) => props.theme.colors.background_tertiary};
        border-radius: 999px;
    }

    a {
        color: inherit;
    }
`

export default GlobalStyle
