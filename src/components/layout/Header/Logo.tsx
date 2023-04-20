import Image from 'next/image'
import { useRouter } from 'next/router'

export default function Logo() {
    const router = useRouter()
    return (
        <Image
            onClick={() => router.push('/')}
            className='bg-primary dark:bg-darkPrimary cursor-pointer'
            src={'/images/logo.png'}
            width={100}
            height={180}
            alt='logo'
        />
    )
}
