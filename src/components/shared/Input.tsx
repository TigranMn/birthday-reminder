export type TInput = {
  labelText: string
  labelFor: string
  id?: string
  name: string
  type: string
  isRequired?: boolean
  placeholder: string
  className?: string
}

export default function Input({
  labelText,
  labelFor,
  id,
  name,
  type,
  isRequired = false,
  placeholder,
  className
}: TInput) {
  return (
    <div className='mt-5'>
      <label htmlFor={labelFor} className='sr-only'>
        {labelText}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={isRequired}
        className={`rounded-md appearance-none relative block w-full px-3 py-2 border border-secondary dark:border-darkSecondary placeholder-gray-500 text-default dark:text-darkDefault focus:outline-none focus:ring-purple-500 focus:border-purple-500 focus:z-10 sm:text-sm ${className}`}
        placeholder={placeholder}
      />
    </div>
  )
}
