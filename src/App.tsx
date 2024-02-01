import { GearSix, Info } from '@phosphor-icons/react'
import moment from 'moment'
import { useEffect, useRef, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import IconButton from './components/Button/IconButton'
import CodeBlock from './components/CodeBlock'
import Disclaimer from './components/Disclaimer'
import Input from './components/Input'
import Label from './components/Label'
import AboutModal from './components/Modal/AboutModal'
import ConfigModal from './components/Modal/ConfigModal'
import Timestamp from './components/Timestamp'
import { DateFormat, DateFormatPart, useDateFormat } from './context/dateFormat'
import { Contributor, getContributors } from './util/contributors'
import { DISCORD_FORMATS } from './util/timestamp'

interface AllValidParts {
    YYYY: number
    MM: number
    DD: number
    hh: number
    mm: number
    ss: number
}

// validate input value
const validate = (value: number | null, type: DateFormatPart) => {
    if (value === null) return false
    if (type === 'MM' && (value < 1 || value > 12)) return false
    if (type === 'DD' && (value < 1 || value > 31)) return false
    if (type === 'hh' && (value < 0 || value > 23)) return false
    if ((type === 'mm' || type === 'ss') && (value < 0 || value > 59)) return false
    return true
}

function App() {
    const { t } = useTranslation()
    const [showCfgModal, setShowCfgModal] = useState(false)
    const [showAboutModal, setShowAboutModal] = useState(false)
    const [contributors, setContributors] = useState<Contributor[]>([])

    const [date, setDate] = useState(new Date())
    const { dateFormat, defaultDateFormat } = useDateFormat()

    // refs for each input
    const refs: Record<DateFormatPart, React.MutableRefObject<HTMLInputElement | null>> = {
        YYYY: useRef<HTMLInputElement | null>(null),
        MM: useRef<HTMLInputElement | null>(null),
        DD: useRef<HTMLInputElement | null>(null),
        hh: useRef<HTMLInputElement | null>(null),
        mm: useRef<HTMLInputElement | null>(null),
        ss: useRef<HTMLInputElement | null>(null),
    }

    // get all input elements
    const getElements = (): Record<DateFormatPart, number | null> => {
        const allEmpty = Object.values(refs).every((ref) => !ref.current?.value)
        if (allEmpty)
            return {
                YYYY: null,
                MM: null,
                DD: null,
                hh: null,
                mm: null,
                ss: null,
            }
        return {
            YYYY: refs.YYYY.current?.value
                ? parseInt(refs.YYYY.current?.value)
                : new Date().getFullYear(),
            MM: refs.MM.current?.value
                ? parseInt(refs.MM.current?.value)
                : new Date().getMonth() + 1,
            DD: refs.DD.current?.value ? parseInt(refs.DD.current?.value) : new Date().getDate(),
            hh: refs.hh.current?.value ? parseInt(refs.hh.current?.value) : 0,
            mm: refs.mm.current?.value ? parseInt(refs.mm.current?.value) : 0,
            ss: refs.ss.current?.value ? parseInt(refs.ss.current?.value) : 0,
        }
    }

    // check if all inputs are valid
    const elementsValid = (elements: ReturnType<typeof getElements>) => {
        return Object.entries(elements).every(([type, value]) => {
            return validate(value, type as DateFormatPart)
        })
    }

    // when input changes, update date
    const handleInputChange = () => {
        const elements = getElements()
        if (!elementsValid(elements)) return

        const { YYYY, MM, DD, hh, mm, ss } = elements as AllValidParts
        const newDate = new Date(YYYY, MM - 1, DD, hh, mm, ss)
        if (isNaN(newDate.getTime())) return

        setDate(newDate)
    }

    const mapDateFormat = (dateFormat: DateFormat) => {
        return dateFormat
            .split('-')
            .map((format) => (
                <Input
                    key={format}
                    onChange={handleInputChange}
                    placeholder={t(format)}
                    ref={refs[format as DateFormatPart]}
                />
            ))
    }

    // if any input is invalid, set date to current date
    useEffect(() => {
        getContributors().then((data) => setContributors(data))
        const task = () => {
            const elements = getElements()
            if (!elementsValid(elements)) {
                const newDate = new Date()
                setDate(newDate)
            }
        }
        task()

        const interval = setInterval(task, 100)
        return () => clearInterval(interval)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <>
            <AboutModal
                show={showAboutModal}
                onClose={() => setShowAboutModal(false)}
                contributors={contributors}
            />
            <ConfigModal show={showCfgModal} onClose={() => setShowCfgModal(false)} />
            <div className='relative w-full max-w-screen-lg mx-auto px-4 min-h-screen'>
                <nav className='py-6'>
                    <div className='flex items-center justify-between'>
                        <h1 className='text-2xl sm:text-3xl lg:text-4xl font-bold text-color-300 select-none'>
                            Discord Timestamp Generator
                        </h1>
                        <div className='flex items-center gap-2'>
                            <IconButton
                                onClick={() => setShowCfgModal(true)}
                                aria-label={t('settings')}
                                title={t('settings')}
                                aria-haspopup
                            >
                                <GearSix size={24} weight='fill' />
                            </IconButton>
                            <IconButton
                                onClick={() => setShowAboutModal(true)}
                                aria-label={t('about')}
                                title={t('about')}
                                aria-haspopup
                            >
                                <Info size={24} weight='fill' />
                            </IconButton>
                        </div>
                    </div>
                    <p className='max-w-lg text-md sm:text-lg'>{t('description')}</p>
                </nav>
                <main className='flex flex-col gap-10'>
                    <div>
                        <Label>{t('date')}</Label>
                        <div className='flex gap-2 w-full flex-col sm:items-center sm:flex-row'>
                            {dateFormat === 'auto'
                                ? mapDateFormat(defaultDateFormat)
                                : mapDateFormat(dateFormat)}
                        </div>
                        <p className='mt-1'>
                            {t('unixTimestamp')}: {moment(date).unix()}
                        </p>
                    </div>
                    <div>
                        <Label>{t('generatedTimestamps')}</Label>
                        <p>{t('instructions')}</p>
                        <div className='flex flex-col gap-1 mt-2'>
                            {DISCORD_FORMATS.map((format) => (
                                <div key={format || 'none'} className='flex items-center gap-2'>
                                    <CodeBlock>{`<t:${moment(date).unix()}${
                                        format ? `:${format}` : ''
                                    }>`}</CodeBlock>
                                    <div className='w-2 h-[2px] rounded-full bg-gray-100' />
                                    <Timestamp d={date} format={format} />
                                </div>
                            ))}
                        </div>
                    </div>
                </main>
                <Disclaimer />
            </div>
            <Toaster
                toastOptions={{
                    // using style cause tailwind classes doesn't work for some reason
                    style: {
                        background: '#2b2d31',
                        color: '#f2f3f5',
                        border: '1px solid #3f4147',
                        userSelect: 'none',
                    },
                    error: {
                        iconTheme: {
                            primary: '#ed4245',
                            secondary: 'white',
                        },
                    },
                    success: {
                        iconTheme: {
                            primary: '#5468ff',
                            secondary: 'white',
                        },
                    },
                }}
            />
        </>
    )
}

export default App
