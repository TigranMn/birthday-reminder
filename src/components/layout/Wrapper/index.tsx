import { ReactNode } from 'react'
import { SessionProvider } from 'next-auth/react'

type WrapperProps = {
  children: ReactNode
  session: any
}

export default function Wrapper({ children, session }: WrapperProps) {
  return (
    <SessionProvider session={session}>
      <div className='pt-24 px-8 md:px-24 '>{children}</div>
    </SessionProvider>
  )
}
