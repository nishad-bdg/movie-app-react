export interface Movie {
  adult?: boolean
  backdrop_path?: string
  genre_ids?: number[]
  id?: number
  original_language?: string
  original_title?: string
  overview?: string
  popularity?: number
  poster_path?: string
  release_date?: Date
  title?: string
  video?: boolean
  vote_average?: number
  vote_count?: number
  isFavorite?: boolean
}

export type Movies = Movie[]

export interface AuthPayload {
  email: string
  password: string
}

export interface SignupPayload extends AuthPayload {
  confirmPassword: string
}

export interface IdToken {
  idToken: string
}

export interface FavoriteState {
  isLoadingFavorites: boolean
  favorites: Movies
  errorMessage: string
  isSuccess: boolean
  isRemoveSuccess: boolean
}

export interface FavoritePayload extends IdToken {
  id: number
  title: string
  original_title: string
  poster_path: string
}

export interface IAuthentication {
  isProcessingRequest: boolean
  accessToken?: string | null
  errorMessage: string
  isSuccess: boolean
}

export interface RemoveFavoritePayload extends IdToken {
  id: number
}