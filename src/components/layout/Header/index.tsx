import Logo from './Logo'
import NavItems from './NavItems'
import SideMenus from './SideMenus/SideMenus'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { saveSettings } from '@/redux/slices/settingsSlice'
import { useAppSelector } from '@/redux/hooks'
import { useRouter } from 'next/router'

export default function Header() {
  const dispatch = useDispatch()
  const { asPath } = useRouter()
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
      {asPath !== '/login' ? <NavItems /> : null}
      <SideMenus />
    </div>
  )
}
