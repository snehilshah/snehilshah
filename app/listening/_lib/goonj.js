import 'server-only'
import { createHash } from 'node:crypto'
import { DEFAULT_RANGE } from './paths'

// Goonj, the listening history every device reports to. Data is cached and
// refreshed when Goonj says what changed (app/api/listening/revalidate), with
// a time fallback in case that call is ever missed. Cache tags:
//   FEED  the overview, top lists and latest history: every new play;
//   keyTag(kind, key)  one track, album or artist page (and its art): plays of it;
//   ALL   everything (imports).
export const FEED = 'goonj'
export const ALL = 'goonj-all'
// Hashed: keys can be longer than a tag may be (256 characters).
export const keyTag = (kind, key) => `goonj:${kind}:${createHash('sha1').update(key).digest('hex').slice(0, 20)}`

const HOUR = 3600
const DAY = 86400

export const API = (process.env.GOONJ_URL || 'https://goonj.snehilshah.com').replace(/\/$/, '')

export const RANGES = [
  { key: '7d', label: '7 days', title: 'Last 7 days' },
  { key: '30d', label: '30 days', title: 'Last 30 days' },
  { key: '90d', label: '90 days', title: 'Last 90 days' },
  { key: '365d', label: 'Year', title: 'Last year' },
  { key: 'all', label: 'All time', title: 'All time' }
]

/** The page title for a range: "Last 30 days", "All time", "2026". */
export const rangeTitle = (key) => RANGES.find((r) => r.key === key)?.title ?? key

export function rangeKey(value, fallback = DEFAULT_RANGE) {
  if (!value) return fallback
  if (RANGES.some((r) => r.key === value)) return value
  if (/^\d{4}(-\d{2})?$/.test(value)) return value
  return fallback
}

// The feed moves with each play (and its ranges with the clock): hourly.
// A page of one thing changes only when it's played: daily.
async function get(path, { revalidate = HOUR, tags = [FEED] } = {}) {
  const res = await fetch(API + path, { next: { revalidate, tags: [ALL, ...tags] } })
  if (res.status === 404) return null
  if (!res.ok) throw new Error(`Goonj ${res.status} for ${path}`)
  return res.json()
}

const q = (params) => {
  const s = new URLSearchParams(Object.entries(params).filter(([, v]) => v !== undefined && v !== ''))
  return s.size ? `?${s}` : ''
}

export const overview = (range, top = 10) => get(`/v1/overview${q({ range, top })}`)
export const topList = (kind, range, limit = 100, offset = 0) => get(`/v1/top/${kind}${q({ range, limit, offset })}`)
export const series = (range, bucket) => get(`/v1/series${q({ range, bucket })}`)
export const days = (range) => get(`/v1/days${q({ range })}`)
// Older history pages (before) only change if a play arrives late: daily.
export const recent = (before, limit = 100, track) =>
  get(`/v1/recent${q({ before, limit, track })}`, track ? { revalidate: DAY, tags: [keyTag('tracks', track)] } : before ? { revalidate: DAY, tags: [] } : {})
export const discoveries = (kind, range, limit = 50) => get(`/v1/discoveries/${kind}${q({ range, limit })}`)
export const entity = (kind, key) => get(`/v1/${kind}/${encodeURIComponent(key)}`, { revalidate: DAY, tags: [keyTag(kind, key)] })

/**
 * Public image URL for an album cover or artist photo (404 = none). size
 * 128 or 256 asks for a small copy (rows, tiles); none is the full image.
 */
export const imageUrl = (kind, key, size) =>
  key ? `${API}/v1/images/${kind}/${encodeURIComponent(key)}${size ? `?s=${size}` : ''}` : null

/** Raw image bytes, for picking a page's colours (null when there's no image). */
export async function imageBytes(kind, key) {
  if (!key) return null
  try {
    const res = await fetch(imageUrl(kind, key, 128), { next: { revalidate: DAY, tags: [ALL, keyTag(`${kind}s`, key)] } })
    if (!res.ok) return null
    return Buffer.from(await res.arrayBuffer())
  } catch {
    return null
  }
}
