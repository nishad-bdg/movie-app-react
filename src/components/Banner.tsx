import { useEffect, useState } from 'react'
import { Movie } from '../../typings'
import { imageUrl } from '../constants'
import StarBorderPurple500Icon from '@mui/icons-material/StarBorderPurple500'

interface Props {
  netflixOriginals: Movie[]
  addToFavoriteClick?: (movie: Movie) => void
}
function Banner({ netflixOriginals, addToFavoriteClick }: Props) {
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
        {movie && (
          <button
            className='btn btn-outline-dark btn-favorite'
            onClick={(e) => addToFavoriteClick?.(movie)}
          >
            Favorite <StarBorderPurple500Icon className='ml-2' />
          </button>
        )}
      </span>
    </div>
  )
}

export default Banner
