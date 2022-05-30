import styled from 'styled-components'
import toast from 'react-hot-toast'

const CodeBlockStyle = styled.code`
    cursor: ${(props) => (props.copyOnClick ? 'pointer' : 'auto')};
    font-size: 0.875rem;
    line-height: 1.125rem;
    text-indent: 0;
    white-space: pre-wrap;
    background: ${(props) => props.theme.colors.background_secondary};
    border: 1px solid ${(props) => props.theme.colors.background_tertiary};
    display: inline-block;
    overflow-x: auto;
    padding: 0.5em;
    border-radius: 4px;
    color: ${(props) => props.theme.colors.header_secondary};
    text-size-adjust: none;
    font-family: Consolas, monospace;
    user-select: text;
`

export default function CodeBlock(props) {
    function copyText(text) {
        const input = document.createElement('input')
        input.style.position = 'fixed'
        input.style.opacity = 0
        input.width = 1
        input.value = text
        document.body.appendChild(input)
        input.select()
        document.execCommand('copy')
        document.body.removeChild(input)

        toast.success('Copied to clipboard!', {
            duration: 2000,
            position: 'top-right',
            style: {
                fontSize: '16px',
                borderRadius: '3px',
                border: '1px solid #5865f2',
                padding: '10px',
                color: '#fff',
                background: '#2e3338',
            },
            iconTheme: {
                primary: '#5865f2',
                secondary: '#FFFAEE',
            },
        })
    }

    function handleClick(e) {
        if (props.copyOnClick) {
            copyText(props.children)
        }
    }

    return (
        <CodeBlockStyle {...props} onClick={handleClick}>
            {props.children}
        </CodeBlockStyle>
    )
}
