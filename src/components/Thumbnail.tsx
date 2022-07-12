import { Button } from '@mui/material'
import { Movie } from '../../typings'
import { imageUrl } from '../constants'

interface Props {
  movie: Movie
  addToFavoriteClick?: (movie: Movie) => void,
  removeFavoriteClick?: (movie: Movie) => void,
  title?: string
}
function Thumbnail({ movie, addToFavoriteClick, title }: Props) {
  return (
    <div className='image-container'>
      <img
        className='mx-2'
        src={imageUrl + movie.poster_path}
        alt='Movie'
      ></img>
      <div className='overlay d-flex align-items-center justify-content-center'>
        <Button
          variant='text'
          style={{ color: '#f11111' }}
          onClick={(e) => addToFavoriteClick?.(movie)}
        >
          {title === 'Favorites' ? 'Remove From Favorite' : 'Add To Favorite'}
        </Button>
      </div>
    </div>
  )
}

export default Thumbnail
