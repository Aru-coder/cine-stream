# Cine-Stream

A React + Vite movie discovery app using the TMDB API, with infinite scroll,
debounced search, localStorage favorites, and an AI "Mood Matcher" powered
by Gemini.

## Setup

1. Install dependencies:
   ```
   npm install
   ```

2. Create your local env file (this is the ONLY place your keys go):
   ```
   cp .env.example .env
   ```
   Then open `.env` and paste your **own, freshly-generated** keys:
   ```
   VITE_TMDB_TOKEN=your_tmdb_read_access_token
   VITE_GEMINI_KEY=your_gemini_api_key
   ```
   `.env` is already in `.gitignore` — it will never be committed.

3. Run locally:
   ```
   npm run dev
   ```

4. Deploy: push to GitHub, import into Vercel/Netlify, and add the same
   two variables (`VITE_TMDB_TOKEN`, `VITE_GEMINI_KEY`) under
   Project Settings → Environment Variables on the hosting dashboard.
   Redeploy after adding them.
