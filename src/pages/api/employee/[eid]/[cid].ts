import { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'
import process from 'process'
import { ObjectId } from 'mongodb'
import Employee from '@/models/employeeModel'
import Company from '@/models/companyModel'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = req.headers.authorization
  const { eid, cid } = req.query
  try {
    const userId = jwt.verify(token!, process.env.JWT_SECRET!) as { id: string }
    const employee = await Employee.findOne({
      userId: new ObjectId(userId.id),
      _id: new ObjectId(eid as string)
    })
    if (!employee) throw { status: 404, message: 'Not Found' }

    if (req.method === 'DELETE') {
      await Employee.deleteOne({ _id: new ObjectId(eid as string) })
      await Company.updateOne(
        { _id: new ObjectId(cid as string) },
        { $inc: { employeesCount: -1 } }
      )
      return res.status(200).send('Deleted')
    }
  } catch (e: any) {
    res.status(e.status || 500).send(e.message || 'Something went wrong')
  }
}
