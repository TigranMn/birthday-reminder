import Heading from '@/components/shared/Heading/Heading'
import React, { Dispatch, SetStateAction } from 'react'

type HeaderProps = {
  activeForm: string
  setActiveForm: Dispatch<SetStateAction<'signIn' | 'signUp'>>
}

export default function Header({ activeForm, setActiveForm }: HeaderProps) {
  const isSignIn = activeForm === 'signIn'

  const handleClick = () => {
    if (isSignIn) setActiveForm('signUp')
    else setActiveForm('signIn')
  }
  return (
    <div className='mb-10 text-default dark:text-darkDefault'>
      <Heading tag={'h2'} className='mt-6 text-center text-3xl font-extrabold '>
        {isSignIn ? 'Login to your account' : 'Create an account'}
      </Heading>
      <p className='mt-2 text-center text-sm'>
        {isSignIn ? 'Dont have an account yet?' : 'Already have an account>'}{' '}
        <button
          onClick={handleClick}
          className='font-medium underline text-default hover:text-secondary dark:text-darkDefault hover:dark:text-darkSecondary'>
          {isSignIn ? 'Sign Up' : 'Sign In'}
        </button>
      </p>
    </div>
  )
}
