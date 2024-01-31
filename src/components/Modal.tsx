import { Transition } from '@headlessui/react'
import { X } from '@phosphor-icons/react'
import { Fragment, PropsWithChildren, forwardRef, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { twMerge } from 'tailwind-merge'
import IconButton from './IconButton'

interface ModalProps {
    children: React.ReactNode
    show: boolean
    onClose: () => void
}

interface ModalHeaderProps {
    title: string
    hideCloseButton?: boolean
    onClose?: () => void
}

export function ModalHeader({ title, hideCloseButton = false, onClose }: ModalHeaderProps) {
    const { t } = useTranslation()

    return (
        <div className='flex items-center justify-between pt-4 px-4'>
            <h1 className='select-none font-bold text-color-300 text-2xl lg:text-3xl'>{title}</h1>
            {!hideCloseButton && (
                <div>
                    <IconButton onlyIcon onClick={onClose} aria-label={t('close')}>
                        <X size={26} weight='bold' />
                    </IconButton>
                </div>
            )}
        </div>
    )
}

interface ModalContentProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode
}
export function ModalContent({ children, className, ...rest }: ModalContentProps) {
    return (
        <div className={twMerge('px-4 py-6', className)} {...rest}>
            {children}
        </div>
    )
}

export function ModalFooter({ children }: PropsWithChildren) {
    return (
        <div className='w-full p-4 bg-gray-500 flex items-center justify-end gap-2 rounded-b-md'>
            {children}
        </div>
    )
}

const Modal = forwardRef<HTMLDivElement, ModalProps>(({ show, children, onClose }, ref) => {
    useEffect(() => {
        const handleEscape = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose()
        }

        if (show) document.addEventListener('keydown', handleEscape)

        return () => document.removeEventListener('keydown', handleEscape)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [show])

    return (
        <Transition.Root
            show={show}
            className='fixed z-50 w-screen h-screen flex items-center justify-center p-4'
            // appear={true}
        >
            <Transition.Child
                as={Fragment}
                enter='transition-all duration-300 ease-elastic'
                enterFrom='opacity-0 scale-75'
                enterTo='opacity-100 scale-100'
                leave='transition-all duration-300 ease-elastic'
                leaveFrom='opacity-100 scale-100'
                leaveTo='opacity-0 scale-75'
            >
                <div className='relative w-full max-w-md z-50 bg-gray-400 rounded-md' ref={ref}>
                    {children}
                </div>
            </Transition.Child>
            <Transition.Child
                enter='transition-opacity duration-500 linear'
                enterFrom='opacity-0'
                enterTo='opacity-100'
                leave='transition-opacity duration-500 linear'
                leaveFrom='opacity-100'
                leaveTo='opacity-0'
                className='fixed top-0 left-0 z-40 w-screen h-screen bg-black/75'
                onClick={onClose}
            />
        </Transition.Root>
    )
})
Modal.displayName = 'Modal'

export default Modal
