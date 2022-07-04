import api from '../services/api'
import { AxiosResponse } from 'axios'
import { AuthPayload } from '../../typings'

const signup = ({ email, password }: AuthPayload): Promise<AxiosResponse> => {
  return api.post('/user/signup', { email, password })
}

export default signup
