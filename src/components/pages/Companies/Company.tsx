import { changeCompanyName } from '@/api/changeCompanyName'
import { deleteCompany } from '@/api/deleteCompany'
import Heading from '@/components/shared/Heading/Heading'
import Icon from '@/components/shared/Icon'
import InputErrorMessage from '@/components/shared/InputErrorMessage'
import SaveCancel from '@/components/shared/SaveCancel'
import { useToast } from '@/hooks/useToast'
import { useAppSelector } from '@/redux/hooks'
import { NotificationVariants, TCompany } from '@/types/types'
import { useRouter } from 'next/router'
import React, { useEffect, useRef, useState } from 'react'
import { DotLoader } from 'react-spinners'

export default function Company({ name, employeesCount, _id }: Omit<TCompany, 'userId'>) {
  const [editName, setEditName] = useState(false)
  const [inputError, setInputError] = useState('')
  const [loading, setLoading] = useState(false)
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const toast = useToast()
  const editRef = useRef<HTMLDivElement>(null)
  const user = useAppSelector((state) => state.user)
  const router = useRouter()

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      const target = e.target as Element
      if (editRef.current && !editRef.current.contains(target)) setEditName(false)
    }

    window.addEventListener('mousedown', handleClick)

    return () => window.removeEventListener('mousedown', handleClick)
  }, [editRef])

  useEffect(() => {
    if (inputRef.current) inputRef.current.focus()
  }, [editName])

  const handleSave = async (e: any) => {
    e.stopPropagation()
    if (inputRef.current?.value.trim().length! > 56) {
      setInputError('Cant be longer than 56 characters')
      return
    }
    if (!inputRef.current?.value.trim().length) {
      setInputError('Fill the name')
      return
    }
    setLoading(true)
    const res = await changeCompanyName(_id, user.token!, inputRef.current?.value!)
    if (res.name) {
      router.push(router.asPath)
      setEditName(false)
    } else {
      toast(NotificationVariants.ERROR, res)
    }
    setInputError('')
    setLoading(false)
  }

  const handleDelete = async (e: any) => {
    e.stopPropagation()
    setLoading(true)
    const response = await deleteCompany(_id, user.token!)
    if (response.ok) {
      router.push(router.asPath)
    }
    setLoading(false)
  }

  const handleEdit = (e: any) => {
    e.stopPropagation()
    setEditName(true)
  }

  const handleCancelEdit = (e: any) => {
    e.stopPropagation()
    setEditName(false)
  }

  return (
    <div
      onClick={() => router.push(`/companies/${_id}`)}
      className={`relative bg-primary py-2 px-4 dark:bg-darkPrimary min-w-[250px] min-h-[150px] max-w-[250px] md:max-w-[300px] md:min-w-[300px] md:min-h-[200px] grow flex justify-start rounded-sm cursor-pointer flex-col ${
        editName ? 'cursor-default' : 'hover:bg-opacity-70 '
      }`}>
      {!loading ? (
        <>
          <Heading
            className='border-b-default break-all group pb-4 dark:border-b-darkDefault border-b mb-4 flex justify-between items-center'
            tag={'h4'}>
            {editName ? (
              <>
                {loading && <DotLoader className='m-auto' color='#4f46e5' />}
                <div ref={editRef} className='flex justify-between relative'>
                  <textarea
                    className='w-3/4 outline-none pl-2 bg-primary max-h-max'
                    ref={inputRef}
                    defaultValue={name}
                  />
                  <InputErrorMessage text={inputError} className='top-full left-2' />
                  <SaveCancel handleCancel={handleCancelEdit} handleSave={handleSave} />
                </div>
              </>
            ) : (
              <>
                {name}
                <Icon
                  onClick={handleEdit}
                  icon='lnr-pencil'
                  wh='w-4 h-4'
                  className='transform  md:opacity-0 group-hover:opacity-100 shrink-0 duration-300 hover:text-secondary dark:hover:text-darkSecondary'
                />
              </>
            )}
          </Heading>
          <span>Employees: {employeesCount}</span>
          <Icon
            onClick={handleDelete}
            icon='lnr-trash'
            wh='w-4 h-4'
            className='text-secondary absolute bottom-2 right-2 hover:text-red-400'
          />
        </>
      ) : (
        <DotLoader className='m-auto' color='#4f46e5' />
      )}
    </div>
  )
}
