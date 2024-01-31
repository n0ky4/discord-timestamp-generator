import { PropsWithChildren, createContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import {
    DATE_FORMATS,
    DATE_FORMAT_STORAGE_KEY,
    DateFormat,
    getStoredDateFormat,
} from './dateFormat'

interface DateFormatContextType {
    dateFormat: DateFormat
    setDateFormat: (dateFormat: DateFormat) => void
    defaultDateFormat: DateFormat
}

export const DateFormatContext = createContext<DateFormatContextType | undefined>(undefined)

export function DateFormatProvider({ children }: PropsWithChildren) {
    const [dateFormat, setDateFormatState] = useState<DateFormat>(DATE_FORMATS[0])
    const [defaultDateFormat, setDefaultDateFormat] = useState<DateFormat>(DATE_FORMATS[0])
    const { t } = useTranslation()

    const refreshDateFormat = () => {
        const stored = getStoredDateFormat()
        if (stored) return setDateFormatState(stored)
    }

    useEffect(() => {
        const defaultDateFormat = t('defaultDateFormat') as DateFormat
        setDefaultDateFormat(defaultDateFormat)
    }, [t])

    useEffect(() => {
        refreshDateFormat()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const setDateFormat = (dateFormat: DateFormat) => {
        localStorage.setItem(DATE_FORMAT_STORAGE_KEY, dateFormat)
        setDateFormatState(dateFormat)
    }

    return (
        <DateFormatContext.Provider value={{ dateFormat, setDateFormat, defaultDateFormat }}>
            {children}
        </DateFormatContext.Provider>
    )
}
