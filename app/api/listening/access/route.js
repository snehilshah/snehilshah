import { after, NextResponse } from 'next/server'
import {
  accessConfigured,
  correctBirthday,
  createMusicSession,
  MUSIC_COOKIE,
  musicBase,
  musicDestination,
  SESSION_SECONDS
} from '@/lib/music-access'
import { requestDetails, sendAttemptAlert } from '@/lib/music-alert'

// Best-effort per-instance throttling. Use an edge/WAF rate limit as well for
// distributed deployments; this memory is not shared between instances.
const attempts = new Map()
const WINDOW = 15 * 60 * 1000
const LIMIT = 10

/** This IP's submission count in the current window (over LIMIT means blocked). */
function count(request) {
  const now = Date.now()
  for (const [key, entry] of attempts)
    if (entry.until <= now) attempts.delete(key)
  const key =
    request.headers.get('x-forwarded-for')?.split(',')[0].trim() || 'local'
  const entry = attempts.get(key) || { count: 0, until: now + WINDOW }
  if (!attempts.has(key) && attempts.size >= 2000) return Infinity
  attempts.set(key, entry)
  return ++entry.count
}

export async function POST(request) {
  const wantsJson = request.headers.get('accept')?.includes('application/json')
  const origin = request.headers.get('origin')
  let originHost
  try {
    originHost = new URL(origin).host
  } catch {
    /* Reject malformed origins. */
  }
  if (!originHost || originHost !== request.headers.get('host')) {
    return Response.json(
      { error: 'Please submit from the music page.' },
      { status: 403 }
    )
  }
  if (Number(request.headers.get('content-length')) > 16384)
    return new Response(null, { status: 413 })
  const form = await request.formData().catch(() => null)
  if (!form) return Response.json({ error: 'Invalid form.' }, { status: 400 })
  const host = request.headers.get('host')
  const next = musicDestination(form.get('next'), host)
  const url = new URL(`${musicBase(host)}/unlock`, request.url)
  url.searchParams.set('next', next)

  if (form.get('intent') === 'lock') {
    const response = NextResponse.redirect(url, 303)
    response.cookies.set(MUSIC_COOKIE, '', {
      path: '/',
      maxAge: 0,
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production'
    })
    response.headers.set('Cache-Control', 'private, no-store')
    return response
  }

  let error
  let tries = 0
  const birthday = form.get('birthday')
  if (!accessConfigured()) error = 'unavailable'
  else if ((tries = count(request)) > LIMIT) error = 'limited'
  else if (!correctBirthday(birthday)) error = 'incorrect'

  // Email every attempt; once blocked, only the first blocked one.
  if (error !== 'unavailable' && (error !== 'limited' || tries === LIMIT + 1)) {
    const details = requestDetails(request)
    const client = form.get('client')
    after(() =>
      sendAttemptAlert({
        outcome: error || 'unlocked',
        guess: typeof birthday === 'string' ? birthday : undefined,
        next,
        details,
        client
      })
    )
  }

  if (error) {
    if (wantsJson) {
      return NextResponse.json(
        { error },
        {
          status: error === 'incorrect' ? 401 : error === 'limited' ? 429 : 503,
          headers: { 'Cache-Control': 'private, no-store' }
        }
      )
    }
    url.searchParams.set('error', error)
    const response = NextResponse.redirect(url, 303)
    response.headers.set('Cache-Control', 'private, no-store')
    return response
  }

  const response = wantsJson
    ? NextResponse.json({ next })
    : NextResponse.redirect(new URL(next, request.url), 303)
  response.cookies.set(MUSIC_COOKIE, createMusicSession(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: SESSION_SECONDS,
    expires: new Date(Date.now() + SESSION_SECONDS * 1000)
  })
  response.headers.set('Cache-Control', 'private, no-store')
  return response
}
