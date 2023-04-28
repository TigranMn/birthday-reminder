import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

export default function Account() {
  const { data: session } = useSession()
  const router = useRouter()

  const handleSignOut = async () => {
    await signOut({ redirect: false })
    router.push('/sign-in')
  }

  return (
    <ul className='flex flex-col gap-4 p-2 min-w-[128px]'>
      {!session?.user ? (
        <>
          <Link href={'/sign-in'} className='hover:text-secondary dark:hover:text-darkSecondary'>
            Sign in
          </Link>
          <Link href={'/sign-up'} className='hover:text-secondary dark:hover:text-darkSecondary'>
            Sign Up
          </Link>{' '}
        </>
      ) : (
        <>
          <p className='text-center border-b-secondary border-b'>{session.user.name}</p>
          <button
            onClick={handleSignOut}
            className='hover:text-secondary dark:hover:text-darkSecondary'>
            Sign Out
          </button>
        </>
      )}
    </ul>
  )
}
