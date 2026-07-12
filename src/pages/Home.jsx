import { useCallback, useEffect, useState } from 'react'
import { getPopularMovies, searchMovies } from '../api/tmdb'
import MovieCard from '../components/MovieCard'
import SearchBar from '../components/SearchBar'
import MoodMatcher from '../components/MoodMatcher'
import { useInfiniteScroll } from '../hooks/useInfiniteScroll'

export default function Home() {
  const [movies, setMovies] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [query, setQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  // Initial load + reload whenever the debounced search query changes
  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)

    const fetcher = query ? searchMovies(query, 1) : getPopularMovies(1)

    fetcher
      .then((data) => {
        if (cancelled) return
        setMovies(data.results)
        setPage(1)
        setTotalPages(data.total_pages)
      })
      .catch((err) => {
        if (cancelled) return
        setError(
          `Failed to load movies: ${err.response?.status ?? ''} ${
            err.message
          }. Check your VITE_TMDB_TOKEN in .env.`
        )
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [query])

  const loadMore = useCallback(async () => {
    if (loading || page >= totalPages) return
    setLoading(true)
    const nextPage = page + 1
    const data = query
      ? await searchMovies(query, nextPage)
      : await getPopularMovies(nextPage)

    setMovies((prev) => [...prev, ...data.results])
    setPage(nextPage)
    setLoading(false)
  }, [loading, page, totalPages, query])

  const sentinelRef = useInfiniteScroll(loadMore, { enabled: !loading })

  return (
    <div className="home-page">
      <h1>Cine-Stream</h1>
      <SearchBar onSearch={setQuery} />
      <MoodMatcher />

      {error && <p className="error">{error}</p>}

      <div className="movie-grid">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>

      {/* Sentinel div for IntersectionObserver-based infinite scroll */}
      <div ref={sentinelRef} className="scroll-sentinel" />

      {loading && <p className="loading">Loading...</p>}
    </div>
  )
}
