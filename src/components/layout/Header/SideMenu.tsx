import Icon from '@/components/shared/Icon'
import { useState } from 'react'
export default function SideMenu() {
    const [userMenu, setUserMenu] = useState(false)
    const [settingsMenu, setSettingsMenu] = useState(false)

    const handleUserMenuClick = () => {
        setSettingsMenu(false)
        setUserMenu(!userMenu)
    }

    const handleSettingMenuClick = () => {
        setUserMenu(false)
        setSettingsMenu(!settingsMenu)
    }

    return (
        <div className='flex gap-6'>
            <Icon
                className={`${settingsMenu ? 'text-indigo-600' : ''}`}
                onClick={handleSettingMenuClick}
                icon={'lnr-cog'}
            />
            <Icon
                className={`${userMenu ? 'text-indigo-600' : ''}`}
                onClick={handleUserMenuClick}
                icon={'lnr-user'}
            />
        </div>
    )
}
