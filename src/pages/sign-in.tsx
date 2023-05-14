import { getSession } from 'next-auth/react'
import SignIn from '../components/pages/Login/SignIn'
//@ts-ignore
export const getServerSideProps = async (context) => {
  const session = await getSession(context)
  if (session?.user._id) {
    return {
      redirect: {
        destination: '/companies',
        permanent: false
      }
    }
  }
  return { props: {} }
}

export default function SignInPage() {
  return <SignIn />
}
