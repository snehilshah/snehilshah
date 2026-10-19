import { after } from 'next/server'
import { revalidateTag } from 'next/cache'
import { ALL, FEED, keyTag } from '@/app/listening/_lib/goonj'

// Goonj calls this (batched over a few seconds) with what changed:
// { feed, tracks, albums, artists } after plays, { all } after an import.
// Only those pages rebuild; a play of one song leaves every other song's,
// album's and artist's page cached. Expired outright, not marked stale: the
// next view shows the new play instead of one more stale page. When the
// feed changed, the overview is rebuilt here, so its next visitor doesn't
// wait for it. A body without these fields (older Goonj) expires everything.
export async function POST(request) {
  const secret = process.env.GOONJ_REVALIDATE_SECRET
  if (!secret || request.headers.get('authorization') !== `Bearer ${secret}`) {
    return Response.json({ error: 'unauthorised' }, { status: 401 })
  }
  const body = await request.json().catch(() => ({}))
  const keys = (v) => (Array.isArray(v) ? v.filter((k) => typeof k === 'string') : [])
  const named = ['feed', 'tracks', 'albums', 'artists'].some((f) => f in body)
  const tags = new Set()
  if (body.all || !named) tags.add(ALL)
  if (body.feed) tags.add(FEED)
  for (const kind of ['tracks', 'albums', 'artists']) for (const key of keys(body[kind])) tags.add(keyTag(kind, key))
  for (const tag of tags) revalidateTag(tag, { expire: 0 })

  const host = process.env.LISTENING_HOST
  if (host && (tags.has(ALL) || tags.has(FEED))) {
    after(() => fetch(`https://${host}/`, { cache: 'no-store' }).catch(() => {}))
  }
  return Response.json({ revalidated: tags.size })
}
