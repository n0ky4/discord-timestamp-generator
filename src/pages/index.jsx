import { useEffect, useRef, useState } from 'react'

// Components
import Container from '../components/Container'
import Heading from '../components/Heading'
import Input from '../components/Input'
import Text from '../components/Text'
import Timestamp from '../components/Timestamp'
import CodeBlock from '../components/CodeBlock'
import LanguageSelect from '../components/LanguageSelect'

// Date/moment stuff
import { dateToUnix, getMomentFormat } from '../util/date'
import Moment from 'react-moment'
import 'moment'
import 'moment/min/locales'
import i18n, { t } from 'i18next'

const TimestampContainer = (props) => {
    return (
        <div
            style={{
                display: 'flex',
                gap: '6px',
                alignItems: 'center',
                marginTop: '5px',
            }}
        >
            {props.children}
        </div>
    )
}

export default function Home() {
    const timestamp = useRef(null)
    const [date, setDate] = useState(new Date())

    const momentLocale = i18n.language.toLowerCase()

    function validate(value, type) {
        value = value.replace(/[^0-9]/g, '')
        if (isNaN(value)) return false
        if (type === 'year' && (value < 1000 || value > 3000)) return false
        if (type === 'month' && (value < 1 || value > 12)) return false
        if (type === 'day' && (value < 1 || value > 31)) return false
        if (type === 'hour' && (value < 0 || value > 23)) return false
        if ((type === 'minute' || type === 'second') && (value < 0 || value > 59)) return false
        return true
    }

    function getElements() {
        const year = document.querySelector('#YYYY')
        const month = document.querySelector('#MM')
        const day = document.querySelector('#DD')
        const hour = document.querySelector('#hh')
        const minute = document.querySelector('#mm')
        const second = document.querySelector('#ss')

        return { year, month, day, hour, minute, second }
    }

    function handleDateChange(e) {
        const { year, month, day, hour, minute, second } = getElements()

        if (
            !validate(year.value, 'year') ||
            !validate(month.value, 'month') ||
            !validate(day.value, 'day') ||
            !validate(hour.value, 'hour') ||
            !validate(minute.value, 'minute') ||
            !validate(second.value, 'second')
        )
            return false

        const _date = new Date(
            year.value,
            month.value - 1,
            day.value,
            hour.value,
            minute.value,
            second.value
        )

        setDate(_date)
    }

    useEffect(() => {
        const { year, month, day, hour, minute, second } = getElements()
        let _date = new Date()

        function updateDate() {
            if (
                !validate(year.value, 'year') ||
                !validate(month.value, 'month') ||
                !validate(day.value, 'day') ||
                !validate(hour.value, 'hour') ||
                !validate(minute.value, 'minute') ||
                !validate(second.value, 'second')
            ) {
                _date = new Date()
                setDate(_date)
            }
        }

        updateDate()
        setInterval(updateDate, 100)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Container>
            <div>
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                    }}
                >
                    <a
                        href='https://github.com/gukodev/discord-timestamp-generator'
                        target='_blank'
                        rel='noreferrer'
                        style={{ display: 'flex', gap: '16px', alignItems: 'center' }}
                    >
                        <img
                            src='/github.svg'
                            alt='GitHub'
                            width='32px'
                            height='32px'
                            draggable={false}
                        />
                        <Heading>Discord Timestamp Generator</Heading>
                    </a>
                    <LanguageSelect />
                </div>
                <Text muted>{t('description')}</Text>
            </div>
            <div style={{ margin: '18px 0' }}>
                <Text>{t('date')}:</Text>
                <div style={{ display: 'flex', gap: '6px' }}>
                    {t('dateInputFormat')
                        .split('-')
                        .map((item, index) => {
                            return (
                                <Input
                                    key={index}
                                    id={item}
                                    type='number'
                                    placeholder={t(item)}
                                    onChange={handleDateChange}
                                />
                            )
                        })}
                </div>
                <Text muted ref={timestamp}>
                    {t('unixTimestamp')}: {dateToUnix(date)}
                </Text>
            </div>
            <div style={{ margin: '18px 0' }}>
                <Text>{t('generatedTimestamps')}:</Text>
                <Text muted>{t('instructions')}</Text>
                <div>
                    <TimestampContainer>
                        <CodeBlock copyOnClick>{`<t:${dateToUnix(date)}>`}</CodeBlock>
                        <Text muted>—</Text>
                        <Timestamp>
                            <Moment locale={momentLocale} date={date} format={getMomentFormat()} />
                        </Timestamp>
                    </TimestampContainer>
                    <TimestampContainer>
                        <CodeBlock copyOnClick>{`<t:${dateToUnix(date)}:D>`}</CodeBlock>
                        <Text muted>—</Text>
                        <Timestamp>
                            <Moment
                                locale={momentLocale}
                                date={date}
                                format={getMomentFormat('D')}
                            />
                        </Timestamp>
                    </TimestampContainer>
                    <TimestampContainer>
                        <CodeBlock copyOnClick>{`<t:${dateToUnix(date)}:d>`}</CodeBlock>
                        <Text muted>—</Text>
                        <Timestamp>
                            <Moment
                                locale={momentLocale}
                                date={date}
                                format={getMomentFormat('d')}
                            />
                        </Timestamp>
                    </TimestampContainer>
                    <TimestampContainer>
                        <CodeBlock copyOnClick>{`<t:${dateToUnix(date)}:F>`}</CodeBlock>
                        <Text muted>—</Text>
                        <Timestamp>
                            <Moment
                                locale={momentLocale}
                                date={date}
                                format={getMomentFormat('F')}
                            />
                        </Timestamp>
                    </TimestampContainer>
                    <TimestampContainer>
                        <CodeBlock copyOnClick>{`<t:${dateToUnix(date)}:f>`}</CodeBlock>
                        <Text muted>—</Text>
                        <Timestamp>
                            <Moment
                                locale={momentLocale}
                                date={date}
                                format={getMomentFormat('f')}
                            />
                        </Timestamp>
                    </TimestampContainer>
                    <TimestampContainer>
                        <CodeBlock copyOnClick>{`<t:${dateToUnix(date)}:R>`}</CodeBlock>
                        <Text muted>—</Text>
                        <Timestamp>
                            <Moment locale={momentLocale} date={date} fromNow />
                        </Timestamp>
                    </TimestampContainer>
                    <TimestampContainer>
                        <CodeBlock copyOnClick>{`<t:${dateToUnix(date)}:T>`}</CodeBlock>
                        <Text muted>—</Text>
                        <Timestamp>
                            <Moment
                                locale={momentLocale}
                                date={date}
                                format={getMomentFormat('T')}
                            />
                        </Timestamp>
                    </TimestampContainer>
                    <TimestampContainer>
                        <CodeBlock copyOnClick>{`<t:${dateToUnix(date)}:t>`}</CodeBlock>
                        <Text muted>—</Text>
                        <Timestamp>
                            <Moment
                                locale={momentLocale}
                                date={date}
                                format={getMomentFormat('t')}
                            />
                        </Timestamp>
                    </TimestampContainer>
                </div>
            </div>
        </Container>
    )
}
