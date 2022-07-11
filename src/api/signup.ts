import api from '../services/api'
import { AxiosResponse } from 'axios'
import { SignupPayload } from '../../typings'

const signup = ({
  email,
  password,
  confirmPassword
}: SignupPayload): Promise<AxiosResponse> => {
  console.log({ email, password, confirmPassword })
  return api.post('/user', { email, password, confirmPassword })
}

export default signup
