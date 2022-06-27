import { useEffect, useState } from 'react'
import './styles/App.scss'
import Header from './components/Header'
// eslint-disable-next-line
import 'bootstrap/dist/css/bootstrap.min.css'
import { Movies } from '../typings'
import requests from './utils/requests'
import axios from 'axios'
import Banner from './components/Banner'
import MovieList from './components/MovieList'

function App() {
  const [netflixOriginals, setNetflixOriginals] = useState<Movies>([])
  const [topRated, setTopRated] = useState<Movies>([])
  const [action, setAction] = useState<Movies>([])
  const [romantic, setRomantic] = useState<Movies>([])
  const [comedy, setComedy] = useState<Movies>([])

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

  useEffect(() => {
    getMovies()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <Header />
      <div className='container-fluid'>
        <section className='mb-5'>
          <Banner netflixOriginals={netflixOriginals} />
        </section>
        <section>
          <MovieList title='Top Rated' movies={topRated} />
          <MovieList title='Action' movies={action} />
          <MovieList title='Romantic' movies={romantic} />
          <MovieList title='Comedy' movies={comedy} />
        </section>
      </div>
    </>
  )
}

export default App
