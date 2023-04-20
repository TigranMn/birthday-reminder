import Logo from './Logo'
import NavItems from './NavItems'
import SideMenu from './SideMenu'

export default function Header() {
    return (
        <div className='absolute top-0 left-0 right-0 flex justify-between bg-primary dark:bg-darkPrimary items-center pr-8'>
            <Logo />
            <NavItems />
            <SideMenu />
        </div>
    )
}
