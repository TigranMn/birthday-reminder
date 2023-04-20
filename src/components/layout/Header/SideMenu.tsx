import Icon from '@/components/shared/Icon'
import { useState } from 'react'
export default function SideMenu() {
    const [menu, setMenu] = useState('')

    const handleUserMenuClick = () => {
        setMenu((curr) => {
            if (curr === 'user') return ''
            return 'user'
        })
    }

    const handleSettingMenuClick = () => {
        setMenu((curr) => {
            if (curr === 'settings') return ''
            return 'settings'
        })
    }

    return (
        <div className='flex gap-6'>
            <Icon
                className={`${menu === 'settings' ? 'text-secondary dark:text-darkSecondary' : ''}`}
                onClick={handleSettingMenuClick}
                icon={'lnr-cog'}
            />
            <Icon
                className={`${menu === 'user' ? 'text-secondary dark:text-darkSecondary' : ''}`}
                onClick={handleUserMenuClick}
                icon={'lnr-user'}
            />
        </div>
    )
}
