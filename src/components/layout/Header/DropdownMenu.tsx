import React from 'react'
type DropdownMenuProps = {
  children: React.ReactNode
}

export default function DropdownMenu({ children }: DropdownMenuProps) {
  return (
    <div className='relative'>
      <div className='overflow-x-hidden rounded-md text-default max-w-[128px] dark:text-darkDefault flex  min-w-full absolute top-14 -right-2 bg-primary dark:bg-darkPrimary '>
        {children}
      </div>
      <div className="absolute dark:border-b-darkPrimary top-12 right-1 border-l-8 border-b-primary border-l-transparent border-r-transparent border-r-8 border-b-8 w-0'"></div>
    </div>
  )
}
