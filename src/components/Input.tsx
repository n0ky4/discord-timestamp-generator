import { forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = forwardRef<HTMLInputElement, InputProps>(
    ({ className, type = 'number', ...rest }, ref) => {
        return (
            <input
                ref={ref}
                type={type}
                className={twMerge(
                    'p-2 rounded leading-5 inline-block w-full',
                    'placeholder-color-700 text-color-400 bg-gray-600 outline-none',
                    'sm:text-base text-lg',
                    'focus:ring-2 focus:ring-blurple-400',
                    'transition-shadow duration-200 ease-out',
                    className
                )}
                {...rest}
            />
        )
    }
)
Input.displayName = 'Input'

export default Input
