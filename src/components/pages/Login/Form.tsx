import Input, { TInput } from '@/components/shared/Input'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { authorize } from '@/redux/slices/userSlice'
import { validateFormItem } from '@/utils/validateFormItem'
import React, { FormEvent, useEffect, useRef, useState } from 'react'

type TForm = {
  formData: TInput[]
  activeForm: string
}

export default function Form({ formData, activeForm }: TForm) {
  const dispatch = useAppDispatch()
  const user = useAppSelector((state) => state.user)
  const [form, setForm] = useState(formData)
  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setForm((prev) => {
      return prev.map((el) => {
        const inputName = el.name
        const value = formRef.current![inputName].value
        el.error = validateFormItem(inputName, value)
        return el
      })
    })
  }

  useEffect(() => {
    if (form.some((el) => el.error)) return
    if (activeForm === 'signUp')
      dispatch(
        authorize({
          email: formRef.current!['email'].value,
          password: formRef.current!['password'].value
        })
      )
  }, [form])
  console.log(user)
  return (
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
        {activeForm === 'signIn' ? 'Sign In' : 'Sign Up'}
      </button>
    </form>
  )
}
