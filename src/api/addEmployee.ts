import axios from 'axios'

export const addEmployee = async (
  fullName: string,
  companyId: string,
  birthday: string,
  email: string,
  position: string,
  userId: string,
  token: string
) => {
  try {
    const res = await axios.post('/api/employee', {
      fullName,
      companyId,
      birthday,
      email,
      position,
      userId,
      token
    })
    return res.data
  } catch (e) {
    return e
  }
}
