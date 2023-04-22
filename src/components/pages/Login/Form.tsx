import Input, { TInput } from '@/components/shared/Input'
import React, { FormEvent, useRef } from 'react'

type TForm = {
  formData: TInput[]
  activeForm: string
}

export default function Form({ formData, activeForm }: TForm) {
  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    console.log(formRef.current)
  }

  return (
    <form
      autoComplete='off'
      ref={formRef}
      className=' space-y-6 max-w-lg m-auto px-4'
      onSubmit={handleSubmit}>
      <div>
        {formData.map((el) => {
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
            />
          )
        })}
      </div>
      <button
        type='submit'
        className='group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 mt-10'>
        {activeForm === 'signIn' ? 'Sign In' : 'Sign Up'}
      </button>
    </form>
  )
}
