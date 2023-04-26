import { useAppDispatch } from '@/redux/hooks'
import { addCompany } from '@/redux/slices/companiesSlice'
import { validateCompanyInput } from '@/utils/validateCompanyInput'
import React, { useEffect, useRef, useState } from 'react'
import InputErrorMessage from './InputErrorMessage'
import SaveCancel from './SaveCancel'

export default function AddCompany() {
  const dispatch = useAppDispatch()
  const [add, setAdd] = useState(false)
  const [inputError, setInputError] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const addRef = useRef<HTMLDivElement>(null)
  const [loading, setLoading] = useState(false)
  // eslint-disable-next-line no-unused-vars
  const [error, setError] = useState('')

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as Element
      if (addRef.current && !addRef.current.contains(target)) setAdd(false)
    }

    window.addEventListener('mousedown', handleClick)

    return () => window.removeEventListener('mousedown', handleClick)
  }, [addRef])

  useEffect(() => {
    if (textareaRef.current) textareaRef.current.focus()
  }, [add])

  const handleSave = async () => {
    const error = validateCompanyInput(textareaRef.current?.value!)
    if (error) {
      setInputError(error)
      textareaRef.current?.focus()
      return
    }
    setLoading(true)
    try {
      await dispatch(addCompany({ name: textareaRef.current?.value!, userId: 'dasfsd' }))
      setError('')
    } catch (e) {
      setError('da')
    }
    setLoading(false)
    setAdd(false)
    setInputError('')
  }

  return add ? (
    <div
      ref={addRef}
      className='relative bg-primary min-w-[250px] md:min-w-[300px] min-h-[150px] md:min-h-[200px] rounded-sm px-4 flex flex-col items-center'>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <textarea
            ref={textareaRef}
            placeholder='Enter the name of your company'
            className='outline-none bg-primary pb-6 text-center'
          />
          <InputErrorMessage text={inputError} className='block' />
          <SaveCancel handleCancel={() => setAdd(false)} handleSave={handleSave} />
        </>
      )}
    </div>
  ) : (
    <div
      onClick={() => setAdd(true)}
      className=' bg-primary dark:bg-darkPrimary min-w-[250px] max-w-[250px] min-h-[150px] md:min-w-[300px] md:max-w-[200px] md:min-h-[200px] flex grow justify-center items-center rounded-sm cursor-pointer hover:opacity-50'>
      <div className='bg-gray-400 dark:bg-darkDefault rounded-full relative min-w-[100px] min-h-[100px] md:min-w-[126px] md:min-h-[126px]'>
        <div className='absolute top-1/4 bottom-1/4 left-[48px] md:left-[60px] w-1 md:w-2 bg-primary dark:bg-darkPrimary'></div>
        <div className='absolute left-1/4 right-1/4 top-[48px] md:top-[58px] h-1 md:h-2 bg-primary dark:bg-darkPrimary'></div>
      </div>
    </div>
  )
}
