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
