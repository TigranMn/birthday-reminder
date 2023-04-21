import NavLink from '@/components/shared/NavLink'
import { navBarItems } from './const'

export default function NavItems() {
  return (
    <ul className='hidden justify-around grow md:flex'>
      {navBarItems.map(({ href, exact, text, id }) => {
        return (
          <li key={id}>
            <NavLink
              className='text-default  dark:text-darkDefault'
              activeClassName='text-secondary dark:text-darkSecondary'
              href={href}
              exact={exact}
              text={text}
            />
          </li>
        )
      })}
    </ul>
  )
}
