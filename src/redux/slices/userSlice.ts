import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export type TUserState = {
  _id?: string | null
  fullName: string | null
  email: string | null
  token?: string
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
      return res.data
    } catch (e) {
      console.log(e)
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
      state.token = action.payload?.token!
    })
  }
})

export default userSlice.reducer
