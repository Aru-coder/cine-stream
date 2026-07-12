import { useEffect, useRef } from 'react'

// Calls onIntersect() when the returned ref's element scrolls into view.
// Attach `ref` to a sentinel <div> at the bottom of your grid.
export function useInfiniteScroll(onIntersect, { enabled = true } = {}) {
  const ref = useRef(null)

  useEffect(() => {
    if (!enabled || !ref.current) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) onIntersect()
      },
      { threshold: 1.0 }
    )

    observer.observe(ref.current)
    return () => observer.disconnect()
  }, [onIntersect, enabled])

  return ref
}
