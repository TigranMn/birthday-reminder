import { deleteEmployee } from '@/api/deleteEmployee'
import Icon from '@/components/shared/Icon'
import { useAppSelector } from '@/redux/hooks'
import { getAge } from '@/utils/getAge'
import { getBirthdayDate } from '@/utils/getBirthdayDate'
import { useRouter } from 'next/router'
import React, { useMemo } from 'react'
import EmployeeInfoField from './EmployeeInfoField'

type EmployeeCardProps = {
  fullName: string
  birthday: string
  position: string
  _id: string
  email: string
  companyId: string
}

export default function EmployeeCard({
  fullName,
  birthday,
  position,
  _id,
  email,
  companyId
}: EmployeeCardProps) {
  const token = useAppSelector((state) => state.user.token)
  const router = useRouter()

  const birthdate = useMemo(() => {
    return getBirthdayDate(birthday)
  }, [birthday])

  const age = useMemo(() => {
    return getAge(new Date(birthday))
  }, [birthdate])

  const handleDelete = async () => {
    const response = await deleteEmployee(_id!, companyId, token!)
    if (response.ok) {
      router.push(router.asPath)
    }
  }

  // const handleEdit = () => {}

  return (
    <div className='rounded-lg flex flex-col gap-2 px-6 py-4 bg-primary cursor-pointer relative group hover:bg-opacity-50'>
      <EmployeeInfoField label='Name' value={fullName} />
      <EmployeeInfoField label='Birthday' value={birthdate} />
      <EmployeeInfoField label='Age' value={age} />
      <EmployeeInfoField label='Position' value={position} />
      <EmployeeInfoField label='Email' value={email} />
      <Icon
        onClick={handleDelete}
        icon='lnr-cross-circle'
        className='absolute -top-2 -left-2 text-red-400 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 hover:scale-110'
        wh='w-6 h-6'
      />
      {/* <Icon
        onClick={handleEdit}
        icon='lnr-pencil'
        className='absolute -top-2 -right-2 text-secondary opacity-0 group-hover:opacity-100 transition-all duration-500 hover:scale-110 '
        wh='w-6 h-6'
      /> */}
    </div>
  )
}
