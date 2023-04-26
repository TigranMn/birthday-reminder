import Company from '@/components/pages/Companies/Company'
import AddCompany from '@/components/shared/AddCompany'
import { useAppSelector } from '@/redux/hooks'
import React from 'react'

export default function Companies() {
  const companies = useAppSelector((state) => state.companies.companies)
  return (
    <div className='dark:text-darkDefault text-default flex flex-wrap justify-between gap-8'>
      {companies.map((el) => {
        return (
          <Company key={el._id} name={el.name} employeesCount={el.employeesCount} _id={el._id} />
        )
      })}
      <AddCompany />
    </div>
  )
}
