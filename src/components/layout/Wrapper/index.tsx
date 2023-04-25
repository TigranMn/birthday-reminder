import { ReactNode } from 'react'

type WrapperProps = {
  children: ReactNode
}

export default function Wrapper({ children }: WrapperProps) {
  return <div className='pt-24 px-8 md:px-24 '>{children}</div>
}
