import { useContext } from 'react'
import { DateFormatContext } from './DateFormatContext'

export const DATE_FORMAT_STORAGE_KEY = 'dateFormat'
export const DATE_FORMATS = [
    'auto',
    'DD-MM-YYYY-hh-mm-ss',
    'MM-DD-YYYY-hh-mm-ss',
    'YYYY-MM-DD-hh-mm-ss',
] as const
export type DateFormat = (typeof DATE_FORMATS)[number]

export type DateFormatPart = 'DD' | 'MM' | 'YYYY' | 'hh' | 'mm' | 'ss'

export function getStoredDateFormat(): DateFormat | null {
    const dateFormat = localStorage.getItem(DATE_FORMAT_STORAGE_KEY) as string | null
    const isValid = dateFormat && DATE_FORMATS.includes(dateFormat as any)

    if (!dateFormat || !isValid) {
        localStorage.setItem(DATE_FORMAT_STORAGE_KEY, 'auto')
        return 'auto'
    }

    return dateFormat as DateFormat
}

export function useDateFormat() {
    const context = useContext(DateFormatContext)
    if (!context) throw new Error('useDateFormat must be used within a DateFormatProvider')
    return context
}
