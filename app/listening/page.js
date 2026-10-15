import { OverviewPage, overviewTitle } from './_pages/Overview'
import { DEFAULT_RANGE } from './_lib/paths'

export const revalidate = 600

export default function Overview() {
  return <OverviewPage range={DEFAULT_RANGE} />
}

export const metadata = overviewTitle(DEFAULT_RANGE)
