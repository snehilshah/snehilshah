import { HistoryPage } from '../_pages/History'

export const revalidate = 3600
export const metadata = { title: 'History' }

export default function History() {
  return <HistoryPage />
}
