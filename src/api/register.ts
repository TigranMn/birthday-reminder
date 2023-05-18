import { TUserState } from '@/redux/slices/userSlice'
import axios from 'axios'
import process from 'process'

export const register = async (form: TUserState & { password: string }) => {
  try {
    await axios.post(`${process.env.NEXTAUTH_URL}/api/sign-up`, form)
    return { ok: true }
  } catch (e) {
    //@ts-ignore
    const error = e.response.data
    return { ok: false, ...error }
  }
}
