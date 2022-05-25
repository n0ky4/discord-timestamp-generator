import styled from 'styled-components'

const TimestampStyle = styled.span`
    background-color: ${(props) => props.theme.colors.background_timestamp};
    border-radius: 3px;
    padding: 0 2px;
`

export default function Timestamp(props) {
    return <TimestampStyle {...props}>{props.children}</TimestampStyle>
}
