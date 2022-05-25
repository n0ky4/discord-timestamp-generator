import { useEffect, useRef } from 'react'
import Head from 'next/head'
import Container from '../components/Container'
import Heading from '../components/Heading'
import Input from '../components/Input'
import Text from '../components/Text'

export default function Home() {
    useEffect(() => {
        let date = new Date()
        let ts = Math.floor(date.getTime() / 1000)

        const year = document.getElementById('year')
        const month = document.getElementById('month')
        const day = document.getElementById('day')
        const hour = document.getElementById('hour')
        const minute = document.getElementById('minute')
        const second = document.getElementById('second')
        const timestamp = document.getElementById('timestamp')

        function updateDate() {
            date = new Date()
            ts = Math.floor(date.getTime() / 1000)
            year.value = date.getFullYear()
            month.value = date.getMonth() + 1
            day.value = date.getDate()
            hour.value = date.getHours()
            minute.value = date.getMinutes()
            second.value = date.getSeconds()
            timestamp.innerText = `UNIX timestamp: ${ts.toString()}`
        }

        updateDate()
        setInterval(updateDate, 100)
    }, [])

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
                    <Input type='number' placeholder='Year' max='9999' step='1' id='year' />
                    <Input
                        type='number'
                        placeholder='Month'
                        min='01'
                        max='12'
                        step='1'
                        id='month'
                    />
                    <Input type='number' placeholder='Day' min='01' max='31' step='1' id='day' />
                    <Input
                        type='number'
                        placeholder='Hour (24h)'
                        min='00'
                        max='23'
                        step='1'
                        id='hour'
                    />
                    <Input
                        type='number'
                        placeholder='Minutes'
                        min='00'
                        max='59'
                        step='1'
                        id='minute'
                    />
                    <Input
                        type='number'
                        placeholder='Seconds'
                        min='00'
                        max='59'
                        step='1'
                        id='second'
                    />
                </div>
                <Text muted id='timestamp'>
                    UNIX timestamp: 203488520
                </Text>
            </div>
            <div style={{ margin: '25px 0' }}>
                <Text>Timestamp Type:</Text>
                <div style={{ display: 'flex', gap: '6px' }}></div>
            </div>
        </Container>
    )
}
