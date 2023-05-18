import Company from '@/models/companyModel'
import Employee from '@/models/employeeModel'
import User from '@/models/userModel'
import { TCompany, TEmployee } from '@/types/types'
import connectMongo from '@/utils/connectMongo'
import { sendEmail } from '@/utils/sendEmail'
import { NextApiRequest, NextApiResponse } from 'next'
import process from 'process'

type TBirthdayEmployee = TEmployee & { age: number }

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await connectMongo()
    const toNotify: any = {}
    const employees = (await Employee.find()) as TBirthdayEmployee[]
    const today = new Date()
    const day = today.getDate()
    const month = today.getMonth() + 1
    const year = today.getFullYear()

    const todaysBirthdays = employees.reduce((accm, curr) => {
      const date = new Date(curr.birthday)
      const employeeYear = date.getFullYear()
      if (date.getDate() === day && date.getMonth() + 1 === month) {
        //@ts-ignore
        return [...accm, { ...curr._doc, age: year - employeeYear }]
      }
      return accm
    }, [] as TBirthdayEmployee[])

    for (const birthday of todaysBirthdays) {
      const user = (await User.findOne({ _id: birthday.userId })) as {
        email: string
        fullName: string
      }
      const company = (await Company.findOne({ _id: birthday.companyId })) as TCompany
      const notificationInfo = {
        username: user.fullName,
        jubilee: birthday.fullName,
        jubileeAge: birthday.age,
        jubileeCompany: company.name
      }
      type toNotifyKey = keyof typeof toNotify
      const iterator: toNotifyKey = user.email
      if (!toNotify[iterator]) {
        toNotify[iterator] = [notificationInfo]
      } else {
        toNotify[iterator] = [...toNotify[iterator], notificationInfo]
      }
    }

    for (const user in toNotify) {
      for (const jubilee of toNotify[user]) {
        const { username, jubileeName, companyName, age } = jubilee

        const mailOptions = {
          from: `${process.env.MAIL_ORG}" <${process.env.MAIL_USERNAME}>`,
          to: user,
          subject: 'Birthday remainder',
          text: `Hi, ${username}, today is the birthday of your employee ${jubileeName} that works in ${companyName}, he is now ${age} years old`,
          html: `Hi, <b>${username}</b>, today is the birthday of your employee <b>${jubileeName}</b> that works in <b>${companyName}</b>, he is now <i>${age}</i> years old`
        }

        await sendEmail(req, res, mailOptions)
      }
    }
    res.status(200).send('Emails has been sent')
  } catch (e: any) {
    res.status(500).json({ error: 1, message: e.message })
  }
}
