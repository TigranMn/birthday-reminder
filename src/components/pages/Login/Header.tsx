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
    <div className='mb-10'>
      <Heading tag={'h2'} className='mt-6 text-center text-3xl font-extrabold text-gray-900'>
        {isSignIn ? 'Login to your account' : 'Create an account'}
      </Heading>
      <p className='mt-2 text-center text-sm text-gray-600'>
        {isSignIn ? 'Dont have an account yet?' : 'Already have an account>'}{' '}
        <span onClick={handleClick} className='font-medium text-purple-600 hover:text-purple-500'>
          {isSignIn ? 'Sign Up' : 'Sign In'}
        </span>
      </p>
    </div>
  )
}
