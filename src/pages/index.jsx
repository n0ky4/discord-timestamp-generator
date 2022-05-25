import Head from 'next/head'
import Container from '../components/Container'
import Heading from '../components/Heading'
import Input from '../components/Input'
import Text from '../components/Text'

export default function Home() {
    return (
        <Container>
            <Head>
                <title>Discord Timestamp Generator</title>
            </Head>
            <div>
                <Heading>Discord Timestamp Generator</Heading>
                <Text muted>
                    This is a simple tool to generate Discord timestamps. You can use it on messages
                    or profile bio!
                </Text>
            </div>
            <div style={{ margin: '25px 0' }}>
                <Text>Date:</Text>
                <div style={{ display: 'flex', gap: '6px' }}>
                    <Input type='number' placeholder='Year' max='9999' step='1' />
                    <Input type='number' placeholder='Month' min='01' max='12' step='1' />
                    <Input type='number' placeholder='Day' min='01' max='31' step='1' />
                    <Input type='number' placeholder='Hour (24h)' min='00' max='23' step='1' />
                    <Input type='number' placeholder='Minutes' min='00' max='59' step='1' />
                    <Input type='number' placeholder='Seconds' min='00' max='59' step='1' />
                </div>
            </div>
            <div style={{ margin: '25px 0' }}>
                <Text>Timestamp Type:</Text>
                <div style={{ display: 'flex', gap: '6px' }}></div>
            </div>
        </Container>
    )
}
