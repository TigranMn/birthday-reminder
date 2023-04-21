import { useState } from 'react'
import Dropdown from './Dropdown'
import Settings from './Settings'
export default function SideMenus() {
  const [menu, setMenu] = useState('')

  return (
    <div className='flex gap-6'>
      <Dropdown icon='lnr-cog' name='settings' menu={menu} setMenu={setMenu}>
        <Settings />
      </Dropdown>
      <Dropdown icon='lnr-user' name='account' menu={menu} setMenu={setMenu}>
        <Settings />
      </Dropdown>
    </div>
  )
}
