import { Listbox } from '@headlessui/react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { SelectButton, SelectOption, SelectOptions } from './Select'

interface ThemeSelectProps {
    onLightThemeIsBad: () => void
}

export default function ThemeSelect({ onLightThemeIsBad }: ThemeSelectProps) {
    const { t } = useTranslation()

    const handleChange = (theme: 'dark' | 'light') => {
        if (theme === 'dark') return toast.success(t('yay'))
        toast.error(t('nuhuh'))
        onLightThemeIsBad()
    }

    return (
        <div className='relative font-medium'>
            <Listbox value='dark' onChange={handleChange}>
                <SelectButton>{t('darkTheme')}</SelectButton>
                <SelectOptions>
                    <SelectOption value='dark'>{t('darkTheme')}</SelectOption>
                    <SelectOption value='light'>{t('lightTheme')}</SelectOption>
                </SelectOptions>
            </Listbox>
        </div>
    )
}
