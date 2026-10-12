import { TopPage, topStaticParams, topTitle } from '../../../_pages/Top'

// Reached as /tracks?range=7d (a rewrite in next.config.js).
export const revalidate = 600
export const generateStaticParams = topStaticParams

export default async function Tracks({ params }) {
  return <TopPage kind='tracks' range={(await params).range} />
}

export async function generateMetadata({ params }) {
  return topTitle('tracks', (await params).range)
}
