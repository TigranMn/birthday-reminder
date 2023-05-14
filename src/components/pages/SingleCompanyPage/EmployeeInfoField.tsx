import React from 'react'

type TEmployeeInfoField = {
  label: string
  value: string | number
}

export default function EmployeeInfoField({ label, value }: TEmployeeInfoField) {
  return (
    <div>
      <span className='mr-2'>{label}:</span>
      <span>{value}</span>
    </div>
  )
}
