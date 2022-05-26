import { forwardRef } from 'react'
import styled from 'styled-components'

const TextStyle = styled.p`
    color: ${(props) =>
        props.muted ? props.theme.colors.text_muted : props.theme.colors.text_normal};
`

const Text = forwardRef((props, ref) => (
    <TextStyle {...props} ref={ref}>
        {props.children}
    </TextStyle>
))

Text.displayName = 'Text'

export default Text
