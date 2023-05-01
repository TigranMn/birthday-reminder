import { NextApiRequest, NextApiResponse } from 'next'
import jwt from 'jsonwebtoken'
import process from 'process'
import Company from '@/models/companyModel'
import { ObjectId } from 'mongodb'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { cid } = req.query
  const token = req.headers.authorization

  try {
    const userId = jwt.verify(token!, process.env.JWT_SECRET!)
    const company = await Company.findOne({
      userId: new ObjectId(userId.id),
      _id: new ObjectId(cid as string)
    })

    if (!company) {
      res.status(404).send('Not found')
      return
    }
    await Company.deleteOne({ _id: new ObjectId(cid as string) })
  } catch (e) {
    res.status(400).send(e.message)
  }
  res.status(200).json('Deleted')
}
