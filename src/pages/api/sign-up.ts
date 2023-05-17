import User from '@/models/userModel'
import connectMongo from '@/utils/connectMongo'
import { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcrypt'
// refactor
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Only POST requests allowed' })
    return
  }
  try {
    await connectMongo()
    const isAlreadyRegistered = !!(await User.findOne({ email: req.body.email }))

    if (isAlreadyRegistered) {
      res.status(409).json({ error: 1, messages: { email: 'Email already in use' } })
      return
    }
    const encrypted = await bcrypt.hash(req.body.password, 5)
    await User.create({ ...req.body, password: encrypted })
    res.json({ success: true })
  } catch (error: any) {
    res.status(500).json({ error: 1, message: error.message })
  }
}
