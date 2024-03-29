import { Schema, model, models } from 'mongoose'

const companySchema = new Schema(
  {
    userId: String,
    name: String,
    employeesCount: Number
  },
  {
    versionKey: false
  }
)

const Company = models.Company || model('Company', companySchema)

export default Company
