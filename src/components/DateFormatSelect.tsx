import { Listbox } from '@headlessui/react'
import { useTranslation } from 'react-i18next'
import { DATE_FORMATS, DateFormat } from '../context/dateFormat'
import { SelectButton, SelectOption, SelectOptions } from './Select'

interface DateFormatSelectProps {
    onChange: (value: DateFormat) => void
    value: DateFormat
}

export default function DateFormatSelect({ onChange, value }: DateFormatSelectProps) {
    const { t } = useTranslation()

    const translateFormat = (format: DateFormat) => {
        return format
            .split('-')
            .map((part) => t(part).split('(')[0].trim())
            .join(', ')
    }

    return (
        <div className='relative font-medium'>
            <Listbox value={value} onChange={onChange}>
                <SelectButton>{translateFormat(value)}</SelectButton>
                <SelectOptions>
                    {DATE_FORMATS.map((format) => (
                        <SelectOption key={format} value={format}>
                            {translateFormat(format)}
                        </SelectOption>
                    ))}
                </SelectOptions>
            </Listbox>
        </div>
    )
}
