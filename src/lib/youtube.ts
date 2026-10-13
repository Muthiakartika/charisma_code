/** Accepts youtu.be, youtube.com/watch?v=, /shorts/ and /embed/ links. */
export const youtubeUrlPattern =
  /^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?v=|shorts\/|embed\/)|youtu\.be\/)([\w-]{11})/

export const getYoutubeId = (url?: string | null): string | null => {
  if (!url) return null
  const match = url.trim().match(youtubeUrlPattern)
  return match ? match[5] : null
}

export const validateYoutubeUrl = (value: unknown, required = false): true | string => {
  if (!value) return required ? 'Paste a YouTube video link, e.g. https://youtu.be/Wo9XVBQohEg' : true
  return youtubeUrlPattern.test(String(value)) || 'Paste a YouTube video link, e.g. https://youtu.be/Wo9XVBQohEg'
}
