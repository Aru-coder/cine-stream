import { useEffect, useState } from 'react'

// Returns a debounced copy of `value` that only updates once the user
// has stopped changing it for `delay` ms (default 500ms per sprint spec).
export function useDebounce(value, delay = 500) {
  const [debounced, setDebounced] = useState(value)

  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay)
    return () => clearTimeout(timer)
  }, [value, delay])

  return debounced
}
