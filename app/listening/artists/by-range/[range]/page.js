import { TopPage, topStaticParams, topTitle } from '../../../_pages/Top'

// Reached as /artists?range=7d (a rewrite in next.config.js).
export const revalidate = 600
export const generateStaticParams = topStaticParams

export default async function Artists({ params }) {
  return <TopPage kind='artists' range={(await params).range} />
}

export async function generateMetadata({ params }) {
  return topTitle('artists', (await params).range)
}
