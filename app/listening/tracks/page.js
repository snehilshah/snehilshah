import { TopPage, topTitle } from '../_pages/Top'

export const revalidate = 600

export default function Tracks() {
  return <TopPage kind='tracks' range='30d' />
}

export const metadata = topTitle('tracks', '30d')
