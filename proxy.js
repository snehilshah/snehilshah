import { NextResponse } from 'next/server'
import {
  MUSIC_COOKIE,
  musicBase,
  musicDestination,
  onMusicHost,
  validMusicSession
} from './lib/music-access'

export function proxy(request) {
  const { pathname, search } = request.nextUrl
  const host = request.headers.get('host')
  const musicPath =
    pathname === '/listening' || pathname.startsWith('/listening/')
  if (!musicPath && !onMusicHost(host)) return NextResponse.next()

  const unlockedPage =
    pathname === '/unlock' || pathname === '/listening/unlock'
  const hasAccess = validMusicSession(request.cookies.get(MUSIC_COOKIE)?.value)
  if (unlockedPage && hasAccess) {
    const response = NextResponse.redirect(
      new URL(
        musicDestination(request.nextUrl.searchParams.get('next'), host),
        request.url
      )
    )
    response.headers.set('Cache-Control', 'private, no-store')
    response.headers.set('X-Robots-Tag', 'noindex, nofollow')
    return response
  }
  if (!unlockedPage && !hasAccess) {
    const url = request.nextUrl.clone()
    url.pathname = `${musicBase(host)}/unlock`
    url.search = ''
    url.searchParams.set('next', pathname + search)
    const response = NextResponse.redirect(url)
    response.headers.set('Cache-Control', 'private, no-store')
    response.headers.set('X-Robots-Tag', 'noindex, nofollow')
    return response
  }

  const response = NextResponse.next()
  // Keep the existing server data cache, but never cache private responses in a browser/CDN.
  response.headers.set('Cache-Control', 'private, no-store')
  response.headers.set('X-Robots-Tag', 'noindex, nofollow')
  return response
}

export const config = {
  matcher: [
    '/((?!api/|_next/static/|_next/image|fonts/|music/cover/|favicon.ico).*)'
  ]
}
