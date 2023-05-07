import axios from 'axios'

export const changeCompanyName = async (_id: string, token: string, name: string) => {
  try {
    const res = await axios.patch(
      `/api/company/${_id}`,
      { name },
      {
        headers: {
          Authorization: token
        }
      }
    )
    return res.data
  } catch (e) {
    return e
  }
}
