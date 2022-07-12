import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './store'
import getFavorites from '../api/getFavorite'
import { FavoritePayload, FavoriteState, Movie, Movies } from '../../typings'
import { getAccessToken } from '../services/localStorage'
import postFavorite from '../api/postFavorite'

const initialState: FavoriteState = {
  isLoadingFavorites: false,
  favorites: [],
  errorMessage: ''
}

export const favoriteSlice = createSlice({
  name: 'favoriteList',
  initialState,
  reducers: {
    start: (state) => {
      state.isLoadingFavorites = true
    },
    success: (state, action: PayloadAction<Movie>) => {
      state.favorites.push(action.payload)
      state.isLoadingFavorites = false
    },
    fetchSuccess: (state, action: PayloadAction<Movies>) => {
      state.isLoadingFavorites = false
      state.favorites = action.payload
    },
    error: (state, action: PayloadAction<string>) => {
      state.isLoadingFavorites = false
      state.errorMessage = action.payload
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

export const { start, success, error, fetchSuccess } = favoriteSlice.actions
export const selectFavorites = (state: RootState) => state.favoriteList
export const favoriteReducer = favoriteSlice.reducer
