import api from '../services/api'
import { AxiosResponse } from 'axios'
import { FavoritePayload } from '../../typings'

const postFavorite = ({
  id,
  title,
  original_title,
  poster_path,
  idToken
}: FavoritePayload): Promise<AxiosResponse> => {
  return api.post(
    '/favorite/',
    {
      id,
      title,
      original_title,
      poster_path
    },
    {
      headers: {
        Authorization: 'Bearer ' + idToken
      }
    }
  )
}

export default postFavorite
