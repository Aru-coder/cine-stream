import axios from 'axios'

const BASE_URL = 'https://api.themoviedb.org/3'
export const IMG_BASE = 'https://image.tmdb.org/t/p/w500'

const tmdb = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_TMDB_TOKEN}`,
    'Content-Type': 'application/json',
  },
})

export async function getPopularMovies(page = 1) {
  const res = await tmdb.get('/movie/popular', { params: { page } })
  return res.data // { results, page, total_pages }
}

export async function searchMovies(query, page = 1) {
  const res = await tmdb.get('/search/movie', { params: { query, page } })
  return res.data
}

export default tmdb
