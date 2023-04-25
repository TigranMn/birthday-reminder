import React from 'react'

export default function AddCompany() {
  return (
    <div className=' bg-primary dark:bg-darkPrimary min-w-[200px] min-h-[150px] md:min-w-[250px] md:min-h-[200px] flex grow justify-center items-center rounded-sm cursor-pointer hover:opacity-50'>
      <div className='bg-gray-400 dark:bg-darkDefault rounded-full relative min-w-[100px] min-h-[100px] md:min-w-[150px] md:min-h-[150px]'>
        <div className='absolute top-1/4 bottom-1/4 left-[48px] md:left-[72px] w-1 md:w-2 bg-primary dark:bg-darkPrimary'></div>
        <div className='absolute left-1/4 right-1/4 top-[48px] md:top-[70px] h-1 md:h-2 bg-primary dark:bg-darkPrimary'></div>
      </div>
    </div>
  )
}
