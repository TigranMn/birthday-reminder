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
      className={'flex w-32 flex-col list-none gap-6 p-4 transition-transform duration-500'}>
      {options.map((el) => {
        return (
          <li
            key={el.id}
            className={`hover:text-secondary hover:dark:text-darkSecondary ${
              theme === el.name.toLowerCase() ? 'bg-black' : ''
            }`}>
            <button onClick={onClick}>{el.name}</button>
          </li>
        )
      })}
    </ul>
  )
}
