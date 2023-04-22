import { TInput } from '@/components/shared/Input'

export const signInFields: TInput[] = [
  {
    labelText: 'Email address',
    labelFor: 'email-address',
    id: 'email-address',
    name: 'email',
    type: 'email',
    isRequired: true,
    placeholder: 'Email address'
  },
  {
    labelText: 'Password',
    labelFor: 'password',
    id: 'password',
    name: 'password',
    type: 'password',
    isRequired: true,
    placeholder: 'Password'
  }
]

export const signupFields: TInput[] = [
  {
    labelText: 'First Name',
    labelFor: 'firstName',
    id: 'firstName',
    name: 'firstName',
    type: 'text',
    isRequired: true,
    placeholder: 'First name'
  },
  {
    labelText: 'Last Name',
    labelFor: 'lastName',
    id: 'lastName',
    name: 'lastName',
    type: 'text',
    isRequired: true,
    placeholder: 'Last name'
  },
  {
    labelText: 'Email address',
    labelFor: 'email-address',
    id: 'email-address',
    name: 'email',
    type: 'email',
    isRequired: true,
    placeholder: 'Email address'
  },
  {
    labelText: 'Password',
    labelFor: 'password',
    id: 'password',
    name: 'password',
    type: 'password',
    isRequired: true,
    placeholder: 'Password'
  },
  {
    labelText: 'Confirm Password',
    labelFor: 'confirm-password',
    id: 'confirm-password',
    name: 'confirm-password',
    type: 'password',
    isRequired: true,
    placeholder: 'Confirm Password'
  }
]
