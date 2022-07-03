import { configureStore } from '@reduxjs/toolkit'
import { favoriteReducer } from './favoriteSlice'
import { authenticationReducer } from './loginSlice'

export const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
    favoriteList: favoriteReducer
  }
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
