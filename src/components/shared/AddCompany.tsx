import { useAppSelector } from '@/redux/hooks'
import { addCompany } from '@/api/addCompany'
import { validateCompanyInput } from '@/utils/validateCompanyInput'
import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'
import InputErrorMessage from './InputErrorMessage'
import SaveCancel from './SaveCancel'
import { useToast } from '@/hooks/useToast'
import { NotificationVariants } from '@/types/types'
import { DotLoader } from 'react-spinners'

export default function AddCompany() {
  const [add, setAdd] = useState(false)
  const [inputError, setInputError] = useState('')
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const addRef = useRef<HTMLDivElement>(null)
  const [loading, setLoading] = useState(false)
  // eslint-disable-next-line no-unused-vars
  const user = useAppSelector((state) => state.user)
  const router = useRouter()
  const toast = useToast()

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
    const res = await addCompany(textareaRef.current?.value!, user._id!, user.token!)
    if (res._id) {
      router.replace(router.asPath)
    } else {
      toast(NotificationVariants.ERROR, res)
    }
    setLoading(false)
    setAdd(false)
    setInputError('')
  }

  const handleCancel = () => {
    setAdd(false)
    setInputError('')
  }
  return add ? (
    <div
      ref={addRef}
      className='relative bg-primary min-w-[250px] md:min-w-[300px] min-h-[150px] md:min-h-[200px] rounded-sm px-4 flex flex-col items-center'>
      {loading ? (
        <DotLoader className='m-auto' color='#4f46e5' />
      ) : (
        <>
          <textarea
            ref={textareaRef}
            placeholder='Enter the name of your company'
            className='outline-none bg-primary pb-6 text-center'
          />
          <InputErrorMessage text={inputError} className='block top-14' />
          <SaveCancel handleCancel={handleCancel} handleSave={handleSave} />
        </>
      )}
    </div>
  ) : (
    <div
      onClick={() => setAdd(true)}
      className='group bg-primary dark:bg-darkPrimary min-w-[250px] max-w-[250px] min-h-[150px] md:min-w-[300px] md:max-w-[200px] md:min-h-[200px] flex grow justify-center items-center rounded-sm cursor-pointer hover:bg-opacity-50'>
      <div className='group-hover:bg-opacity-50 bg-gray-400 dark:bg-darkDefault rounded-full relative min-w-[100px] min-h-[100px] md:min-w-[126px] md:min-h-[126px]'>
        <div className='absolute top-1/4 bottom-1/4 left-[48px] md:left-[60px] w-1 md:w-2 bg-primary dark:bg-darkPrimary'></div>
        <div className='absolute left-1/4 right-1/4 top-[48px] md:top-[58px] h-1 md:h-2 bg-primary dark:bg-darkPrimary'></div>
      </div>
    </div>
  )
}
