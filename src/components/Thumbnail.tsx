import { Movie } from '../../typings'
import { imageUrl } from '../constants'

interface Props {
  movie: Movie
}
function Thumbnail({ movie }: Props) {
  return (
    <img className='mx-2' src={imageUrl + movie.poster_path} alt='Movie'></img>
  )
}

export default Thumbnail
