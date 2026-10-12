import 'server-only'

// Goonj, the listening history every device reports to. Data is cached and
// refreshed when Goonj says new plays arrived (tag "goonj"), with a time
// fallback in case that call is ever missed.
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

export function rangeKey(value, fallback = '30d') {
  if (!value) return fallback
  if (RANGES.some((r) => r.key === value)) return value
  if (/^\d{4}(-\d{2})?$/.test(value)) return value
  return fallback
}

async function get(path, { revalidate = 600 } = {}) {
  const res = await fetch(API + path, { next: { revalidate, tags: ['goonj'] } })
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
export const rediscover = (limit = 12) => get(`/v1/rediscover${q({ limit })}`)
export const recent = (before, limit = 100, track) => get(`/v1/recent${q({ before, limit, track })}`, { revalidate: 300 })
export const discoveries = (kind, range, limit = 50) => get(`/v1/discoveries/${kind}${q({ range, limit })}`)
export const entity = (kind, key) => get(`/v1/${kind}/${encodeURIComponent(key)}`)

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
    const res = await fetch(imageUrl(kind, key, 128), { next: { revalidate: 86400 } })
    if (!res.ok) return null
    return Buffer.from(await res.arrayBuffer())
  } catch {
    return null
  }
}
