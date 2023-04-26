import Heading from '@/components/shared/Heading/Heading'
import Icon from '@/components/shared/Icon'
import InputErrorMessage from '@/components/shared/InputErrorMessage'
import SaveCancel from '@/components/shared/SaveCancel'
import { TCompany } from '@/types/types'
import React, { useEffect, useRef, useState } from 'react'

export default function Company({ name, employeesCount, _id }: Omit<TCompany, 'userId'>) {
  const [editName, setEditName] = useState(false)
  const [inputError, setInputError] = useState('')
  const inputRef = useRef<HTMLTextAreaElement>(null)
  const editRef = useRef<HTMLDivElement>(null)

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

  const handleSave = () => {
    if (inputRef.current?.value.length! > 56) {
      setInputError('Cant be longer than 56 characters')
      return
    }

    setEditName(false)
    setInputError('')
  }

  const handleDelete = () => {
    console.log(_id)
  }

  return (
    <div
      className={`relative bg-primary py-2 px-4 dark:bg-darkPrimary min-w-[250px] min-h-[150px] max-w-[250px] md:max-w-[300px] md:min-w-[300px] md:min-h-[200px] grow flex justify-start rounded-sm cursor-pointer flex-col ${
        editName ? 'cursor-default' : 'hover:opacity-50 '
      }`}>
      <Heading
        className='border-b-default break-all group pb-4 dark:border-b-darkDefault border-b mb-4 flex justify-between items-center'
        tag={'h4'}>
        {editName ? (
          <div ref={editRef} className='flex justify-between relative'>
            <textarea
              className='w-3/4 outline-none pl-2 bg-primary max-h-max'
              ref={inputRef}
              defaultValue={name}
            />
            <InputErrorMessage text={inputError} className='top-full left-2' />
            <SaveCancel handleCancel={() => setEditName(false)} handleSave={handleSave} />
          </div>
        ) : (
          <>
            {name}
            <Icon
              onClick={() => setEditName(true)}
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
        className='text-secondary absolute bottom-2 right-2'
      />
    </div>
  )
}
