import './listening.css'
import { libron, productSans } from '@/styles/music-fonts'

export const metadata = {
  title: { default: 'Music · Snehil Shah', template: '%s · Music · Snehil Shah' },
  description: 'What I listen to, across my phone and computers.',
  robots: { index: false, follow: false }
}

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fdf7ff' },
    { media: '(prefers-color-scheme: dark)', color: '#141218' }
  ]
}

export default function ListeningLayout({ children }) {
  return <div className={`${libron.variable} ${productSans.variable}`}>{children}</div>
}
