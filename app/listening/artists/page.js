import { TopPage, topTitle } from '../_pages/Top'

export const revalidate = 600

export default function Artists() {
  return <TopPage kind='artists' range='30d' />
}

export const metadata = topTitle('artists', '30d')
