import { HistoryPage } from '../_pages/History'

export const revalidate = 300
export const metadata = { title: 'History' }

export default function History() {
  return <HistoryPage />
}
