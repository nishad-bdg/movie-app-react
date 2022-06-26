import { useEffect, useState } from 'react'
import { Movie } from '../../typings'
import { imageUrl } from '../constants'
import StarBorderPurple500Icon from '@mui/icons-material/StarBorderPurple500';
import Button from '@mui/material/Button'

interface Props {
  netflixOriginals: Movie[]
}
function Banner({ netflixOriginals }: Props) {
  const [movie, setMovie] = useState<Movie | null>(null)

  useEffect(() => {
    setMovie(
      netflixOriginals[Math.floor(Math.random() * netflixOriginals.length)]
    )
  }, [netflixOriginals])

  return (
    <div className='banner'>
      <img className='h-60' src={imageUrl + movie?.backdrop_path} alt='' />
      <span>
        <h2>{movie?.original_title}</h2>
        <button className='btn btn-outline-dark btn-favorite'>
          Favorite <StarBorderPurple500Icon className="ml-2" />
        </button>
      </span>
    </div>
  )
}

export default Banner
