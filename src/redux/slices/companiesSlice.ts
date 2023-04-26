import { TCompany } from '@/types/types'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

type TInitialState = {
  companies: TCompany[]
}

const initialState: TInitialState = {
  companies: []
}

export const addCompany = createAsyncThunk(
  'companies/addCompany',
  async (newCompany: { name: string; userId: string }, { rejectWithValue }) => {
    try {
      const res: TCompany = (await axios.post('/api/company', newCompany)).data
      console.log(res)
      return res
    } catch (e) {
      //@ts-ignore
      return rejectWithValue(e.response.data)
    }
  }
)

const companiesSlice = createSlice({
  name: 'companies',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addCompany.fulfilled, (state, action) => {
      state.companies.push(action.payload)
    })
  }
})

export default companiesSlice.reducer
