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

      const mailOptions = {
        from: `${process.env.MAIL_ORG}" <${process.env.MAIL_USERNAME}>`,
        to: user.email,
        subject: 'Birthday remainder',
        text: `Hi, ${user.fullName}, today is the birthday of your employee ${birthday.fullName} that works in ${company.name}, he is now ${birthday.age} years old`,
        html: `Hi, <b>${user.fullName}</b>, today is the birthday of your employee <b>${birthday.fullName}</b> that works in <b>${company.name}</b>, he is now <i>${birthday.age}</i> years old`
      }
      await sendEmail(req, res, mailOptions)
    }
  } catch (e: any) {
    res.status(500).json({ error: 1, message: e.message })
  }
}
