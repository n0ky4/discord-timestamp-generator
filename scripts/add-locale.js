// Script to create a new locale file and add it to the locales list
// usage: pnpm run new-locale <locale-key>
import fs from 'fs'
import path from 'path'
import {
    BASE_LOCALE_PATH,
    LOCALES_LIST_PATH,
    LOCALES_PATH,
    getExistingLocales,
    getLangCodes,
    isLangCode,
    sleep,
} from './util/common.js'

const langCodes = getLangCodes()
const existingLocales = getExistingLocales()

export function createNewLocaleFile(localeKey) {
    const newFile = path.join(LOCALES_PATH, `${localeKey}.json`)
    fs.copyFileSync(BASE_LOCALE_PATH, newFile)
}

export function addLocaleToLocalesList(localeKey) {
    const defineComment = `// [script:add-locale-before-the-above-line-do-not-remove]`

    const importName = localeKey.replace('-', '_')
    const defineName = localeKey.includes('-') ? `'${localeKey}'` : localeKey
    const spacing = ' '.repeat(4)

    const importStr = `import ${importName} from './../../locales/${localeKey}.json'`
    const defineStr =
        spacing + (defineName === importName ? importName : `${defineName}: ${importName}`) + ','

    const localesList = fs.readFileSync(LOCALES_LIST_PATH, 'utf8').split('\n')

    localesList.splice(0, 0, importStr)

    const defineCommentIndex = localesList.findIndex((line) => line.includes(defineComment))
    localesList.splice(defineCommentIndex - 1, 0, defineStr)

    fs.writeFileSync(LOCALES_LIST_PATH, localesList.join('\n'))
}

async function main() {
    const newLocaleKey = process.argv[2]
    if (!newLocaleKey) {
        console.error('[error] please provide a new locale key in the first argument')
        return 1
    }

    if (!isLangCode(newLocaleKey)) {
        console.error(
            '[error] locale key must be a valid language code (e.g. en, ru, pt-BR, es-ES)'
        )
        return 1
    }

    if (existingLocales.includes(newLocaleKey)) {
        console.error(`[error] locale \`${newLocaleKey}\` already exists`)
        return 1
    }

    const langName = langCodes[newLocaleKey]
    if (!langName) {
        console.warn(
            `[warn] locale \`${newLocaleKey}\` not found in langcodes.json, are you sure it's a valid language code? (continuing in 5s)`
        )
        await sleep(5000)
    } else {
        console.log(`[info] adding ${langName} (${newLocaleKey})`)
    }

    try {
        createNewLocaleFile(newLocaleKey)
        console.log(`[info]${langName ? ` ${langName}` : ''} (${newLocaleKey}.json) file created`)
    } catch (err) {
        console.error(`[error] failed to create ${newLocaleKey}.json file`)
        console.error(err)
        return 1
    }

    try {
        console.log('[info] adding locale to locales list')
        addLocaleToLocalesList(newLocaleKey)
        console.log('[success] locale added successfully')
    } catch (err) {
        console.error('[error] failed to add locale to locales list')
        console.error(err)
        return 1
    }

    return 0
}

main().then(process.exit)
