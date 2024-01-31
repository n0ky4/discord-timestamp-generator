import fs from 'fs'
import path from 'path'

const __dirname = path.dirname(new URL(import.meta.url).pathname)

export const BASE_LOCALE = 'en'

export const LOCALES_PATH = path.join(__dirname, '../../locales')
export const LANGCODES_PATH = path.join(__dirname, './langcodes.json')
export const LOCALES_LIST_PATH = path.join(__dirname, '../../src/util/locales.ts')
export const BASE_LOCALE_PATH = path.join(LOCALES_PATH, `${BASE_LOCALE}.json`)

export const isLangCode = (str) => /^[a-z]{2}(-[A-Z]{2})?$/.test(str)
export const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms))

export function getExistingLocales() {
    return fs
        .readdirSync(LOCALES_PATH)
        .filter((filename) => filename.endsWith('.json'))
        .map((filename) => filename.replace('.json', ''))
}

export function getLangCodes() {
    return JSON.parse(fs.readFileSync(LANGCODES_PATH))
}
