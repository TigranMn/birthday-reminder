import Company from '@/models/companyModel'
import { TCompany, TMongoDoc } from '@/types/types'
import connectMongo from '@/utils/connectMongo'
import { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'
import process from 'process'

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const userId = req.body.userId
  const token = req.body.token
  let decoded
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET!)
  } catch (e) {
    res.status(500).send(e.message)
    return
  }

  if (decoded.id !== userId) {
    res.status(403).json({ error: 403, message: 'Forbidden' })
    return
  }

  if (req.method === 'POST') {
    createCompany(req, res)
    return
  }
}

async function createCompany(req: NextApiRequest, res: NextApiResponse) {
  await connectMongo()
  const company: TMongoDoc & TCompany = await Company.create({ ...req.body, employeesCount: 0 })
  const { _id, userId, name, employeesCount } = company
  res.status(200).json({ userId, name, _id, employeesCount })
}
