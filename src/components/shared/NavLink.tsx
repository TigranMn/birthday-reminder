import { useRouter } from 'next/router'
import Link from 'next/link'

type NavLinkProps = {
  href: string
  exact?: boolean
  text: string
  activeClassName?: string
  className?: string
}

export default function NavLink({
  href,
  exact,
  text,
  activeClassName,
  className,
  ...props
}: NavLinkProps) {
  const { pathname } = useRouter()

  const isActive = exact ? href === pathname : pathname.includes(href)
  return (
    <Link
      className={`cursor-pointer text-center block h-full w-full py-4 ${className} ${
        isActive ? activeClassName : ''
      }`}
      href={href}
      {...props}>
      {text}
    </Link>
  )
}
