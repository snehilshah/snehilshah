// Links work on both hosts: music.snehilshah.com serves this section at its
// root (LISTENING_BASE=""), snehilshah.com and local dev under /listening.
export const BASE = process.env.NEXT_PUBLIC_LISTENING_BASE ?? '/listening'

export const href = (path = '/') => (BASE + (path === '/' ? '' : path)) || '/'

export const artistHref = (key) => href(`/artists/${encodeURIComponent(key)}`)
export const albumHref = (key) => href(`/albums/${encodeURIComponent(key)}`)
export const trackHref = (key) => href(`/tracks/${encodeURIComponent(key)}`)

/** The range a page shows when none is picked; its links carry no ?range. */
export const DEFAULT_RANGE = '7d'

export const withRange = (path, range) => (range && range !== DEFAULT_RANGE ? `${href(path)}?range=${range}` : href(path))
