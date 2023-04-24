import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

export type TUserState = {
  firstName: string | null
  lastName: string | null
  email: string | null
}

const initialState: TUserState = {
  firstName: null,
  lastName: null,
  email: null
}

export const authorize = createAsyncThunk(
  'user/authorize',
  async (form: { email: string; password: string }): Promise<TUserState> => {
    const res: TUserState = (await axios.post('/api/sign-up', { ...form, name: 'Tiko' })).data
    console.log(res)
    return res
  }
)

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(authorize.fulfilled, (state, action: PayloadAction<TUserState>) => {
      state.email = action.payload.email
      state.firstName = action.payload.firstName
      state.lastName = action.payload.lastName
    })
  }
})

export default userSlice.reducer
