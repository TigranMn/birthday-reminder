import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import settingsReducer from './slices/settingsSlice'
import userReducer from './slices/userSlice'
import companiesReducer from './slices/companiesSlice'

export const store = configureStore({
  reducer: {
    settings: settingsReducer,
    user: userReducer,
    companies: companiesReducer
  }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
