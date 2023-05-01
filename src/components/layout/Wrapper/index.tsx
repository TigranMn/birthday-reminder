import { useAppDispatch } from '@/redux/hooks'
import { clearUser, setUser } from '@/redux/slices/userSlice'
import { useSession } from 'next-auth/react'
import { ReactNode, useEffect } from 'react'

type WrapperProps = {
  children: ReactNode
}

export default function Wrapper({ children }: WrapperProps) {
  const session = useSession()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (session.data?.user) {
      dispatch(setUser(session.data?.user!))
    } else {
      dispatch(clearUser())
    }
  }, [session])

  return <div className='pt-24 px-8 md:px-24 '>{children}</div>
}
