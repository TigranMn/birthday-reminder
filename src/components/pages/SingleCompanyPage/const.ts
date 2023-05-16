type AddEmployeeFormFieldAttributes = {
  name: string
  labelFor: string
  labelText: string
  id: string
  type: string
}

export const addEmployeeFormFields: AddEmployeeFormFieldAttributes[] = [
  {
    name: 'name',
    labelText: 'Name',
    labelFor: 'name',
    id: 'name',
    type: 'text'
  },
  {
    name: 'position',
    labelText: 'Position',
    labelFor: 'position',
    id: 'position',
    type: 'text'
  },
  {
    name: 'email',
    labelText: 'Email',
    labelFor: 'email',
    id: 'email',
    type: 'text'
  },
  {
    name: 'birthdate',
    labelText: 'Birthdate',
    labelFor: 'birthdate',
    id: 'birthdate',
    type: 'date'
  }
]
