import toast from 'react-hot-toast'
import { useTranslation } from 'react-i18next'
import { twMerge } from 'tailwind-merge'

interface CodeBlock {
    children: string
    notCopyable?: boolean
}

export default function CodeBlock({ children, notCopyable = false }: CodeBlock) {
    const { t } = useTranslation()

    const handleCopy = async () => {
        navigator.clipboard
            ?.writeText(children)
            .then(() => toast.success(t('copiedToClipboard')))
            .catch(() => toast.error(t('clipboardCopyError')))
    }

    const commonClasses = twMerge(
        'font-mono p-1.5 rounded leading-5 text-sm whitespace-pre-wrap',
        'bg-gray-500 border border-gray-600 text-color-400'
    )

    return !notCopyable ? (
        <button
            className={twMerge(
                commonClasses,
                'select-none',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blurple-400 focus-visible:bg-gray-400 hover:bg-gray-400',
                'transition-all duration-200 ease-out'
            )}
            onClick={handleCopy}
        >
            {children}
        </button>
    ) : (
        <code className={twMerge(commonClasses, 'block w-fit')}>{children}</code>
    )
}
