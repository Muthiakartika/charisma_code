/** Accepts youtu.be, youtube.com/watch?v=, /shorts/ and /embed/ links. */
export const youtubeUrlPattern =
  /^(https?:\/\/)?(www\.)?(youtube\.com\/(watch\?v=|shorts\/|embed\/)|youtu\.be\/)([\w-]{11})/

export const getYoutubeId = (url?: string | null): string | null => {
  if (!url) return null
  const match = url.trim().match(youtubeUrlPattern)
  return match ? match[5] : null
}

/**
 * The sharpest cover YouTube has for a video: the HD one (1280×720) for most uploads, the small
 * one (480×360) for older uploads without it. Checked on the server, once a day per video.
 */
export const getYoutubeCover = async (videoId: string): Promise<string> => {
  const hd = `https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`
  try {
    const response = await fetch(hd, { method: 'HEAD', next: { revalidate: 86400 } })
    if (response.ok) return hd
  } catch {
    // YouTube unreachable: the small cover always exists
  }
  return `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`
}

export const validateYoutubeUrl = (value: unknown, required = false): true | string => {
  if (!value) return required ? 'Paste a YouTube video link, e.g. https://youtu.be/Wo9XVBQohEg' : true
  return youtubeUrlPattern.test(String(value)) || 'Paste a YouTube video link, e.g. https://youtu.be/Wo9XVBQohEg'
}
