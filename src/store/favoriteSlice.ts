import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { RootState } from './store'
import getFavorites from '../api/getFavorites'
import { FavoriteState } from '../../typings'
import { getAccessToken } from '../services/localStorage'

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

export const { start, success, error } = favoriteSlice.actions
export const selectFavorites = (state: RootState) => state.favoriteList
export const favoriteReducer = favoriteSlice.reducer
