import { useEffect, useRef, useState } from 'react'
import BurgerMenu from './BurgerMenu'
import Dropdown from '../Dropdown'
import Settings from './Settings'
import Account from './Account'
export default function SideMenus() {
  const [menu, setMenu] = useState('')
  const ref = useRef<any>(null)

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target)) setMenu('')
    }

    window.addEventListener('mousedown', handleClick)

    return () => window.removeEventListener('mousedown', handleClick)
  }, [ref])

  return (
    <div ref={ref} className='flex gap-6'>
      <Dropdown icon='lnr-cog' name='settings' menu={menu} setMenu={setMenu}>
        <Settings />
      </Dropdown>

      <>
        <Dropdown icon='lnr-user' name='account' menu={menu} setMenu={setMenu}>
          <Account />
        </Dropdown>
        <BurgerMenu name='burger' menu={menu} setMenu={setMenu} />
      </>
    </div>
  )
}
