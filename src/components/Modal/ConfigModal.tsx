import { useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { useDateFormat } from '../../context/dateFormat'
import Button from '../Button/Button'
import Label from '../Label'
import DateFormatSelect from '../Select/DateFormatSelect'
import LanguageSelect from '../Select/LanguageSelect'
import ThemeSelect from '../Select/ThemeSelect'
import Modal from './Modal'

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
            <Modal.Header title={t('settings')} onClose={onClose} />
            <Modal.Content className='flex flex-col gap-4'>
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
            </Modal.Content>
            <Modal.Footer>
                <Button theme='gray' onClick={onClose}>
                    {t('close')}
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
