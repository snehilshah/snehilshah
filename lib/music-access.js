import 'server-only'
import { createHmac, timingSafeEqual } from 'node:crypto'

export const MUSIC_COOKIE = 'music_access'
export const SESSION_SECONDS = 7 * 24 * 60 * 60
// Bump to sign everyone out: older tokens stop validating.
const VERSION = 'v2'

export function accessConfigured() {
  return (
    process.env.MUSIC_SESSION_SECRET?.length >= 32 &&
    /^\d{4}-\d{2}-\d{2}$/.test(process.env.MUSIC_BIRTHDATE || '')
  )
}

function signature(value) {
  return createHmac('sha256', process.env.MUSIC_SESSION_SECRET)
    .update(value)
    .digest('base64url')
}

export function createMusicSession(now = Date.now()) {
  if (!accessConfigured()) throw new Error('Music access is not configured')
  const value = `music.${VERSION}.${Math.floor(now / 1000) + SESSION_SECONDS}`
  return `${value}.${signature(value)}`
}

export function validMusicSession(token, now = Date.now()) {
  if (!accessConfigured() || typeof token !== 'string' || token.length > 160)
    return false
  const match = /^(music\.(v\d+)\.(\d{10}))\.([A-Za-z0-9_-]{43})$/.exec(token)
  if (!match || match[2] !== VERSION) return false
  const expires = Number(match[3])
  const seconds = Math.floor(now / 1000)
  if (expires <= seconds || expires > seconds + SESSION_SECONDS) return false
  return timingSafeEqual(
    Buffer.from(match[4]),
    Buffer.from(signature(match[1]))
  )
}

export function correctBirthday(value) {
  if (!accessConfigured() || typeof value !== 'string') return false
  const expected = Buffer.from(process.env.MUSIC_BIRTHDATE)
  const actual = Buffer.from(value)
  return actual.length === expected.length && timingSafeEqual(actual, expected)
}

export function onMusicHost(host) {
  return Boolean(
    process.env.LISTENING_HOST &&
    host?.split(':')[0].toLowerCase() ===
      process.env.LISTENING_HOST.toLowerCase()
  )
}

export function musicBase(host) {
  return onMusicHost(host) ? '' : '/listening'
}

// Only return to this music section; never accept an external URL.
export function musicDestination(value, host) {
  const base = musicBase(host)
  const fallback = base || '/'
  if (
    typeof value !== 'string' ||
    !value.startsWith('/') ||
    value.startsWith('//') ||
    /[\\\r\n]/.test(value)
  )
    return fallback
  const path = value.split(/[?#]/)[0]
  if (base && path !== base && !path.startsWith(`${base}/`)) return fallback
  if (
    /^\/(?:api|_next)(?:\/|$)/.test(path) ||
    /^(?:\/listening)?\/unlock(?:\/|$)/.test(path)
  )
    return fallback
  return value
}
