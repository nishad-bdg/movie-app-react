import api from '../services/api'
import { AxiosResponse } from 'axios'
import { PostLoginInfo } from '../../typings'

const login = ({ email, password }: PostLoginInfo): Promise<AxiosResponse> => {
  return api.post('/user', { email, password })
}

export default login
