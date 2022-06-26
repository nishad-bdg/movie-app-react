import { useEffect, useState } from 'react'
import './styles/App.css'
import Header from './components/Header'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Movie } from '../typings'
import requests from './utils/requests'
import axios from 'axios'

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
      <div className='container-fluid'></div>
    </>
  )
}

export default App
