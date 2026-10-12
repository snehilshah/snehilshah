import { after } from 'next/server'
import { revalidateTag } from 'next/cache'

// Goonj calls this (debounced) when new plays arrive, so the listening pages
// refresh without polling. Expired outright, not marked stale: the next view
// shows the new play instead of one more stale page. The overview is then
// rebuilt here, so its next visitor doesn't wait for it.
export async function POST(request) {
  const secret = process.env.GOONJ_REVALIDATE_SECRET
  if (!secret || request.headers.get('authorization') !== `Bearer ${secret}`) {
    return Response.json({ error: 'unauthorised' }, { status: 401 })
  }
  revalidateTag('goonj', { expire: 0 })
  const host = process.env.LISTENING_HOST
  if (host) {
    after(() => fetch(`https://${host}/`, { cache: 'no-store' }).catch(() => {}))
  }
  return Response.json({ revalidated: true })
}
