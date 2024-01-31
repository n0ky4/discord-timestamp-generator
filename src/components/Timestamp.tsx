import moment from 'moment/min/moment-with-locales'

import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { twMerge } from 'tailwind-merge'
import { DiscordFormat, getMomentFormat } from '../util/timestamp'

interface TimestampProps {
    d: Date
    format?: DiscordFormat
}

export default function Timestamp({ format, d }: TimestampProps) {
    const { i18n } = useTranslation()
    const locale = i18n.language.toLowerCase()

    const [text, setText] = useState('')

    useEffect(() => {
        const updateDate = () => {
            const m = moment(d).locale(locale)
            // R => relative/from now
            const formatted = format === 'R' ? m.fromNow() : m.format(getMomentFormat(format))
            setText(formatted)
        }
        updateDate()

        const interval = setInterval(() => {
            updateDate()
        }, 100)
        return () => clearInterval(interval)
    }, [locale, format, d])

    if (!text) return <></>
    return (
        <span className={twMerge('block w-fit px-1 rounded', 'bg-gray-300 text-color-400')}>
            {text}
        </span>
    )
}
