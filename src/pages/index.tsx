import { useEffect, useState } from 'react'
import Header from '../components/Header'
// eslint-disable-next-line
import 'bootstrap/dist/css/bootstrap.min.css'
import { Movie, Movies } from '../../typings'
import requests from '../utils/requests'
import axios from 'axios'
import Banner from '../components/Banner'
import MovieList from '../components/MovieList'
import { isAuthenticated } from '../services/authenticationService'
import { useAppDispatch, useAppSelector } from '../hooks/hooks'
import {
  fetchFavorites,
  addToFavorite,
  selectFavorites,
  removeFavorites
} from '../store/favoriteSlice'
import { removeTokens } from '../services/localStorage'
import { useNavigate } from 'react-router-dom'
import { clearState } from '../store/authSlice'
import { useSelector } from 'react-redux'
import { Notyf } from 'notyf'

function Home() {
  const [netflixOriginals, setNetflixOriginals] = useState<Movies>([])
  const [topRated, setTopRated] = useState<Movies>([])
  const [action, setAction] = useState<Movies>([])
  const [romantic, setRomantic] = useState<Movies>([])
  const [comedy, setComedy] = useState<Movies>([])

  const notyf = new Notyf({
    duration: 5000,
    position: {
      x: 'right',
      y: 'top'
    }
  })

  const dispatch = useAppDispatch()
  const favorites = useAppSelector(selectFavorites)

  const { isSuccess, isRemoveSuccess, errorMessage } =
    useSelector(selectFavorites)

  const getOriginals = async () => {
    const response = await axios.get(requests.fetchNetflixOriginals)
    setNetflixOriginals(response.data.results)
  }

  const getTopRated = async () => {
    const response = await axios.get(requests.fetchTopRated)
    setTopRated(response.data.results)
  }

  const getActions = async () => {
    const response = await axios.get(requests.fetchActionMovies)
    setAction(response.data.results)
  }

  const getRomantic = async () => {
    const response = await axios.get(requests.fetchRomanceMovies)
    setRomantic(response.data.results)
  }

  const getComedy = async () => {
    const response = await axios.get(requests.fetchComedyMovies)
    setComedy(response.data.results)
  }

  const getMovies = async () => {
    await Promise.all([
      getOriginals(),
      getTopRated(),
      getActions(),
      getRomantic(),
      getComedy()
    ])
  }

  const addToFavoriteClick = (movie: Movie) => {
    const obj = favorites.favorites.findIndex((x) => x.id === movie.id)
    if (obj < 0) {
      dispatch(addToFavorite(movie))
      dispatch(clearState())
    } else {
      dispatch(removeFavorites(movie.id || 0, obj))
    }
  }

  useEffect(() => {
    !isAuthenticated() && history('/login')
    getMovies()
    dispatch(fetchFavorites())
    return () => {
      dispatch(clearState())
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (isSuccess) {
      notyf.success('Movie added to the favorites.')
      dispatch(clearState())
    }

    if (isRemoveSuccess) {
      notyf.success('Movie removed favorites.')
      dispatch(clearState())
    }

    if (errorMessage !== '') {
      notyf.error(errorMessage)
      dispatch(clearState())
    }
  }, [isSuccess, isRemoveSuccess, errorMessage])

  let history = useNavigate()

  const logout = () => {
    removeTokens()
    history('/login')
  }

  return (
    <>
      <Header isAuthenticated={isAuthenticated()} logout={logout} />
      <div className='container-fluid'>
        <section className='mb-5'>
          <Banner
            netflixOriginals={netflixOriginals}
            addToFavoriteClick={addToFavoriteClick}
          />
        </section>
        <section>
          <MovieList
            title='Top Rated'
            movies={topRated}
            addToFavoriteClick={addToFavoriteClick}
          />
          <MovieList
            title='Action'
            movies={action}
            addToFavoriteClick={addToFavoriteClick}
          />
          <MovieList
            title='Romantic'
            movies={romantic}
            addToFavoriteClick={addToFavoriteClick}
          />
          <MovieList
            title='Comedy'
            movies={comedy}
            addToFavoriteClick={addToFavoriteClick}
          />
          <MovieList
            title='Favorites'
            movies={favorites.favorites}
            addToFavoriteClick={addToFavoriteClick}
          />
        </section>
      </div>
    </>
  )
}

export default Home
