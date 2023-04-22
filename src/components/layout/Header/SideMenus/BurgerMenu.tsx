import Icon from '@/components/shared/Icon'
import NavLink from '@/components/shared/NavLink'
import React, { Dispatch, SetStateAction } from 'react'
import { navBarItems } from '../const'

type BurgerMenuProps = {
  setMenu: Dispatch<SetStateAction<string>>
  name: string
  menu: string
}

export default function BurgerMenu({ setMenu, name, menu }: BurgerMenuProps) {
  const isOpened = menu === name
  const handleClick = () => {
    setMenu((curr) => {
      if (curr === name) return ''
      return name
    })
  }

  return (
    <>
      <Icon onClick={handleClick} className='block md:hidden' icon='lnr-menu' />
      <div
        style={isOpened ? { left: 0 } : undefined}
        className={
          'md:hidden fixed -left-full top-16 bottom-0 bg-primary dark:bg-darkPrimary w-44 transition-all duration-300 flex justify-center items-center'
        }>
        <ul className='flex flex-col gap-4 '>
          {navBarItems.map(({ href, exact, text, id }) => {
            return (
              <li onClick={() => setMenu('')} key={id}>
                <NavLink
                  className='text-default  dark:text-darkDefault'
                  activeClassName='text-secondary dark:text-darkSecondary'
                  href={href}
                  exact={exact}
                  text={text}
                />
              </li>
            )
          })}
        </ul>
      </div>
    </>
  )
}
