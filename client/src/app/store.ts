import { configureStore } from '@reduxjs/toolkit'
import User from '../feature/user/userSlice'
import theme from '../feature/theme/themeSlice'

export const store = configureStore({
  reducer: {
    User,
    theme
  },
})


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch