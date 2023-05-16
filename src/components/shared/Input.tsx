import { ChangeEvent } from 'react'

export type TInput = {
  labelText: string
  labelFor: string
  id?: string
  name: string
  type?: string
  isRequired?: boolean
  placeholder?: string
  className?: string
  error?: string | null
  value?: string
  labelClassName?: string
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

export default function Input({
  labelText,
  labelFor,
  labelClassName,
  id,
  name,
  type = 'text',
  isRequired = false,
  placeholder,
  className,
  error,
  onChange
}: TInput) {
  return (
    <>
      <label htmlFor={labelFor} className={labelClassName}>
        {labelText}
      </label>
      <input
        id={id}
        onChange={onChange}
        name={name}
        type={type}
        required={isRequired}
        className={`rounded-md appearance-none  relative block w-full px-3 py-2 border focus:z-10 sm:text-sm ${className}`}
        placeholder={placeholder}
        onClick={type === 'date' ? (e) => e.preventDefault() : undefined}
      />
      <span className='text-xs text-red-500 absolute top-full'>{error}</span>
    </>
  )
}
