import { twMerge } from 'tailwind-merge'

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
    children: React.ReactNode
}

export default function Link({ children, className, ...props }: LinkProps) {
    return (
        <a
            className={twMerge('font-bold hover:underline', className)}
            target='_blank'
            rel='noopener noreferrer'
            {...props}
        >
            {children}
        </a>
    )
}
