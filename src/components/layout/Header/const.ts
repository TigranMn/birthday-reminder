type NavBarItem = {
    href: string
    exact: boolean
    text: string
    id: string
}

export const NavBarItems: NavBarItem[] = [
    {
        href: '/',
        exact: true,
        text: 'Home',
        id: 'home'
    },
    {
        href: 'companies',
        exact: false,
        text: 'My Companies',
        id: 'companies'
    },
    {
        href: '/birthdays',
        exact: false,
        text: 'All Birthdays',
        id: 'birthdays'
    }
]
