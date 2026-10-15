import { notFound } from 'next/navigation'
import { OverviewPage, overviewTitle } from '../../_pages/Overview'
import { RANGES, rangeKey } from '../../_lib/goonj'
import { DEFAULT_RANGE } from '../../_lib/paths'

// The overview for another range. Reached as /?range=7d (a rewrite in
// next.config.js), so each range is its own cached page.
export const revalidate = 600

export function generateStaticParams() {
  return RANGES.filter((r) => r.key !== DEFAULT_RANGE).map((r) => ({ range: r.key }))
}

export default async function Overview({ params }) {
  const { range } = await params
  if (rangeKey(range, null) !== range) notFound()
  return <OverviewPage range={range} />
}

export async function generateMetadata({ params }) {
  return overviewTitle((await params).range)
}
