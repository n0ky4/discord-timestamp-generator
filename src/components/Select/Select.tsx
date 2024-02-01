import { Listbox } from '@headlessui/react'
import { CaretDown } from '@phosphor-icons/react'
import { PropsWithChildren } from 'react'
import { twMerge } from 'tailwind-merge'

export function SelectButton({ children }: PropsWithChildren) {
    return (
        <Listbox.Button
            className={twMerge(
                'w-full flex items-center justify-between bg-gray-600 text-left rounded-md p-2',
                'focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:outline-none'
            )}
        >
            {children}
            <CaretDown size={26} />
        </Listbox.Button>
    )
}

export function SelectOptions({ children }: PropsWithChildren) {
    return (
        <Listbox.Options
            className={twMerge(
                'absolute w-full bg-gray-500 rounded translate-y-1 z-50',
                'border border-gray-600 shadow',
                'max-h-32 overflow-y-auto custom-scroll',
                'focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:outline-none outline-none'
            )}
        >
            {children}
        </Listbox.Options>
    )
}

interface SelectOptionProps {
    children: React.ReactNode
    value: unknown
}

export function SelectOption({ children, value }: SelectOptionProps) {
    return (
        <Listbox.Option
            className={twMerge(
                'flex items-center gap-2',
                'px-2 py-1 cursor-pointer select-none',
                'hover:bg-white/5 hover:text-white',
                'ui-active:bg-white/5 ui-active:text-white'
            )}
            value={value}
        >
            {children}
        </Listbox.Option>
    )
}
