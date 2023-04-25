import Link from 'next/link'
import React from 'react'

export default function Account() {
  return (
    <ul className='flex flex-col gap-4 p-2 min-w-[128px]'>
      <Link href={'/sign-in'} className='hover:text-secondary dark:hover:text-darkSecondary'>
        Sign in
      </Link>
      <Link href={'/sign-up'} className='hover:text-secondary dark:hover:text-darkSecondary'>
        Sign Up
      </Link>
    </ul>
  )
}
