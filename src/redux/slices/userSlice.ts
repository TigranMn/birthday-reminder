import { TSessionUser } from '@/types/types'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type TUserState = {
  _id?: string | null
  fullName: string | null
  email: string | null
  token?: string | null
}

const initialState: TUserState = {
  fullName: null,
  email: null,
  _id: null,
  token: null
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<TSessionUser>) {
      state.fullName = action.payload.name
      state.token = action.payload.token
      state.email = action.payload.email
      state._id = action.payload._id
    },
    clearUser(state) {
      state.email = null
      state.fullName = null
      state.token = null
      state._id = null
    }
  }
})
export const { setUser, clearUser } = userSlice.actions
export default userSlice.reducer
