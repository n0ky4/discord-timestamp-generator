import styled from 'styled-components'

const InputStyle = styled.input`
    display: inline-block;
    padding: 10px;
    height: 40px;
    background-color: ${(props) => props.theme.colors.background_secondary};
    border: 1px solid ${(props) => props.theme.colors.text_input_border};
    &:focus {
        outline: none;
        border: 1px solid ${(props) => props.theme.colors.primary};
    }
    font-size: 16px;
    outline: 0;
    border-radius: 3px;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: ${(props) => props.theme.colors.text_input_color};
    ::-webkit-input-placeholder {
        color: ${(props) => props.theme.colors.text_muted};
    }
    -webkit-transition: background-color 0.15s ease, border 0.15s ease;
    transition: background-color 0.15s ease, border 0.15s ease;
    width: 100%;
    color: ${(props) =>
        props.secondary ? props.theme.colors.header_secondary : props.theme.colors.header_primary};
`

export default function Input(props) {
    return (
        <InputStyle type='text' {...props}>
            {props.children}
        </InputStyle>
    )
}
