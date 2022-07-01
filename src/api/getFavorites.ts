import api from '../services/api'
import { AxiosResponse } from 'axios'
import { IdToken } from '../../typings'

const favorites = ({ idToken }: IdToken): Promise<AxiosResponse> => {
  return api.get('/favotite', {
    headers: {
      Authorization: 'Bearer ' + idToken
    }
  })
}

export default favorites
