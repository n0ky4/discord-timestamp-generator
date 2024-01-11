import i18n from 'i18next'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

// [HOW TO ADD A NEW LANGUAGE]
// 1. Copy the file `src/locales/en.json` and rename it with the locale code (ex: pt-BR.json)
// 2. Translate all the strings to the new language

// 3. Import the new locale file below
import de_DE from './locales/de-DE.json'
import en from './locales/en.json'
import es_ES from './locales/es-ES.json'
import pt_BR from './locales/pt-BR.json'
import ru_RU from './locales/ru-RU.json'
import zh_CN from './locales/zh-CN.json'
import zh_TW from './locales/zh-TW.json'
import pl from './locales/pl.json'

// 4. Add the new locale to the `locales` object below.
// PS: The key should be the locale code and the value should be the imported file from step 2
const locales = {
    en: en,
    'es-ES': es_ES,
    'pt-BR': pt_BR,
    'ru-RU': ru_RU,
    'de-DE': de_DE,
    'zh-CN': zh_CN,
    'zh-TW': zh_TW,
    pl: pl
}

export const langNames = Object.entries(locales).reduce((acc, [key, value]) => {
    acc[key] = value.translation.langName
    return acc
}, {})

i18n.use(LanguageDetector)
    .use(initReactI18next)
    .init({
        detection: {
            order: [
                'querystring',
                'localStorage',
                'cookie',
                'sessionStorage',
                'navigator',
                'htmlTag',
                'path',
                'subdomain',
            ],
            lookupQuerystring: 'lng',
            lookupCookie: 'lng',
            lookupLocalStorage: 'lng',
            lookupSessionStorage: 'lng',
        },
        resources: locales,
        supportedLngs: Object.keys(locales),
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
    })

export default i18n
