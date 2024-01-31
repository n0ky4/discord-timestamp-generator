import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useDateFormat } from '../context/dateFormat'
import Button from './Button'
import DateFormatSelect from './DateFormatSelect'
import Label from './Label'
import LanguageSelect from './LanguageSelect'
import Modal, { ModalContent, ModalFooter, ModalHeader } from './Modal'
import ThemeSelect from './ThemeSelect'

interface ConfigModalProps {
    show: boolean
    onClose: () => void
}

export default function ConfigModal({ show, onClose }: ConfigModalProps) {
    const { t } = useTranslation()
    const configModalRef = useRef<HTMLDivElement | null>(null)
    const { dateFormat, setDateFormat } = useDateFormat()

    const shakeModal = () => {
        const modal = configModalRef.current
        if (!modal) return

        modal.classList.add('animate-shake')
        setTimeout(() => modal.classList.remove('animate-shake'), 500)
    }

    return (
        <Modal show={show} onClose={onClose} ref={configModalRef}>
            <ModalHeader title={t('settings')} onClose={onClose} />
            <ModalContent className='flex flex-col gap-4'>
                <div>
                    <Label>{t('language')}</Label>
                    <LanguageSelect />
                </div>
                <div>
                    <Label>{t('theme')}</Label>
                    <ThemeSelect onLightThemeIsBad={shakeModal} />
                </div>
                <div>
                    <Label>{t('dateFormat')}</Label>
                    <DateFormatSelect value={dateFormat} onChange={setDateFormat} />
                </div>
            </ModalContent>
            <ModalFooter>
                <Button theme='gray' onClick={onClose}>
                    {t('close')}
                </Button>
            </ModalFooter>
        </Modal>
    )
}
