import { TopPage, topStaticParams, topTitle } from '../../../_pages/Top'

// Reached as /albums?range=7d (a rewrite in next.config.js).
export const revalidate = 600
export const generateStaticParams = topStaticParams

export default async function Albums({ params }) {
  return <TopPage kind='albums' range={(await params).range} />
}

export async function generateMetadata({ params }) {
  return topTitle('albums', (await params).range)
}
