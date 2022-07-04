import api from '../services/api'
import { AxiosResponse } from 'axios'

const favorites = (idToken: string): Promise<AxiosResponse> => {
  return api.get('/favorite/', {
    headers: {
      Authorization: 'Bearer ' + idToken
    }
  })
}

export default favorites
