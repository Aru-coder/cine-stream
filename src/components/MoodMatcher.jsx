import { useState } from 'react'
import { getMoodMovieTitle } from '../api/gemini'
import { searchMovies } from '../api/tmdb'
import MovieCard from './MovieCard'

export default function MoodMatcher() {
  const [mood, setMood] = useState('')
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function handleSubmit(e) {
    e.preventDefault()
    if (!mood.trim()) return
    setLoading(true)
    setError(null)
    setResult(null)
    try {
      const title = await getMoodMovieTitle(mood)
      const searchResults = await searchMovies(title)
      const bestMatch = searchResults.results?.[0]
      if (bestMatch) {
        setResult(bestMatch)
      } else {
        setError(`Couldn't find "${title}" on TMDB.`)
      }
    } catch (err) {
      setError(`Mood matcher failed: ${err.message}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mood-matcher">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="e.g. feeling sad but want an action movie"
          value={mood}
          onChange={(e) => setMood(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? 'Thinking...' : 'Find My Movie'}
        </button>
      </form>
      {error && <p className="error">{error}</p>}
      {result && (
        <div className="mood-result">
          <MovieCard movie={result} />
        </div>
      )}
    </div>
  )
}
