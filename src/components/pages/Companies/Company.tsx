import Heading from '@/components/shared/Heading/Heading'
import Icon from '@/components/shared/Icon'
import React from 'react'

export default function Company() {
  return (
    <div className='bg-primary py-2 px-4 dark:bg-darkPrimary min-w-[200px] min-h-[150px] md:min-w-[250px] md:min-h-[200px] grow flex justify-start rounded-sm cursor-pointer hover:opacity-50 flex-col'>
      <Heading
        className='border-b-default group pb-2 dark:border-b-darkDefault border-b mb-4 flex justify-between items-center'
        tag={'h4'}>
        <span>Mamble</span>
        <Icon
          icon='lnr-pencil'
          wh='w-4 h-4'
          className='transform opacity-0 group-hover:opacity-100 duration-300 hover:text-secondary dark:hover:text-darkSecondary'
        />
      </Heading>
      <span>Employees: 42</span>
    </div>
  )
}
