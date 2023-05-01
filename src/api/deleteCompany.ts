import axios from 'axios'

export const deleteCompany = async (_id: string, token: string): Promise<{ ok: boolean }> => {
  try {
    await axios.delete(`api/company/${_id}`, {
      headers: { Authorization: token }
    })
    return { ok: true }
  } catch (e) {
    return { ok: false }
  }
}
