import { twMerge } from 'tailwind-merge'

const themes = {
    burple: 'bg-blurple-400 hover:bg-blurple-500 text-color-300',
    gray: 'bg-gray-200 hover:bg-gray-100 text-color-300',
} as const
export type ButtonTheme = keyof typeof themes

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode
    theme?: ButtonTheme
}

export default function Button({ children, className, theme = 'burple', ...rest }: ButtonProps) {
    const themeClass = themes[theme]

    return (
        <button
            className={twMerge(
                'inline-flex items-center justify-center px-4 py-2',
                'font-medium rounded-md',
                'transition-all duration-200 ease-out',
                'focus:outline-none focus:ring-2 focus:ring-white/75',
                themeClass,
                className
            )}
            {...rest}
        >
            {children}
        </button>
    )
}
