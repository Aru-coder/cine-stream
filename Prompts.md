# Prompts.md — AI Pair-Programming Log

Per the "Learn, Don't Copy" mandate, this file documents AI-assisted debugging
sessions used while building Cine-Stream.

## Session 1 — Project scaffolding
- Asked an AI assistant to help scaffold a Vite + React project structure
  for a TMDB-powered movie browser (grid, search, infinite scroll, favorites).
- Reviewed the generated structure, then rewrote/adjusted logic myself to
  make sure I understood each hook (useDebounce, useInfiniteScroll) and
  could explain it in the demo video.

## Session 2 — Debouncing
- Discussed why debouncing search input matters (reduces redundant API
  calls) and how to implement it with useEffect + setTimeout.

## Session 3 — Infinite scroll
- Discussed the IntersectionObserver API and how to attach it to a sentinel
  div at the bottom of a scrollable grid.

## Session 4 — Mood Matcher (Gemini + TMDB handoff)
- Discussed how to structure a prompt so Gemini returns a single clean
  movie title, then feed that string into TMDB's search endpoint.

<!-- Add further entries here as you debug your own implementation. -->
