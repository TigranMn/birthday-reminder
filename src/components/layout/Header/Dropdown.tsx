import Icon from '@/components/shared/Icon'
import React, { Dispatch, SetStateAction } from 'react'
import DropdownMenu from './DropdownMenu'

type DropdownProps = {
  menu: string
  setMenu: Dispatch<SetStateAction<string>>
  name: string
  icon: string
  children: React.ReactNode
}

export default function Dropdown({ menu, setMenu, name, icon, children }: DropdownProps) {
  const isOpened = menu === name
  const handleMenuClick = () => {
    setMenu((curr) => {
      if (curr === name) return ''
      return name
    })
  }

  return (
    <div className='items-center flex relative'>
      <Icon
        className={`relative ${isOpened ? 'text-secondary dark:text-darkSecondary' : ''}`}
        onClick={handleMenuClick}
        icon={icon}
      />
      {isOpened ? <DropdownMenu>{children}</DropdownMenu> : null}
    </div>
  )
}
