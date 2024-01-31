import { twMerge } from 'tailwind-merge'

interface IconButtonProps extends React.HTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode
    onlyIcon?: boolean
}

export default function IconButton({
    children,
    className,
    onlyIcon = false,
    ...rest
}: IconButtonProps) {
    return (
        <button
            className={twMerge(
                'w-8 h-8 inline-flex items-center justify-center leading-0',
                'transition-all ease-out',
                'text-color-500 hover:text-white focus:text-white text-color rounded-md',
                'focus:outline-none focus:ring-2 focus:ring-white/75',
                onlyIcon ? 'duration-200' : 'duration-100 hover:bg-white/15',
                className
            )}
            {...rest}
        >
            {children}
        </button>
    )
}
