import { OverviewPage, overviewTitle } from './_pages/Overview'

export const revalidate = 600

export default function Overview() {
  return <OverviewPage range='30d' />
}

export const metadata = overviewTitle('30d')
