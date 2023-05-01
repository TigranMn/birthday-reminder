import axios from 'axios'

export const addCompany = async (
  name: string,
  userId: string,
  token: string
): Promise<{ ok: boolean }> => {
  try {
    await axios.post('/api/company', { name, userId, token })
    return { ok: true }
  } catch (e) {
    return { ok: false }
  }
}
