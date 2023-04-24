export type TInput = {
  labelText: string
  labelFor: string
  id?: string
  name: string
  type: string
  isRequired?: boolean
  placeholder: string
  className?: string
  error: string | null
}

export default function Input({
  labelText,
  labelFor,
  id,
  name,
  type,
  isRequired = false,
  placeholder,
  className,
  error
}: TInput) {
  return (
    <div className='my-5 flex flex-col'>
      <label htmlFor={labelFor} className='sr-only'>
        {labelText}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={isRequired}
        className={`rounded-md appearance-none  relative block w-full px-3 py-2 border focus:z-10 sm:text-sm ${className}`}
        placeholder={placeholder}
      />
      <span className='text-sm text-red-500'>{error}</span>
    </div>
  )
}
