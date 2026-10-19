import { TopPage, topTitle } from '../_pages/Top'
import { DEFAULT_RANGE } from '../_lib/paths'

export const revalidate = 3600

export default function Albums() {
  return <TopPage kind='albums' range={DEFAULT_RANGE} />
}

export const metadata = topTitle('albums', DEFAULT_RANGE)
