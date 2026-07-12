import { IMG_BASE } from '../api/tmdb'
import { useFavorites } from '../context/FavoritesContext'

export default function MovieCard({ movie }) {
  const { toggleFavorite, isFavorite } = useFavorites()
  const year = movie.release_date ? movie.release_date.slice(0, 4) : 'N/A'
  const posterUrl = movie.poster_path ? `${IMG_BASE}${movie.poster_path}` : null

  return (
    <div className="movie-card">
      <button
        className={`heart-btn ${isFavorite(movie.id) ? 'active' : ''}`}
        onClick={() => toggleFavorite(movie)}
        aria-label="Toggle favorite"
      >
        {isFavorite(movie.id) ? '♥' : '♡'}
      </button>

      {posterUrl ? (
        <img
          src={posterUrl}
          alt={movie.title}
          loading="lazy"
          className="movie-poster"
        />
      ) : (
        <div className="movie-poster placeholder">No Image</div>
      )}

      <div className="movie-info">
        <h3>{movie.title}</h3>
        <p>{year} · ⭐ {movie.vote_average?.toFixed(1) ?? '—'}</p>
      </div>
    </div>
  )
}
