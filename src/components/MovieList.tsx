import { Movie, Movies } from '../../typings'
import Thumbnail from './Thumbnail'

interface Props {
  title: string
  movies: Movies
  addToFavoriteClick?: (movie: Movie) => void
}
function MovieList({ title, movies, addToFavoriteClick }: Props) {
  return (
    <div className='container-fluid movie-list mt-5'>
      <h2>{title}</h2>
      <div className='d-flex flex-nowrap'>
        {movies.map((movie: Movie) => (
          <Thumbnail
            key={movie.id}
            movie={movie}
            title={title}
            addToFavoriteClick={(e) => addToFavoriteClick?.(movie)}
          />
        ))}
      </div>
    </div>
  )
}

export default MovieList
