import Input from '@/components/shared/Input'
import useDidMountEffect from '@/hooks/useDidMount'
import { useAppDispatch } from '@/redux/hooks'
import { register } from '@/redux/slices/userSlice'
import { TFinalUser } from '@/types/types'
import { validateConfirmPassword, validateFormItem } from '@/utils/validateFormItem'
import { useRouter } from 'next/router'
import React, { FormEvent, useRef, useState } from 'react'
import { signUpFields } from '../consts'
import Header from '../Header'

export default function SignUp() {
  const dispatch = useAppDispatch()
  const [form, setForm] = useState(signUpFields)
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

  useDidMountEffect(() => {
    const currForm: TFinalUser = form.reduce((accm, curr) => {
      return { ...accm, [curr['name']]: curr.value }
    }, {} as TFinalUser)

    dispatch(
      register({
        email: currForm.email,
        password: currForm.password,
        fullName: currForm.firstName + ' ' + currForm.lastName
      })
    )
      .unwrap()
      .then(() => {
        router.push('/sign-in')
      })
      .catch((e) =>
        setForm((prev) => {
          return prev.map((el) => {
            if (el.name === 'email') el.error = e.messages.email
            return el
          })
        })
      )
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
          type='submit'
          className='relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-default hover:text-primary bg-primary hover:bg-secondary dark:bg-darkDefault hover:dark:bg-darkPrimary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 mt-10'>
          Sign Up
        </button>
      </form>
    </>
  )
}
