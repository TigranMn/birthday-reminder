import { TInput } from '@/components/shared/Input'

export const signInFields: TInput[] = [
  {
    labelText: 'Email address',
    labelFor: 'email-address',
    id: 'email-address',
    name: 'email',
    type: 'email',
    isRequired: true,
    placeholder: 'Email address',
    error: '',
    value: ''
  },
  {
    labelText: 'Password',
    labelFor: 'password',
    id: 'password',
    name: 'password',
    type: 'password',
    isRequired: true,
    placeholder: 'Password',
    error: '',
    value: ''
  }
]

export const signUpFields: TInput[] = [
  {
    labelText: 'Email address',
    labelFor: 'email-address',
    id: 'email-address',
    name: 'email',
    type: 'email',
    isRequired: true,
    placeholder: 'Email address',
    error: '',
    value: ''
  },
  {
    labelText: 'First Name',
    labelFor: 'firstName',
    id: 'firstName',
    name: 'firstName',
    type: 'text',
    isRequired: true,
    placeholder: 'First name',
    error: '',
    value: ''
  },
  {
    labelText: 'Last Name',
    labelFor: 'lastName',
    id: 'lastName',
    name: 'lastName',
    type: 'text',
    isRequired: true,
    placeholder: 'Last name',
    error: '',
    value: ''
  },
  {
    labelText: 'Password',
    labelFor: 'password',
    id: 'password',
    name: 'password',
    type: 'password',
    isRequired: true,
    placeholder: 'Password',
    error: '',
    value: ''
  },
  {
    labelText: 'Confirm Password',
    labelFor: 'confirm-password',
    id: 'confirm-password',
    name: 'confirm-password',
    type: 'password',
    isRequired: true,
    placeholder: 'Confirm Password',
    error: '',
    value: ''
  }
]
