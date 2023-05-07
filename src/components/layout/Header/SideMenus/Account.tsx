import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { clearUser } from '@/redux/slices/userSlice'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

export default function Account() {
  const user = useAppSelector((state) => state.user)
  const router = useRouter()
  const dispatch = useAppDispatch()

  const handleSignOut = async () => {
    await signOut({ redirect: false })
    dispatch(clearUser())
    router.push('/sign-in')
  }

  return (
    <ul className='flex flex-col gap-4 p-2 min-w-[128px]'>
      {!user._id ? (
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
          <p className='text-center border-b-secondary border-b'>{user.fullName}</p>
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
