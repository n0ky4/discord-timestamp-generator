import { useTranslation } from 'react-i18next'
import { twMerge } from 'tailwind-merge'

export default function Disclaimer() {
    const { t } = useTranslation()
    return (
        <div
            className={twMerge(
                'my-10',
                'opacity-50 hover:opacity-100 transition-opacity',
                'w-full px-4 select-none'
            )}
        >
            <span className='block max-w-sm mx-auto text-sm text-color-600 text-center leading-none'>
                {t('disclaimer')}
            </span>
        </div>
    )
}
