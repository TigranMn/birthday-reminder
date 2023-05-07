import { register } from '@/api/register'
import Input from '@/components/shared/Input'
import useDidMountEffect from '@/hooks/useDidMount'
import { TFinalUser } from '@/types/types'
import { validateConfirmPassword, validateFormItem } from '@/utils/validateFormItem'
import { useRouter } from 'next/router'
import React, { FormEvent, useRef, useState } from 'react'
import { signUpFields } from '../consts'
import Header from '../Header'

export default function SignUp() {
  const [form, setForm] = useState(signUpFields)
  const [loading, setLoading] = useState(false)
  const formRef = useRef<HTMLFormElement>(null)
  const router = useRouter()

  const handleClick = () => {
    router.push('sign-in')
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setForm((prev) => {
      return prev.map((el) => {
        const inputName = el.name
        const value = formRef.current![inputName].value
        if (el.name === 'confirm-password')
          el.error = validateConfirmPassword(value, formRef.current!['password'].value)
        else el.error = validateFormItem(inputName, el.labelText, value)
        el.value = value
        return el
      })
    })
  }

  useDidMountEffect(async () => {
    if (form.some((el) => el.error)) return
    const currForm: TFinalUser = form.reduce((accm, curr) => {
      return { ...accm, [curr['name']]: curr.value }
    }, {} as TFinalUser)
    setLoading(true)
    const res = await register({
      email: currForm.email,
      password: currForm.password,
      fullName: currForm.firstName + ' ' + currForm.lastName
    })

    if (res.ok) {
      router.push('/sign-in')
    } else {
      setForm((prev) => {
        return prev.map((el) => {
          if (el.name === 'email') el.error = res.messages.email
          return el
        })
      })
    }
    setLoading(false)
  }, [form])

  return (
    <>
      <Header
        handleClick={handleClick}
        heading={'Create an account'}
        text={'Already have an account '}
        btnText={'Sign In'}
      />
      <form
        noValidate
        autoComplete='off'
        ref={formRef}
        className=' space-y-6 max-w-lg m-auto px-4 text-default dark:text-darkDefault'
        onSubmit={handleSubmit}>
        {form.map((el) => {
          return (
            <Input
              key={el.id}
              labelText={el.labelText}
              labelFor={el.labelFor}
              id={el.id}
              name={el.name}
              type={el.type}
              isRequired={el.isRequired}
              placeholder={el.placeholder}
              className={
                'bg-primary dark:bg-darkPrimary border-secondary dark:border-darkSecondary placeholder-gray-500 text-default dark:text-darkDefault focus:outline-none focus:ring-purple-500 focus:border-purple-500'
              }
              error={el.error}
            />
          )
        })}
        <button
          disabled={loading}
          type='submit'
          className='relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-default hover:text-primary bg-primary hover:bg-secondary dark:bg-darkDefault hover:dark:bg-darkPrimary mt-10'>
          {loading ? 'Loading...' : 'Sign Up'}
        </button>
      </form>
    </>
  )
}
