import styled from 'styled-components'
import i18n from 'i18next'

const SelectStyle = styled.select``

export default function LanguageSelect(props) {
    const availableLanguages = i18n.languages

    return (
        <SelectStyle {...props}>
            {availableLanguages.map((lang) => (
                <option key={lang} value={lang} onClick={i18n.changeLanguage(lang)}>
                    {lang}
                </option>
            ))}
        </SelectStyle>
    )
}
