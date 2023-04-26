import User from '@/models/userModel'
import connectMongo from '@/utils/connectMongo'
import { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import process from 'process'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Only POST requests allowed' })
    return
  }

  try {
    await connectMongo()
    const user = await User.findOne({ email: req.body.email })
    if (!user) {
      res.status(404).json({ error: 404, message: 'User not found' })
      return
    }
    if (!bcrypt.compareSync(req.body.password, user.password)) {
      res.status(400).json({ error: 400, message: 'Invalid password' })
      return
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!)
    // eslint-disable-next-line no-unused-vars
    const { password, ...finalUser } = user._doc
    res.setHeader('Authorization', token)
    res.json(finalUser)
  } catch (error: any) {
    res.json({ error: 1, message: error.message })
  }
  return
}
