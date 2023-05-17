import Company from '@/components/pages/Companies/Company'
import AddCompany from '@/components/shared/AddCompany'
import React from 'react'
import { GetServerSideProps } from 'next'
import { TCompany } from '@/types/types'
import { getSession } from 'next-auth/react'
import process from 'process'
import axios from 'axios'

export const getServerSideProps: GetServerSideProps<{ companies: TCompany[] }> = async (
  context
) => {
  const session = await getSession(context)
  if (session?.user) {
    const res = await axios.get(`${process.env.NEXTAUTH_URL}/api/companies`, {
      headers: { Authorization: session.user.token }
    })
    return {
      props: { companies: res.data }
    }
  }
  return { props: { companies: [] } }
}

export default function Companies({ companies }: { companies: TCompany[] }) {
  return (
    <div className='dark:text-darkDefault text-default flex flex-wrap justify-center lg:justify-between gap-8 '>
      {companies.map((el) => {
        return (
          <Company key={el._id} name={el.name} employeesCount={el.employeesCount} _id={el._id} />
        )
      })}
      <AddCompany />
    </div>
  )
}
