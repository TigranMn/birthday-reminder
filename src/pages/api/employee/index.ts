import connectMongo from '@/utils/connectMongo'
import { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'
import process from 'process'
import { TEmployee, TMongoDoc } from '@/types/types'
import Employee from '@/models/employeeModel'
import Company from '@/models/companyModel'
import { ObjectId } from 'mongodb'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { companyId, userId, token } = req.body

  let decoded
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string }

    if (decoded.id !== userId) throw { status: 403, message: 'Forbidden' }
    if (req.method === 'POST') {
      addEmployee(req, res)
      await Company.updateOne(
        { _id: new ObjectId(companyId as string) },
        { $inc: { employeesCount: 1 } }
      )
      return
    }
  } catch (e: any) {
    res.status(e.status || 500).send(e.message || 'Something went wrong')
  }
}

async function addEmployee(req: NextApiRequest, res: NextApiResponse) {
  await connectMongo()
  const employee: TMongoDoc & TEmployee = await Employee.create({ ...req.body })

  const { _id, fullName, birthday, position, email, userId } = employee as TEmployee
  res.status(200).json({ fullName, _id, birthday, position, email, userId })
}
