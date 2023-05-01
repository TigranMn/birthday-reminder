import Company from '@/models/companyModel'
import { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'
import process from 'process'
import { TCompany } from '@/types/types'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.status(405).send({ message: 'Only GET requests allowed' })
    return
  }
  const token = req.headers.authorization!
  let user
  try {
    user = jwt.verify(token, process.env.JWT_SECRET!)
  } catch (e) {
    res.status(400).send(e.message)
    return
  }

  const companies: TCompany[] = await Company.find({ userId: user.id })
  res.status(200).json(companies)
}
