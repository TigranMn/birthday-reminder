import AddEmployeeModal from '@/components/pages/SingleCompanyPage/AddEmployeeModal'
import EmployeeCard from '@/components/pages/SingleCompanyPage/EmployeeCard'
import Heading from '@/components/shared/Heading/Heading'
import Icon from '@/components/shared/Icon'
import Company from '@/models/companyModel'
import Employee from '@/models/employeeModel'
import { TCompany, TEmployee } from '@/types/types'
import connectMongo from '@/utils/connectMongo'
import { GetServerSideProps } from 'next'
import React, { useState } from 'react'

export const getServerSideProps: GetServerSideProps<{ company: TCompany }> = async (context) => {
  await connectMongo()
  const { cid } = context.query
  let company
  let employees
  try {
    company = await Company.findOne({ _id: cid })
    employees = await Employee.find({ companyId: cid })
  } catch (e) {
    return {
      redirect: {
        destination: '/companies',
        permanent: false
      }
    }
  }

  return {
    props: {
      company: JSON.parse(JSON.stringify(company)),
      employees: JSON.parse(JSON.stringify(employees))
    }
  }
}

export default function SingleCompanyPage({
  company,
  employees
}: {
  company: TCompany
  employees: TEmployee[]
}) {
  const [addModal, setAddModal] = useState(false)

  return (
    <div className='flex flex-col gap-8'>
      <div className='flex flex-col border-b-2 border-b-secondary'>
        <Heading tag={'h2'}>{company.name}</Heading>
        <div className='flex'>
          <p className='pb-2 grow'>Employees count: {company.employeesCount}</p>
          <Icon
            onClick={() => setAddModal(true)}
            icon='lnr-plus-circle'
            className='text-secondary hover:opacity-50'
          />
        </div>
      </div>
      <div className='flex gap-4'>
        {employees.map((el) => {
          return (
            <EmployeeCard
              key={el._id}
              companyId={el.companyId}
              _id={el._id}
              fullName={el.fullName}
              birthday={el.birthday}
              position={el.position}
              email={el.email}
            />
          )
        })}
      </div>
      <AddEmployeeModal
        show={addModal}
        onOutsideClick={() => setAddModal(false)}
        setAddModal={setAddModal}
      />
    </div>
  )
}
