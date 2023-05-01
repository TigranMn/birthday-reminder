import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type TSettingsState = {
  language: string | null
  theme: string | null
}

const initialState: TSettingsState = {
  language: null,
  theme: null
}
const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    saveSettings(state, action: PayloadAction<TSettingsState>) {
      state.language = action.payload.language
      state.theme = action.payload.theme
    },
    changeTheme(state, action: PayloadAction<string | null>) {
      state.theme = action.payload
    }
  }
})

export const { saveSettings, changeTheme } = settingsSlice.actions
export default settingsSlice.reducer
