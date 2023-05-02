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
    if (req.method === 'DELETE') await Company.deleteOne({ _id: new ObjectId(cid as string) })
    else if (req.method === 'PATCH') {
      if (!req.body.name) {
        res.status(400).send('Name must be provided')
        return
      }
      await Company.updateOne(
        { _id: new ObjectId(cid as string) },
        { $set: { name: req.body.name } }
      )
      res.status(200).json({ name: req.body.name })
      return
    }
  } catch (e) {
    res.status(400).send(e.message)
    return
  }
  res.status(200).send('Deleted')
}
