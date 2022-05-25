import styled from 'styled-components'

const HeadingStyle = styled.h1`
    color: ${(props) =>
        props.secondary ? props.theme.colors.header_secondary : props.theme.colors.header_primary};
`

export default function Heading(props) {
    return <HeadingStyle {...props}>{props.children}</HeadingStyle>
}
