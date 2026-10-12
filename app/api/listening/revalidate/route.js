import { revalidateTag } from 'next/cache'

// Goonj calls this (debounced) when new plays arrive, so the listening pages
// refresh without polling.
export async function POST(request) {
  const secret = process.env.GOONJ_REVALIDATE_SECRET
  if (!secret || request.headers.get('authorization') !== `Bearer ${secret}`) {
    return Response.json({ error: 'unauthorised' }, { status: 401 })
  }
  revalidateTag('goonj', 'max')
  return Response.json({ revalidated: true })
}
