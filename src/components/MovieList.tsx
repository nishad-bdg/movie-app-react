import { useRef, useState } from 'react'
import { Movie, Movies } from '../../typings'
import Thumbnail from './Thumbnail'
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline'

interface Props {
  title: string
  movies: Movies
  addToFavoriteClick?: (movie: Movie) => void
}
function MovieList({ title, movies, addToFavoriteClick }: Props) {
  const rowRef = useRef<HTMLDivElement>(null)
  const [isMoved, setIsMoved] = useState<boolean>(false)

  const handleClick = (direction: string) => {
    setIsMoved(true)
    if (rowRef.current) {
      const { scrollLeft, clientWidth } = rowRef.current
      const scrollTo =
        direction === 'left'
          ? scrollLeft - clientWidth
          : scrollLeft + clientWidth
      rowRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' })
      if (scrollLeft <= 0) {
        setIsMoved(false)
      }
    }
  }

  return (
    <div className='container-fluid movie-list mt-5'>
      <h2>{title}</h2>
      <div>
        <ChevronLeftIcon
          className={`left-icon ${!isMoved && 'hide-element'}`}
          onClick={() => handleClick('left')}
        />
        <div className='d-flex flex-nowrap' ref={rowRef}>
          {movies.map((movie: Movie) => (
            <Thumbnail
              key={movie.id}
              movie={movie}
              title={title}
              addToFavoriteClick={(e) => addToFavoriteClick?.(movie)}
            />
          ))}
        </div>
        <ChevronRightIcon
          className={`right-icon ${movies.length < 2 && 'hide-element'}`}
          onClick={() => handleClick('right')}
        />
      </div>
    </div>
  )
}

export default MovieList
