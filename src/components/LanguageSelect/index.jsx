import { useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import i18n from './../../i18n'

const SelectStyle = styled.div`
    position: relative;
    background: ${(props) => props.theme.colors.background_tertiary};
    border-color: ${(props) => props.theme.colors.background_tertiary};
    color: ${(props) => props.theme.colors.text_normal};
    cursor: pointer;
    align-items: center;
    border-radius: 4px;
    font-weight: 500;
    padding: 6px;
    width: 130px;
`

const SelectOptions = styled.div`
    display: ${(props) => (props.open ? 'auto' : 'none')};

    position: absolute;
    border: 1px solid;
    border-color: ${(props) => props.theme.colors.background_tertiary};
    color: ${(props) => props.theme.colors.text_normal};
    cursor: pointer;
    align-items: center;
    border-radius: 4px;
    font-weight: 500;
    top: 110%;
    left: 0;

    & div {
        padding: 6px;
        width: 130px;
        background: ${(props) => props.theme.colors.background_secondary};
        &:nth-child(2n) {
            background: ${(props) => props.theme.colors.background_tertiary};
        }
    }
`

export default function LanguageSelect(props) {
    const [isOpen, setIsOpen] = useState(false)
    const selectRef = useRef(null)

    const currentLanguage = i18n.language
    const availableLanguages = {
        en: 'English',
        'pt-BR': 'Português',
		'ru-RU': 'Russia',
    }

    function handleLanguageChange(e) {
        i18n.changeLanguage(e.target.getAttribute('data-language'))
    }

    function handleClickOutside(e) {
        if (selectRef.current.contains(e.target)) {
            return
        }
        setIsOpen(false)
    }

    useEffect(() => {
        document.addEventListener('click', handleClickOutside)
        return () => {
            document.removeEventListener('click', handleClickOutside)
        }
    })

    return (
        <SelectStyle {...props} onClick={() => setIsOpen(!isOpen)} ref={selectRef}>
            {availableLanguages[currentLanguage]}
            <SelectOptions open={isOpen}>
                <div
                    key={currentLanguage}
                    data-language={currentLanguage}
                    onClick={handleLanguageChange}
                >
                    {availableLanguages[currentLanguage]}
                </div>
                {Object.keys(availableLanguages)
                    .filter((x) => x !== currentLanguage)
                    .map((language) => (
                        <div key={language} data-language={language} onClick={handleLanguageChange}>
                            {availableLanguages[language]}
                        </div>
                    ))}
            </SelectOptions>
        </SelectStyle>
    )
}
