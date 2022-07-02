import api from '../services/api'
import { AxiosResponse } from 'axios'
import { AuthPayload } from '../../typings'

const login = ({ email, password }: AuthPayload): Promise<AxiosResponse> => {
  return api.post('/user/login', { email, password })
}

export default login
