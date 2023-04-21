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

export type SettingsItemOption = {
  name: string
  id: number
}

export const languagesOptions: SettingsItemOption[] = [
  {
    name: 'English',
    id: 0
  },
  {
    name: 'Armenian',
    id: 1
  }
]

export const themesOptions: SettingsItemOption[] = [
  {
    name: 'Dark',
    id: 0
  },
  {
    name: 'Light',
    id: 1
  },
  {
    name: 'Detect',
    id: 2
  }
]
