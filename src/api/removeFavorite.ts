import api from '../services/api'
import { AxiosResponse } from 'axios'
import { RemoveFavoritePayload } from '../../typings'

const removeFavorite = ({
  id,
  idToken
}: RemoveFavoritePayload): Promise<AxiosResponse> => {
  return api.delete(`/favorite/${id}`, {
    headers: {
      Authorization: 'Bearer ' + idToken
    }
  })
}

export default removeFavorite
