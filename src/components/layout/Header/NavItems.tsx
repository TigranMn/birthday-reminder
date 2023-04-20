import NavLink from '@/components/shared/NavLink'

export default function NavItems() {
    return (
        <ul className='flex justify-around grow'>
            <li>
                <NavLink activeClassName='text-indigo-600' href='/' exact text='Home' />
            </li>
            <li>
                <NavLink
                    activeClassName='text-indigo-600'
                    href='/companies'
                    exact
                    text='My Companies'
                />
            </li>
            <li>
                <NavLink
                    activeClassName='text-indigo-600'
                    href='/birthdays'
                    exact
                    text='All Birthdays'
                />
            </li>
        </ul>
    )
}
