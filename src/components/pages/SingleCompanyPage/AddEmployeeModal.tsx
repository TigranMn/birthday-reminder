import { addEmployee } from '@/api/addEmployee'
import Input from '@/components/shared/Input'
import SaveCancel from '@/components/shared/SaveCancel'
import { useOnClickOutside } from '@/hooks/useOnClickOutside'
import { useAppSelector } from '@/redux/hooks'
import { useRouter } from 'next/router'
import React, { ChangeEvent, Dispatch, FormEvent, SetStateAction, useRef, useState } from 'react'
import { addEmployeeFormFields } from './const'

type AddEmployeeModalProps = {
  onOutsideClick: (event: Event) => void
  setAddModal: Dispatch<SetStateAction<boolean>>
  show: boolean
}

type TAddEmployeeFormFields = {
  name: string
  email: string
  position: string
  birthdate: string
}

export default function AddEmployeeModal({
  onOutsideClick,
  setAddModal,
  show
}: AddEmployeeModalProps) {
  const [formFields, setFormFields] = useState<TAddEmployeeFormFields>({} as TAddEmployeeFormFields)
  const modalBoxRef = useRef<HTMLDivElement>(null)
  useOnClickOutside(modalBoxRef, onOutsideClick)
  const router = useRouter()
  const { cid } = router.query
  const userId = useAppSelector((state) => state.user._id)
  const userToken = useAppSelector((state) => state.user.token)

  const handleChange = (e: ChangeEvent<HTMLInputElement>, field: string) => {
    setFormFields((prev: TAddEmployeeFormFields) => {
      const iterator = field as keyof TAddEmployeeFormFields
      return { ...prev, [iterator]: e.target.value }
    })
  }

  const handleCancel = () => {
    setFormFields({} as TAddEmployeeFormFields)
    setAddModal(false)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    await addEmployee(
      formFields.name,
      cid as string,
      formFields.birthdate,
      formFields.email,
      formFields.position,
      userId!,
      userToken!
    )
    router.push(router.asPath)
    setAddModal(false)
    setFormFields({} as TAddEmployeeFormFields)
  }
  return show ? (
    <form
      onSubmit={handleSubmit}
      className='absolute top-0 bottom-0 left-0 right-0 bg-black bg-opacity-50 flex'>
      <div
        ref={modalBoxRef}
        className='m-auto bg-primary flex flex-col gap-4 p-8  rounded-xl border-2 border-secondary min-w-[300px] md:min-w-[500px]'>
        {addEmployeeFormFields.map(({ labelText, labelFor, name, id, type }) => {
          return (
            <div className='w-full' key={id}>
              <Input
                className='w-full'
                id={id}
                labelText={labelText}
                labelFor={labelFor}
                name={name}
                type={type}
                onChange={(e) => handleChange(e, name)}
                isRequired
              />
            </div>
          )
        })}
        <button className='m-auto' type='submit'>
          <SaveCancel handleCancel={handleCancel} />
        </button>
      </div>
    </form>
  ) : null
}
