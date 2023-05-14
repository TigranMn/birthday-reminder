import { Schema, model, models } from 'mongoose'

const employeeSchema = new Schema(
  {
    companyId: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    fullName: {
      type: String,
      required: true
    },
    birthday: {
      type: Date,
      required: true
    },
    position: {
      type: String,
      required: true
    },
    userId: {
      type: String,
      required: true
    }
  },
  { versionKey: false }
)

const Employee = models.Employee || model('Employee', employeeSchema)

export default Employee
