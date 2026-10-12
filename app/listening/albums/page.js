import { TopPage, topTitle } from '../_pages/Top'

export const revalidate = 600

export default function Albums() {
  return <TopPage kind='albums' range='30d' />
}

export const metadata = topTitle('albums', '30d')
