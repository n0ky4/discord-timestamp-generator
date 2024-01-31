interface LabelProps extends React.HTMLAttributes<HTMLLabelElement> {
    children: React.ReactNode
}

export default function Label({ children, ...rest }: LabelProps) {
    return (
        <label className='block uppercase font-bold text-color-500 select-none text-xs' {...rest}>
            {children}
        </label>
    )
}
