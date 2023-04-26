import Company from '@/models/companyModel'
import { TCompany, TMongoDoc } from '@/types/types'
import connectMongo from '@/utils/connectMongo'
import { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'
import process from 'process'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const token = req.cookies.token
  if (!token) {
    res.status(403).json({ error: 403, message: 'Forbidden' })
    return
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET!)
  console.log(decoded)
  if (req.method === 'POST') {
    createCompany(req, res)
    return
  }
}

async function createCompany(req: NextApiRequest, res: NextApiResponse) {
  await connectMongo()
  const company: TMongoDoc & TCompany = await Company.create({ ...req.body, employeesCount: 0 })
  console.log(company)
  const { _id, userId, name, employeesCount } = company
  res.status(200).json({ userId, name, _id, employeesCount })
}
