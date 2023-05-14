import axios from 'axios'

export const deleteEmployee = async (
  _id: string,
  companyId: string,
  token: string
): Promise<{ ok: boolean }> => {
  try {
    await axios.delete(`/api/employee/${_id}/${companyId}`, {
      headers: { Authorization: token }
    })
    return { ok: true }
  } catch (e) {
    return { ok: false }
  }
}
