import { addEmployee } from '@/api/addEmployee'
import InputErrorMessage from '@/components/shared/InputErrorMessage'
import SaveCancel from '@/components/shared/SaveCancel'
import { useOnClickOutside } from '@/hooks/useOnClickOutside'
import { useAppSelector } from '@/redux/hooks'
import { useRouter } from 'next/router'
import React, { ChangeEvent, Dispatch, FormEvent, SetStateAction, useRef, useState } from 'react'

type AddEmployeeModalProps = {
  onOutsideClick: (event: Event) => void
  setAddModal: Dispatch<SetStateAction<boolean>>
  show: boolean
}

type TAddEmployeeField = {
  value: string
  error: string
}

type TAddEmployeeFormFields = {
  name: TAddEmployeeField
  email: TAddEmployeeField
  position: TAddEmployeeField
  birthday: TAddEmployeeField
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
      return { ...prev, [iterator]: { ...prev[iterator], value: e.target.value } }
    })
  }

  const handleCancel = () => {
    setFormFields({} as TAddEmployeeFormFields)
    setAddModal(false)
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    await addEmployee(
      formFields.name.value,
      cid as string,
      formFields.birthday.value,
      formFields.email.value,
      formFields.position.value,
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
        className='m-auto bg-primary flex flex-col gap-4 p-16 rounded-xl border-2 border-secondary items-center'>
        <input
          onChange={(e) => handleChange(e, 'name')}
          value={formFields?.name?.value}
          className='bg-primary pl-2 w-full border border-secondary rounded-md focus:outline-none'
          placeholder='Name'
          name='name'
          required
        />
        {formFields?.email?.error ? (
          <InputErrorMessage className='static' text={formFields?.email?.error} />
        ) : null}
        <input
          value={formFields.position?.value}
          onChange={(e) => handleChange(e, 'position')}
          className='bg-primary pl-2 w-full border border-secondary rounded-md focus:outline-none'
          placeholder='Position'
          name='position'
          required
        />
        <input
          onChange={(e) => handleChange(e, 'email')}
          value={formFields.email?.value}
          className='bg-primary pl-2 w-full border border-secondary rounded-md focus:outline-none'
          placeholder='Email'
          name='email'
          required
          type={'email'}
        />
        <input
          value={formFields.birthday?.value}
          onChange={(e) => handleChange(e, 'birthday')}
          className='bg-primary pl-2 w-full border border-secondary rounded-md focus:outline-none'
          type={'date'}
          placeholder='Enter employee name'
          name='birthday'
          required
        />
        <button type='submit'>
          <SaveCancel handleCancel={handleCancel} />
        </button>
      </div>
    </form>
  ) : null
}
