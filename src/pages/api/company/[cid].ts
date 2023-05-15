import { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'
import process from 'process'
import Company from '@/models/companyModel'
import { ObjectId } from 'mongodb'
import Employee from '@/models/employeeModel'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { cid } = req.query
  const token = req.headers.authorization

  try {
    const userId = jwt.verify(token!, process.env.JWT_SECRET!) as { id: string }
    const company = await Company.findOne({
      userId: new ObjectId(userId.id),
      _id: new ObjectId(cid as string)
    })
    if (!company) throw { status: 404, message: 'Not Found' }

    if (req.method === 'DELETE') {
      await Company.deleteOne({ _id: new ObjectId(cid as string) })
      await Employee.deleteMany({ companyId: new ObjectId(cid as string) })
      return res.status(200).send('Deleted')
    }

    if (req.method === 'PATCH') {
      if (!req.body.name) throw { status: 400, message: 'Name must be provided' }

      await Company.updateOne(
        { _id: new ObjectId(cid as string) },
        { $set: { name: req.body.name } }
      )
      return res.status(200).json({ name: req.body.name })
    }
  } catch (e: any) {
    res.status(e.status || 500).send(e.message || 'Something went wrong')
  }
}
