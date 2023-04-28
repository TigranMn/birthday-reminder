import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export type TUserState = {
  _id?: string | null
  fullName: string | null
  email: string | null
}

const initialState: TUserState = {
  fullName: null,
  email: null,
  _id: null
}

export const register = createAsyncThunk(
  'user/authorize',
  async (form: TUserState & { password: string }, { rejectWithValue }) => {
    try {
      await axios.post('/api/sign-up', form)
    } catch (e) {
      //@ts-ignore
      const error = e.response.data
      return rejectWithValue(error)
    }
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {}
})

export default userSlice.reducer
