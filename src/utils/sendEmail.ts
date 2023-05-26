import { NextApiRequest, NextApiResponse } from 'next'
import nodemailer from 'nodemailer'
import process from 'process'

type TMailOptions = {
  from: string
  to: string
  text: string
  html: string
}

export const sendEmail = async (
  req: NextApiRequest,
  res: NextApiResponse,
  mailOptions: TMailOptions
): Promise<void> => {
  try {
    const transporter = nodemailer.createTransport({
      //@ts-ignore
      service: 'gmail',
      secure: true,
      auth: {
        type: 'OAuth2',
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD,
        clientId: process.env.OAUTH_CLIENT_ID,
        clientSecret: process.env.OAUTH_SECRET,
        refreshToken: process.env.OAUTH_REFRESH_TOKEN
      }
    })
    await transporter.sendMail(mailOptions)
  } catch (e: any) {
    console.log(e.message)
    res.status(500).json({ error: 1, message: e.message })
  }
}
