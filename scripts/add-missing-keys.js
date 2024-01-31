// Script to add missing locale keys to an existing locale file
// usage: pnpm run add-missing-keys <locale>
import fs from 'fs'
import path from 'path'
import { BASE_LOCALE_PATH, LOCALES_PATH, getExistingLocales } from './util/common.js'

function getBaseLocaleValues() {
    const json = JSON.parse(fs.readFileSync(BASE_LOCALE_PATH))
    return json.translation
}

function addMissingKeys(baseLocale, locale, missingKeys, output) {
    for (const key of missingKeys) {
        locale.translation[key] = baseLocale[key]
    }
    fs.writeFileSync(path.join(LOCALES_PATH, output), JSON.stringify(locale, null, 4))
}

async function main() {
    const localeToCheck = process.argv[2]

    if (!localeToCheck) {
        console.error('[error] please provide a locale key in the first argument')
        return 1
    }

    const existingLocales = getExistingLocales()

    if (!existingLocales.includes(localeToCheck)) {
        console.error(`[error] locale \`${localeToCheck}\` does not exist`)
        return 1
    }

    const baseLocale = getBaseLocaleValues()
    const baseLocaleKeys = Object.keys(baseLocale)

    const localeRead = fs.readFileSync(path.join(LOCALES_PATH, `${localeToCheck}.json`))
    const locale = JSON.parse(localeRead)

    const missingKeys = []
    for (const key of baseLocaleKeys) {
        if (!locale.translation[key]) {
            missingKeys.push(key)
        }
    }

    if (missingKeys.length === 0) {
        console.log(`[success] no missing keys found in \`${localeToCheck}\``)
        return 0
    }

    console.log(
        `[warn] ${missingKeys.length} missing keys found in \`${localeToCheck}\`, adding them now`
    )
    try {
        addMissingKeys(baseLocale, locale, missingKeys, `${localeToCheck}.json`)
        console.log(`[success] added ${missingKeys.length} keys to \`${localeToCheck}\``)
    } catch (err) {
        console.error('[error] failed to add missing keys')
        console.error(err)
        return 1
    }

    return 0
}

main().then(process.exit)
