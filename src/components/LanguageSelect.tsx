import { Listbox } from '@headlessui/react'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import Twemoji from 'react-twemoji'
import { LocaleKeys, locales, missingKeys } from '../util/locales'
import Link from './Link'
import { SelectButton, SelectOption, SelectOptions } from './Select'

// typescript in a nutshell
interface Lang {
    label: string
    flag: string
    key: LocaleKeys
}
const languages: Record<LocaleKeys, Lang> = Object.entries(locales).reduce((acc, [key, value]) => {
    acc[key as LocaleKeys] = {
        label: value.translation.langName,
        flag: value.translation.flagEmoji,
        key: key as LocaleKeys,
    }
    return acc
}, {} as Record<LocaleKeys, Lang>)

// sort languages by label (english first tho)
const langEntries = Object.entries(languages).sort((a, b) => {
    if (a[0] === 'en') return -1
    if (b[0] === 'en') return 1
    return a[1].label.localeCompare(b[1].label)
})

export default function LanguageSelect() {
    const { t, i18n } = useTranslation()

    const currLang = i18n.language as LocaleKeys
    const [v, setV] = useState(languages[currLang])
    const [missingKeysAmount, setMissingKeysAmount] = useState(0)

    const flagSize = 'w-6 h-6'

    const handleChangeLanguage = (lang: Lang) => {
        setV(languages[lang.key])
        i18n.changeLanguage(lang.key)
        toast.success(t('languageUpdated'))
    }

    useEffect(() => {
        const mikeys = missingKeys.filter((mkeys) => mkeys.lang === currLang)[0]
        if (!mikeys) return setMissingKeysAmount(0)
        setMissingKeysAmount(mikeys.keys.length)
    }, [currLang, v])

    return (
        <div>
            <div className='relative font-medium'>
                <Listbox value={v} onChange={handleChangeLanguage}>
                    <SelectButton>
                        <div className='flex items-center gap-2'>
                            <Twemoji
                                options={{
                                    className: flagSize,
                                }}
                            >
                                {v.flag}
                            </Twemoji>
                            {v.label}
                        </div>
                    </SelectButton>
                    <SelectOptions>
                        {langEntries.map(([key, value]) => (
                            <SelectOption key={key} value={value}>
                                <Twemoji
                                    options={{
                                        className: flagSize,
                                    }}
                                >
                                    {value.flag}
                                </Twemoji>
                                {value.label}
                            </SelectOption>
                        ))}
                    </SelectOptions>
                </Listbox>
            </div>
            {missingKeysAmount > 0 && !import.meta.env.VITE_HIDE_MISSING_KEYS && (
                <div className='text-sm text-red mt-1 select-none'>
                    Currently there are {missingKeysAmount} missing translation
                    {missingKeysAmount > 1 && 's'} in this language. You can help by{' '}
                    <Link
                        href={`${import.meta.env.VITE_GITHUB_REPO_URL}/tree/main/locales`}
                        className='text-color-300 font-normal'
                    >
                        contributing!
                    </Link>
                </div>
            )}
        </div>
    )
}
