import { useEffect, useState } from 'react'
import { signInFields, signupFields } from './consts'
import Form from './Form'
import Header from './Header'

export default function Login() {
  const [activeForm, setActiveForm] = useState<'signIn' | 'signUp'>('signIn')
  const [formData, setFormData] = useState(signInFields)

  useEffect(() => {
    if (activeForm === 'signIn') setFormData(signInFields)
    else setFormData(signupFields)
  }, [activeForm])

  return (
    <>
      <Header activeForm={activeForm} setActiveForm={setActiveForm} />
      <Form activeForm={activeForm} formData={formData} />
    </>
  )
}
