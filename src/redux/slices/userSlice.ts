import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import Cookies from 'js-cookie'

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

export const signIn = createAsyncThunk(
  'user/signIn',
  async (credentials: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const res = await axios.post('/api/sign-in', credentials)
      Cookies.set('token', res.headers['authorization'])
      return res.data
    } catch (e) {
      //@ts-ignore
      return rejectWithValue(e.response.data)
    }
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(signIn.fulfilled, (state, action) => {
      state.email = action.payload?.email!
      state._id = action.payload?._id!
      state.fullName = action.payload?.fullName!
    })
  }
})

export default userSlice.reducer
