import { changeTheme } from '@/redux/slices/settingsSlice'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { languagesOptions, themesOptions } from './const'
import SettingsItemMenu from './SettingsItemMenu'
export default function Settings() {
  const dispatch = useDispatch()
  const [openedMenu, setOpenedMenu] = useState('')

  const handleThemeChange = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    const target = e.target as HTMLButtonElement

    if (target.innerHTML === 'Light') {
      localStorage.theme = 'light'
      document.documentElement.classList.remove('dark')
      dispatch(changeTheme('light'))
    } else if (target.innerHTML === 'Dark') {
      localStorage.theme = 'dark'
      document.documentElement.classList.add('dark')
      dispatch(changeTheme('dark'))
    } else {
      localStorage.removeItem('theme')
      dispatch(changeTheme(null))
    }
    setOpenedMenu('')
  }

  return (
    <>
      <ul
        className={`flex min-w-full flex-col gap-6 overflow-hidden p-4 transition-transform duration-500 ${
          openedMenu ? '-translate-x-32' : null
        }`}>
        <li
          className='hover:text-secondary hover:dark:text-darkSecondary'
          onClick={() => setOpenedMenu('languages')}>
          <button>Language</button>
        </li>
        <li
          className='hover:text-secondary hover:dark:text-darkSecondary'
          onClick={() => setOpenedMenu('themes')}>
          <button>Theme</button>
        </li>
      </ul>
      <div className='flex'>
        <SettingsItemMenu
          openedMenu={openedMenu}
          name='languages'
          options={languagesOptions}
          id={1}
          onClick={() => {}}
        />
        <SettingsItemMenu
          onClick={handleThemeChange}
          id={2}
          openedMenu={openedMenu}
          name='themes'
          options={themesOptions}
        />
      </div>
    </>
  )
}
