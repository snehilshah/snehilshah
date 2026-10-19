import 'server-only'
import { songs, BUCKET } from '@/lib/songData'
import { entity } from './goonj'
import { backdrop, seedFrom, themeVars } from './theme'
import { parseLrc } from './lrc'
import { albumHref, artistHref, trackHref } from './paths'

// Goonj's keys: lower-case words with punctuation dropped; albums are
// "album|artist" and tracks "title|artist|album".
const norm = (s) =>
  s
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, ' ')
    .trim()

async function found(kind, keys) {
  for (const key of keys) {
    try {
      if (await entity(kind, key)) return key
    } catch {
      return null
    }
  }
  return null
}

/**
 * Names link to their pages here when Goonj has one (they've been played);
 * otherwise they stay plain text. Goonj sometimes keeps several artists run
 * together as one name, so albums and tracks try that too.
 */
async function links(s, artists) {
  const albumArtists = [...new Set([norm(artists[0]), norm(artists.join(''))])]
  const [artistKeys, album, track] = await Promise.all([
    Promise.all(artists.map((a) => found('artists', [norm(a)]))),
    s.album ? found('albums', albumArtists.map((a) => `${norm(s.album)}|${a}`)) : null,
    found('tracks', albumArtists.map((a) => `${norm(s.title)}|${a}|${norm(s.album || s.title)}`))
  ])
  return {
    artists: artistKeys.map((k) => k && artistHref(k)),
    album: album && albumHref(album),
    track: track && trackHref(track)
  }
}

async function bytes(url) {
  try {
    const res = await fetch(url, { next: { revalidate: 86400 } })
    return res.ok ? Buffer.from(await res.arrayBuffer()) : null
  } catch {
    return null
  }
}

// Uploaded lyrics show up within the hour.
async function lrc(id) {
  try {
    const res = await fetch(`${BUCKET}/lyrics/${id}.lrc`, { next: { revalidate: 3600 } })
    return res.ok ? await res.text() : null
  } catch {
    return null
  }
}

/** Everything the player needs per song: colours from its cover, links, and lyrics. */
export async function playerSongs() {
  return Promise.all(
    songs.map(async (s) => {
      const artists = s.artist.split('/').map((a) => a.trim())
      const [cover, synced, href] = await Promise.all([bytes(s.cover), lrc(s.id), links(s, artists)])
      const [seed, blur] = await Promise.all([seedFrom(cover), backdrop(cover)])
      const lines = parseLrc(synced, s.duration)
      return {
        id: s.id,
        title: s.title,
        artists,
        album: s.album ?? null,
        cover: s.cover,
        audio: s.audio,
        duration: s.duration,
        lyrics: s.lyrics ?? '',
        synced: lines.length ? lines : null,
        href,
        theme: themeVars(seed),
        blur
      }
    })
  )
}
