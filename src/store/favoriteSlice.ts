import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './store'
import getFavorites from '../api/getFavorite'
import { FavoritePayload, FavoriteState, Movie, Movies, RemoveFavoritePayload } from '../../typings'
import { getAccessToken } from '../services/localStorage'
import postFavorite from '../api/postFavorite'
import removeFavorite from '../api/removeFavorite'

const initialState: FavoriteState = {
  isLoadingFavorites: false,
  favorites: [],
  errorMessage: '',
  isSuccess: false,
  isRemoveSuccess: false
}

export const favoriteSlice = createSlice({
  name: 'favoriteList',
  initialState,
  reducers: {
    clearState: (state) => {
      state.isLoadingFavorites = false
      state.isSuccess = false
      state.errorMessage = ''
      state.isRemoveSuccess = false
    },
    start: (state) => {
      state.isLoadingFavorites = true
    },
    success: (state, action: PayloadAction<Movie>) => {
      state.favorites.push(action.payload)
      state.isLoadingFavorites = false
      state.isSuccess = true
    },
    fetchSuccess: (state, action: PayloadAction<Movies>) => {
      state.isLoadingFavorites = false
      state.favorites = action.payload
    },
    removeSuccess: (state, action:PayloadAction<number>) => {
      state.favorites.splice(action.payload,1)
      state.isRemoveSuccess = true
    },
    error: (state, action: PayloadAction<string>) => {
      state.isLoadingFavorites = false
      state.errorMessage = action.payload
      state.isSuccess = false
      state.isRemoveSuccess = false
    }
  }
})

export const fetchFavorites = () => async (dispatch: any) => {
  dispatch(start())
  try {
    const token = getAccessToken()
    if (token) {
      const favorites = await getFavorites(token)
      dispatch(fetchSuccess(favorites.data))
    }
  } catch (error: any) {
    console.log(error)
  }
}

export const addToFavorite = (data: Movie) => async (dispatch: any) => {
  dispatch(start())
  try {
    const token = getAccessToken()
    if (token) {
      const payloadData: FavoritePayload = {
        id: data.id || 0,
        title: data.title || '',
        original_title: data.original_title || '',
        poster_path: data.poster_path || '',
        idToken: token
      }
      await postFavorite(payloadData)
      dispatch(success(payloadData))
      // dispatch(success({ favorites: response.data }))
    }
  } catch (error: any) {
    console.log(error)
    dispatch(error(error.message))
  }
}

export const removeFavorites = (id: number, index: number) => async (dispatch: any) => {
  console.log('movie id', id)
  const token = getAccessToken()
  if (token) {
    try {
      const payload: RemoveFavoritePayload = {
        id: id,
        idToken: token
      }
      await removeFavorite(payload)
      dispatch(removeSuccess(index))
    } catch (error: any) {
      dispatch(error(error.response.data.message))
    }
  }
}

export const { start, success, error, fetchSuccess, removeSuccess } = favoriteSlice.actions
export const selectFavorites = (state: RootState) => state.favoriteList
export const favoriteReducer = favoriteSlice.reducer
