import User from '@/models/userModel'
import connectMongo from '@/utils/connectMongo'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    res.status(405).send({ message: 'Only POST requests allowed' })
    return
  }
  try {
    await connectMongo()

    const user = await User.create(req.body)
    console.log(user)
    res.json(user)
  } catch (error) {
    console.log(error)
    res.status(500).json({ error })
  }
}
