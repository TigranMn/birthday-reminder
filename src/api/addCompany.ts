import axios from 'axios'

export const addCompany = async (name: string, userId: string, token: string) => {
  try {
    const res = await axios.post('/api/company', { name, userId, token })
    return res.data
  } catch (e) {
    return e
  }
}
