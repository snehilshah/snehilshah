import { TopPage, topTitle } from '../_pages/Top'
import { DEFAULT_RANGE } from '../_lib/paths'

export const revalidate = 600

export default function Tracks() {
  return <TopPage kind='tracks' range={DEFAULT_RANGE} />
}

export const metadata = topTitle('tracks', DEFAULT_RANGE)
