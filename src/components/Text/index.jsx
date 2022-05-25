import styled from 'styled-components'

const TextStyle = styled.p`
    color: ${(props) =>
        props.muted ? props.theme.colors.text_muted : props.theme.colors.text_normal};
`

export default function Text(props) {
    return <TextStyle {...props}>{props.children}</TextStyle>
}
