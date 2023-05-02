import axios from 'axios'

export const changeCompanyName = async (_id: string, token: string, name: string) => {
  try {
    await axios.patch(
      `/api/company/${_id}`,
      { name },
      {
        headers: {
          Authorization: token
        }
      }
    )
    return { ok: true }
  } catch (e) {
    return { ok: false }
  }
}
