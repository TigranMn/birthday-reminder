import { getSession } from 'next-auth/react'
import React from 'react'
import SignUp from '../components/pages/Login/SignUp'
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

export default function SignUpPage() {
  return <SignUp />
}
