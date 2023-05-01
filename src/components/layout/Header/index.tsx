import Logo from './Logo'
import NavItems from './NavItems'
import SideMenus from './SideMenus/SideMenus'
import { useEffect } from 'react'
import { saveSettings } from '@/redux/slices/settingsSlice'
import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { useSession } from 'next-auth/react'

export default function Header() {
  const dispatch = useAppDispatch()
  const session = useSession()
  const settings = useAppSelector((state) => state.settings)

  useEffect(() => {
    const theme = localStorage.theme
    if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark')
      dispatch(saveSettings({ theme: 'dark', language: null }))
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.theme = 'light'
      dispatch(saveSettings({ theme: 'light', language: null }))
    }
  }, [settings])

  return (
    <div className='absolute top-0 left-0 right-0 flex justify-between bg-primary dark:bg-darkPrimary items-center pr-8'>
      <Logo />
      {session?.data?.user ? <NavItems /> : null}
      <SideMenus />
    </div>
  )
}
