import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import auth from '../api/auth'
import { setTokens } from '../services/localStorage'
import { RootState } from './store'
import { AuthPayload, IAuthentication, SignupPayload } from '../../typings'
import signup from '../api/signup'

const initialState: IAuthentication = {
  isProcessingRequest: false,
  errorMessage: '',
  accessToken: null,
  isSuccess: false
}
export const authenticationSlice = createSlice({
  name: 'authentication',
  initialState,
  reducers: {
    clearState: (state) => {
      state.errorMessage = ''
      state.isProcessingRequest = false
      state.isSuccess = false
      return state
    },
    start: (state) => {
      state.isProcessingRequest = true
    },
    signupSuccess: (state) => {
      state.isSuccess = true
      state.isProcessingRequest = false
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
    dispatch(start())
    try {
      const authData = await auth(userData)
      console.log('auth data', authData.data.access_token)
      setTokens(authData.data.access_token)
      dispatch(success(authData.data.access_token))
    } catch (err: any) {
      dispatch(error(err.response.data.error))
    }
  }

export const signupUser =
  (userData: SignupPayload) => async (dispatch: any) => {
    dispatch(start())
    try {
      await signup(userData)
      dispatch(signupSuccess())
    } catch (err: any) {
      console.log(err.response)
      dispatch(error(err.response.data.message))
    }
  }
export const { start, success, error, clearState, signupSuccess } =
  authenticationSlice.actions
export const selectAuthentication = (state: RootState) => state.authentication
export const authenticationReducer = authenticationSlice.reducer
