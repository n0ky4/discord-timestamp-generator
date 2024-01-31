import { Transition } from '@headlessui/react'
import { X } from '@phosphor-icons/react'
import {
    ForwardRefExoticComponent,
    Fragment,
    PropsWithChildren,
    RefAttributes,
    forwardRef,
    useEffect,
} from 'react'
import { useTranslation } from 'react-i18next'
import { twMerge } from 'tailwind-merge'
import IconButton from '../Button/IconButton'

interface ModalProps {
    children: React.ReactNode
    show: boolean
    onClose: () => void
}

interface ModalComponent
    extends ForwardRefExoticComponent<ModalProps & RefAttributes<HTMLDivElement>> {
    Header: typeof ModalHeader
    Content: typeof ModalContent
    Footer: typeof ModalFooter
}

interface ModalHeaderProps {
    title: string
    hideCloseButton?: boolean
    onClose?: () => void
}

interface ModalContentProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode
}

function ModalHeader({ title, hideCloseButton = false, onClose }: ModalHeaderProps) {
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

function ModalContent({ children, className, ...rest }: ModalContentProps) {
    return (
        <div className={twMerge('px-4 py-6', className)} {...rest}>
            {children}
        </div>
    )
}

function ModalFooter({ children }: PropsWithChildren) {
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

        document.addEventListener('keydown', handleEscape)

        return () => document.removeEventListener('keydown', handleEscape)
    }, [onClose])

    return (
        <Transition.Root
            show={show}
            className='fixed z-50 w-screen h-screen flex items-center justify-center p-4'
            as='div'
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
}) as ModalComponent

Modal.displayName = 'Modal'
Modal.Header = ModalHeader
Modal.Content = ModalContent
Modal.Footer = ModalFooter

export default Modal
