import { deleteEmployee } from '@/api/deleteEmployee'
import Icon from '@/components/shared/Icon'
import { useAppSelector } from '@/redux/hooks'
import { useRouter } from 'next/router'
import React from 'react'
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

  const handleDelete = async () => {
    const response = await deleteEmployee(_id!, companyId, token!)
    if (response.ok) {
      router.push(router.asPath)
    }
  }
  return (
    <div className='rounded-lg flex flex-col gap-2 px-6 py-4 bg-primary relative group'>
      <EmployeeInfoField label='Name' value={fullName} />
      <EmployeeInfoField label='Birthday' value={birthday} />
      <EmployeeInfoField label='Age' value={birthday} />
      <EmployeeInfoField label='Position' value={position} />
      <EmployeeInfoField label='Email' value={email} />
      <Icon
        onClick={handleDelete}
        icon='lnr-cross-circle'
        className='absolute -top-2 -left-2 text-red-400 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500'
        wh='w-6 h-6'
      />
    </div>
  )
}
