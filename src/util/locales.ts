import de from './../../locales/de.json'
import en from './../../locales/en.json'
import es_ES from './../../locales/es-ES.json'
import pl from './../../locales/pl.json'
import pt_BR from './../../locales/pt-BR.json'
import ru from './../../locales/ru.json'
import zh_CN from './../../locales/zh-CN.json'
import zh_TW from './../../locales/zh-TW.json'

export const locales = {
    en,
    ru,
    de,
    pl,
    'pt-BR': pt_BR,
    'es-ES': es_ES,
    'zh-CN': zh_CN,
    'zh-TW': zh_TW,
} as const
// [script:add-locale-before-the-above-line-do-not-remove]
export type Locales = typeof locales

export type LocaleKeys = keyof typeof locales
export const localeKeys = Object.keys(locales) as LocaleKeys[]

export const langNames = Object.entries(locales).reduce(
    (acc: Record<string, string>, [key, value]) => {
        acc[key as LocaleKeys] = value.translation.langName
        return acc
    },
    {}
)

const englishKeys = Object.keys(en.translation) as (keyof typeof en.translation)[]
function getMissingKeys(lang: LocaleKeys) {
    const missingKeys = englishKeys.filter((key) => !locales[lang].translation[key])
    return missingKeys
}

export const missingKeys = localeKeys
    .map((lang) => ({
        lang,
        keys: getMissingKeys(lang),
    }))
    .filter(({ keys }) => keys.length > 0)

console.log('missingKeys', missingKeys)
