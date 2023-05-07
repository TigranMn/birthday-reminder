import Company from '@/models/companyModel'
import { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'
import process from 'process'
import { TCompany } from '@/types/types'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'GET') throw { status: 405, message: 'Only GET requests allowed' }
    const token = req.headers.authorization!

    const user = jwt.verify(token, process.env.JWT_SECRET!) as { id: string }
    const companies: TCompany[] = await Company.find({ userId: user.id })

    res.status(200).json(companies)
  } catch (e: any) {
    res.status(e.status || 500).send(e.message || 'Something went wrong')
  }
}
