import Company from '@/components/pages/Companies/Company'
import AddCompany from '@/components/shared/AddCompany'
import React from 'react'

export default function Companies() {
  return (
    <div className='dark:text-darkDefault text-default flex flex-wrap gap-8 justify-between'>
      <Company />
      <Company />
      <Company />
      <AddCompany />
    </div>
  )
}
