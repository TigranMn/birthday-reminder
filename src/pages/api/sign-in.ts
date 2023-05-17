import User from '@/models/userModel'
import connectMongo from '@/utils/connectMongo'
import { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import process from 'process'
// refactor
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    if (req.method !== 'POST') throw { status: 500, message: 'Only POST requests allowed' }

    await connectMongo()
    const user = await User.findOne({ email: req.body.username })

    if (!user) throw { status: 404, message: 'User not found' }

    if (!bcrypt.compareSync(req.body.password, user.password))
      throw { status: 400, message: 'Invalid password' }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...finalUser } = user._doc

    res.status(200).json({
      name: finalUser.fullName,
      token: token,
      email: finalUser.email,
      _id: finalUser._id.toString()
    })
  } catch (e: any) {
    res.status(e.status || 500).send(e.message || 'Something went wrong')
  }
}
