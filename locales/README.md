# 🌐 Translating

Hey there! Thanks for your interest in translating the app to your language! Here you can find all the information you need to do it :)

## 1. First steps 👶

Before you start translating, you'll need to fork this repository and clone it to your computer. After that, you'll need to install the dependencies by running the `pnpm install` command.

If you don't have `pnpm` installed, you can install it by running the `npm install -g pnpm` command.

## 2. Translating an existing language 🌎

In order to translate an existing language, you can simply edit the file `locales/<language>.json` and translate the strings.

### Adding missing translation keys (Automatically)

If there's any missing translation key, you can use the `pnpm run add-missing-keys <language>` command to automatically add all the missing keys from the `en.json` file to the `<language>.json` file.

If you don't want to use the script, you can also add the missing keys manually.

## 3. Adding a new language 🆕

If you want to add a new language, you can use the `pnpm run add-language <language>` command to automatically create the `<language>.json` file with all the keys from the `en.json` file. It will also add the new language to the `src/util/locales.ts` file.

If you don't want to use the script, you can copy the `en.json` file and rename it to `<language>.json`. Then, you'll need to add the new language to the `src/util/locales.ts` file like this:

```diff
import en from './../../locales/en.json'
import es_ES from './../../locales/es-ES.json'
+ import pt_BR from './../../locales/pt-BR.json'

export const locales = {
    en,
    'es-ES': es_ES,
+   'pt-BR': pt_BR,
} as const
```

After that, you're ready to translate the strings!

## 4. Testing your translations 👩‍🔬

In order to test your translations, you can use the `pnpm run dev` command to start the development server. Then, you can change the language in the settings page and see if everything is translated correctly.

## 5. Submitting your translations 📤

After you're done translating, you can submit your translations by creating a pull request with your changes. I'll review your changes and merge them if everything is alright ;)

👋 Thanks for your help and have a nice day!
