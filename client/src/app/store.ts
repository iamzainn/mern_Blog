import { configureStore } from '@reduxjs/toolkit'
import User from '../feature/user/userSlice'

export const store = configureStore({
  reducer: {
    User
  },
})


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch