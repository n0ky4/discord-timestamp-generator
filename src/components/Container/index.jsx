import styled from 'styled-components'

const ContainerStyle = styled.div`
    margin: 0 auto;
    padding: 25px 0;
    width: 95%;

    // mobile
    @media (max-width: ${(props) => props.theme.breakpoints.mobile}) {
        width: 95%;
    }

    // tablet
    @media (min-width: ${(props) => props.theme.breakpoints.tablet}) {
        width: 80%;
    }

    // desktop
    @media (min-width: ${(props) => props.theme.breakpoints.desktop}) {
        width: 60%;
    }

    // desktop large
    @media (min-width: ${(props) => props.theme.breakpoints.desktop_large}) {
        width: 50%;
    }
`

export default function Container(props) {
    return <ContainerStyle {...props}>{props.children}</ContainerStyle>
}
