import { useAppDispatch, useAppSelector } from '@/redux/hooks'
import { setUser } from '@/redux/slices/userSlice'
import { useSession } from 'next-auth/react'
import { ReactNode, useEffect } from 'react'

type WrapperProps = {
  children: ReactNode
}

export default function Wrapper({ children }: WrapperProps) {
  const session = useSession()
  const dispatch = useAppDispatch()
  const userId = useAppSelector((state) => state.user._id)

  useEffect(() => {
    if (session.data?.user && !userId) {
      dispatch(setUser(session.data?.user!))
    }
  }, [session])

  return <div className='pt-24 px-8 md:px-24 '>{children}</div>
}
