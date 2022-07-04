import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './store'
import getFavorites from '../api/getFavorite'
import { FavoritePayload, FavoriteState, Movie } from '../../typings'
import { getAccessToken } from '../services/localStorage'
import postFavorite from '../api/postFavorite'

const initialState: FavoriteState = {
  isLoadingFavorites: false,
  favorites: []
}

export const favoriteSlice = createSlice({
  name: 'favoriteList',
  initialState,
  reducers: {
    start: (state) => {
      return {
        ...state,
        isLoadingFavorites: true
      }
    },
    success: (state, action: PayloadAction<any>) => {
      return {
        ...state,
        ...action.payload,
        isLoadingFavorites: false
      }
    },
    error: (state, action: PayloadAction<string>) => {
      return {
        ...state,
        isLoadingFavorites: false
      }
    }
  }
})

export const fetchFavorites = () => async (dispatch: any) => {
  dispatch(start())
  try {
    const token = getAccessToken()
    if (token) {
      const favorites = await getFavorites(token)
      dispatch(success({ favorites: favorites.data }))
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
      // dispatch(success({ favorites: response.data }))
    }
  } catch (error: any) {
    console.log(error)
  }
}

export const { start, success, error } = favoriteSlice.actions
export const selectFavorites = (state: RootState) => state.favoriteList
export const favoriteReducer = favoriteSlice.reducer
