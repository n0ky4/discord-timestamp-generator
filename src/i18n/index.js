import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

// Locales
import en from './locales/en.json'
import pt_BR from './locales/pt-BR.json'

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
        resources: {
            en,
            'pt-BR': pt_BR,
        },
        supportedLngs: ['en', 'pt-BR'],
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
    })

export default i18n
