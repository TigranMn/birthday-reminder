import { useRouter } from 'next/router'
import React, { FormEvent, useRef, useState } from 'react'
import Header from '../Header'
import { signInFields } from '../consts'
import Input from '@/components/shared/Input'
import { validateFormItem } from '@/utils/validateFormItem'
import useDidMountEffect from '@/hooks/useDidMount'
import { useAppDispatch } from '@/redux/hooks'
import { signIn } from '@/redux/slices/userSlice'

export default function SignIn() {
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState(signInFields)
  const router = useRouter()
  const formRef = useRef<HTMLFormElement>(null)
  const dispatch = useAppDispatch()

  const handleClick = () => {
    router.push('/sign-up')
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setForm((prev) => {
      return prev.map((el) => {
        const inputName = el.name
        const value = formRef.current![inputName].value
        el.error = validateFormItem(inputName, el.labelText, value)
        el.value = value
        return el
      })
    })
  }

  useDidMountEffect(() => {
    if (form.some((el) => el.error)) return
    setLoading(true)
    const currForm: { email: string; password: string } = form.reduce((accm, curr) => {
      return { ...accm, [curr['name']]: curr.value }
    }, {} as { email: string; password: string })

    dispatch(signIn({ email: currForm.email, password: currForm.password }))
      .unwrap()
      .catch((res) => {
        if (res.error === 404)
          setForm((prev) => {
            return prev.map((el) => {
              if (el.name === 'email') el.error = res.message
              return el
            })
          })
        if (res.error === 400)
          setForm((prev) => {
            return prev.map((el) => {
              if (el.name === 'password') el.error = res.message
              return el
            })
          })
      })
    setLoading(false)
  }, [form])
  return (
    <>
      <Header
        heading='Sign in to your account'
        text='Dont have an account yet? '
        btnText='Sign Up'
        handleClick={handleClick}
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
          {' '}
          {loading ? 'Loading...' : 'Sing in'}
        </button>
      </form>
    </>
  )
}
