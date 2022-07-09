import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import auth from '../api/auth'
import { setTokens } from '../services/localStorage'
import { RootState } from './store'
import { history } from '../helpers/history'
import { AuthPayload } from '../../typings'
import signup from '../api/signup'

export interface IAuthentication {
  isProcessingRequest: boolean
  accessToken?: string
}
const initialState: IAuthentication = { isProcessingRequest: false }
export const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    start: (state) => {
      return {
        ...state,
        isProcessingRequest: true
      }
    },
    success: (state, action: PayloadAction<any>) => {
      return {
        ...state,
        isProcessingRequest: false
      }
    },
    error: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        isProcessingRequest: false
      }
    }
  }
})
export const authenticateUser =
  (userData: AuthPayload) => async (dispatch: any) => {
    try {
      const authData = await auth(userData)
      console.log('auth data', authData.data.access_token)
      setTokens(authData.data.access_token)
      dispatch(success(authData.data.access_token))
      history.push('/')
    } catch (err: any) {
      dispatch(error(err))
    }
  }

export const signupUser = (userData: AuthPayload) => async (dispatch: any) => {
  try {
    const authData = await signup(userData)
    console.log('auth data', authData.data.access_token)
    history.push('/login')
  } catch (err: any) {
    dispatch(error(err))
  }
}
export const { start, success, error } = authenticationSlice.actions
export const selectAuthentication = (state: RootState) => state.authentication
export const authenticationReducer = authenticationSlice.reducer
