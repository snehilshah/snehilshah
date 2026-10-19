import { notFound } from 'next/navigation'
import { HistoryPage } from '../../../_pages/History'

// Older history, reached as /history?before=<ms> (a rewrite in next.config.js).
export const revalidate = 86400
export const metadata = { title: 'History' }

export function generateStaticParams() {
  return []
}

export default async function OlderHistory({ params }) {
  const before = Number((await params).ts)
  if (!Number.isSafeInteger(before) || before <= 0) notFound()
  return <HistoryPage before={before} />
}
