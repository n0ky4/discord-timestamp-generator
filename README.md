# ⏰ Discord Timestamp Generator

This is a simple website that generates timestamps for Discord.

### 👥 Contributing

If you want to contribute to this project, you can do so by forking this repository and making a pull request :)

### 🌐 Translating

If you want to translate this website into your language, fork this repository and do the following steps:

1. Copy the `src/i18n/en.json` file and rename it to your language code (e.g. `pt-BR.json` for Brazilian Portuguese)
2. Translate the strings to your language
3. Import the language file in `src/i18n/index.js`:

```diff
import en from './locales/en.json'
import es_ES from './locales/es-ES.json'
+import pt_BR from './locales/pt-BR.json'
```

4. Add the language to the `locales` constant object:

```diff
const locales = {
    en: en,
    'es-ES': es_ES,
+    'pt-BR': pt_BR,
}
```

Note that the key of the object is the language code, and the value is the imported language file in step 3.

5. Test! Make sure everything is working as expected and that's it! You can now make a pull request with your changes :)
