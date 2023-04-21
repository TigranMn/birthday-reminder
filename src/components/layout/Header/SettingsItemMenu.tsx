import { SettingsItemOption } from './const'
import React from 'react'
import { useAppSelector } from '@/redux/hooks'

type SettingsItemMenuProps = {
  openedMenu: string
  name: string
  options: SettingsItemOption[]
  id: number
  onClick: React.MouseEventHandler<HTMLButtonElement>
}

export default function SettingsItemMenu({
  openedMenu,
  name,
  options,
  id,
  onClick
}: SettingsItemMenuProps) {
  const theme = useAppSelector((state) => state.settings.theme)
  const opened = openedMenu === name
  return (
    <ul
      style={
        opened
          ? { transform: `translateX(${-128 * id}px)`, animationDuration: 500 * id + 'ms' }
          : undefined
      }
      className={'flex w-32 flex-col list-none gap-4 p-2 transition-transform duration-500'}>
      {options.map((el) => {
        return (
          <li
            key={el.id}
            className='hover:text-secondary hover:dark:text-darkSecondary flex justify-between items-center group'>
            <button onClick={onClick}>{el.name}</button>
            {theme === el.name.toLowerCase() ? (
              <div className='w-2 h-2 rounded-full bg-default dark:bg-darkDefault group-hover:bg-secondary group-hover:dark:bg-darkSecondary'></div>
            ) : null}
          </li>
        )
      })}
    </ul>
  )
}
