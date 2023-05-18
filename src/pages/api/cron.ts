import User from '@/models/userModel'
import connectMongo from '@/utils/connectMongo'
import { NextApiRequest, NextApiResponse } from 'next'

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
  try {
    await connectMongo()
    await User.create({
      email: 'cron@mail.ru',
      password: 'cronjob',
      fullName: 'Cron Cronovich'
    })
    res.json({ success: true })
  } catch (error: any) {
    res.status(500).json({ error: 1, message: error.message })
  }
}
