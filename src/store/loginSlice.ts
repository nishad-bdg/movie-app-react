import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import auth from '../api/auth'
import { setTokens } from '../services/localStorage'
import { RootState } from './store'
import { AuthPayload, SignupPayload } from '../../typings'
import signup from '../api/signup'

export interface IAuthentication {
  isProcessingRequest: boolean
  accessToken?: string | null
  errorMessage: string
}
const initialState: IAuthentication = {
  isProcessingRequest: false,
  errorMessage: '',
  accessToken: null
}
export const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    clearState: (state) => {
      state.errorMessage = ''
      state.isProcessingRequest = false
      return state
    },
    start: (state) => {
      state.isProcessingRequest = true
    },

    success: (state, action: PayloadAction<string>) => {
      state.isProcessingRequest = false
      state.errorMessage = ''
      state.accessToken = action.payload
    },
    error: (state, action: PayloadAction<any>) => {
      state.isProcessingRequest = false
      state.errorMessage = action.payload
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
    } catch (err: any) {
      dispatch(error('Invalid email or password'))
    }
  }

export const signupUser =
  (userData: SignupPayload) => async (dispatch: any) => {
    try {
      const authData = await signup(userData)
      console.log('auth data', authData.data.access_token)
    } catch (err: any) {
      console.log(err)
      dispatch(error(err))
    }
  }
export const { start, success, error, clearState } = authenticationSlice.actions
export const selectAuthentication = (state: RootState) => state.authentication
export const authenticationReducer = authenticationSlice.reducer
