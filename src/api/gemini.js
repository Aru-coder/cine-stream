// Calls Gemini to turn a "mood" string into a single movie title.
// Docs: https://ai.google.dev/api/rest

const GEMINI_URL =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash:generateContent'

export async function getMoodMovieTitle(moodText) {
  const key = import.meta.env.VITE_GEMINI_KEY
  const prompt = `Suggest ONE movie based on this mood: "${moodText}". Return ONLY the movie title as a plain text string, no punctuation, no explanation.`

  const res = await fetch(GEMINI_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-goog-api-key': key,
    },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
    }),
  })

  if (!res.ok) {
    const errText = await res.text()
    throw new Error(`Gemini request failed: ${res.status} ${errText}`)
  }

  const data = await res.json()
  const rawTitle = data?.candidates?.[0]?.content?.parts?.[0]?.text ?? ''
  return rawTitle.replace(/["'.]/g, '').trim()
}
