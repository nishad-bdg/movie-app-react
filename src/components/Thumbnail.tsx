import { Movie } from '../../typings'
import { imageUrl } from '../constants'

interface Props {
  movie: Movie
}
function Thumbnail({ movie }: Props) {
  return (
    <div className='image-container'>
      <img
        className='mx-2'
        src={imageUrl + movie.poster_path}
        alt='Movie'
      ></img>
      <div className='overlay d-flex align-items-center justify-content-center'>
        Add To Favorite
      </div>
    </div>
  )
}

export default Thumbnail
