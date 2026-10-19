import { TopPage, topTitle } from '../_pages/Top'
import { DEFAULT_RANGE } from '../_lib/paths'

export const revalidate = 3600

export default function Artists() {
  return <TopPage kind='artists' range={DEFAULT_RANGE} />
}

export const metadata = topTitle('artists', DEFAULT_RANGE)
