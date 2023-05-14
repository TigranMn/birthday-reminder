export type TFinalUser = {
  firstName: string
  lastName: string
  password: string
  email: string
}

export type TCompany = {
  _id: string
  name: string
  employeesCount: number
  userId: string
}

export type TMongoDoc = {
  _id: string
  _v: number
}
export type TSessionUser = {
  name: string
  email: string
  token: string
  _id: string
}

export type TSession = {
  user: TSessionUser
  expires: string
}

export type TSessionToken = {
  name: string
  email: string
  user: TSessionUser
}

export type TEmployee = {
  userId: string
  _id: string
  fullName: string
  birthday: string
  email: string
  companyId: string
  position: string
}

export enum NotificationVariants {
  'WARNING' = 'warn',
  'ERROR' = 'error',
  'SUCCESS' = 'success'
}
