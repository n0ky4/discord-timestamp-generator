import { twMerge } from 'tailwind-merge'
import { Contributor } from '../util/contributors'

interface ContributorsProps extends React.HTMLAttributes<HTMLDivElement> {
    data: Contributor[]
}

export default function Contributors({ data, className, ...rest }: ContributorsProps) {
    return (
        <div className={twMerge('flex flex-wrap gap-2', className)} {...rest}>
            {data.map((contributor) => (
                <a
                    key={contributor.username}
                    href={contributor.url}
                    className='flex flex-col items-center gap-1'
                    target='_blank'
                    rel='noopener noreferrer'
                    title={contributor.username}
                >
                    <div
                        className='w-10 h-10 rounded-full border border-gray-300 bg-cover'
                        style={{
                            backgroundImage: `url(${contributor.avatar})`,
                        }}
                    />
                </a>
            ))}
        </div>
    )
}
