import { useFavorites } from '../context/FavoritesContext'
import MovieCard from '../components/MovieCard'

export default function Favorites() {
  const { favorites } = useFavorites()

  return (
    <div className="favorites-page">
      <h1>My Favorites</h1>
      {favorites.length === 0 ? (
        <p>No favorites yet — heart a movie to save it here.</p>
      ) : (
        <div className="movie-grid">
          {favorites.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  )
}
