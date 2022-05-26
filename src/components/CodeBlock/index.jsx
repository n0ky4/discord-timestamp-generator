import styled from 'styled-components'

const CodeBlockStyle = styled.code`
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
    return <CodeBlockStyle {...props}>{props.children}</CodeBlockStyle>
}
