import { getAccessToken } from './localStorage'

export const isAuthenticated = (): boolean => {
  return getAccessToken() ? true : false
}


