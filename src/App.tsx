import { useEffect, useState } from 'react'
import './styles/App.scss'
import Header from './components/Header'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Movie } from '../typings'
import requests from './utils/requests'
import axios from 'axios'
import Banner from './components/Banner'
import MovieList from './components/MovieList'

function App() {
  const [netflixOriginals, setNetflixOriginals] = useState<Movie[]>([])

  const getOriginals = async () => {
    const response = await axios.get(requests.fetchNetflixOriginals)
    setNetflixOriginals(response.data.results)
  }

  useEffect(() => {
    getOriginals()
  }, [])

  return (
    <>
      <Header />
      <div className='container-fluid'>
        <section className='mb-5'>
        <Banner netflixOriginals={netflixOriginals} />
        </section>
        <section className='mt-5'>
          <MovieList title='Originals' movies={netflixOriginals} />
        </section>
      </div>
    </>
  )
}

export default App
