// Script to check for missing locale keys in an existing locale file
// usage: pnpm run check-locales
import fs from 'fs'
import path from 'path'
import { BASE_LOCALE, BASE_LOCALE_PATH, LOCALES_PATH } from './util/common.js'

function getBaseLocaleKeys() {
    const json = JSON.parse(fs.readFileSync(BASE_LOCALE_PATH))
    return Object.keys(json.translation)
}

async function main() {
    const keys = getBaseLocaleKeys()

    const filesToCheck = fs
        .readdirSync(LOCALES_PATH)
        .filter((filename) => filename.endsWith('.json') && filename !== `${BASE_LOCALE}.json`)

    console.log(`[info] checking ${filesToCheck.length} files for missing keys`)

    const missingKeys = {}

    for (const file of filesToCheck) {
        const json = JSON.parse(fs.readFileSync(path.join(LOCALES_PATH, file))).translation

        for (const key of keys) {
            if (!json[key]) {
                if (!missingKeys[file]) {
                    missingKeys[file] = []
                }

                missingKeys[file].push(key)
            }
        }
    }

    const len = Object.keys(missingKeys).length
    if (len > 0) {
        console.warn(`[warn] ${len} files have missing keys:`)

        Object.entries(missingKeys).forEach(([file, keys]) => {
            console.log(`${file} (${keys.length}): `)
            console.log('    ' + keys.join(', '))
        })

        return 0
    }

    console.log('[success] no missing keys found')
    return 0
}

main().then(process.exit)
