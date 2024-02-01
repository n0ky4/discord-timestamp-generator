import { useTranslation } from 'react-i18next'
import { Contributor } from '../../util/contributors'
import Button from '../Button/Button'
import Contributors from '../Contributors'
import Label from '../Label'
import Link from '../Link'
import Modal from './Modal'

interface AboutModalProps {
    show: boolean
    onClose: () => void
    contributors: Contributor[]
}

export default function AboutModal({ show, contributors, onClose }: AboutModalProps) {
    const { t } = useTranslation()

    const author = import.meta.env.VITE_AUTHOR_NAME
    const authorUrl = import.meta.env.VITE_AUTHOR_URL
    const ghAuthor = import.meta.env.VITE_GITHUB_AUTHOR_USERNAME
    const kofiAuthor = import.meta.env.VITE_KOFI_AUTHOR_URL
    const repoUrl = import.meta.env.VITE_GITHUB_REPO_URL

    return (
        <Modal show={show} onClose={onClose}>
            <Modal.Header title={t('about')} onClose={onClose} />
            <Modal.Content className='py-0 pb-4'>
                <div className='flex items-center gap-2 py-4'>
                    <a href={authorUrl} target='_blank' rel='noreferrer noopener' title="it's me!">
                        <div
                            className='w-12 h-12 rounded-full border border-gray-300 bg-cover'
                            style={{
                                backgroundImage: `url(https://github.com/${ghAuthor}.png?size=128)`,
                            }}
                            draggable={false}
                        />
                    </a>
                    <p>
                        Made by <Link href={authorUrl}>{author}</Link>, from my heart to yours 💞
                    </p>
                </div>
                <div className='flex flex-col gap-4'>
                    <div className='flex flex-col gap-1'>
                        <p>
                            This is an open-source project! You can find the source code on this{' '}
                            <Link href={repoUrl}>GitHub repository</Link>.
                        </p>
                        <p>
                            I appreciate any translations, bug reports, feature requests, and pull
                            requests :)
                        </p>
                        <p>
                            If you found this useful and want to financially support me, you can do
                            so by{' '}
                            <Link href={kofiAuthor} className='rainbow-text'>
                                buying me a coffee!
                            </Link>{' '}
                            ☕
                        </p>
                    </div>
                    {contributors.length && (
                        <div>
                            <Label title='aka contributors/translators'>list of cool people™</Label>
                            <Contributors data={contributors} className='mt-1' />
                        </div>
                    )}
                </div>
            </Modal.Content>
            <Modal.Footer>
                <Button theme='gray' onClick={onClose}>
                    {t('close')}
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
