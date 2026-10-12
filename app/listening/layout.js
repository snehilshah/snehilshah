import './listening.css'
import { chubbo } from '@/styles/fonts'

export const metadata = {
  title: { default: 'Listening · Snehil Shah', template: '%s · Listening' },
  description: 'What I listen to, across my phone and computers.'
}

export const viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#fdf7ff' },
    { media: '(prefers-color-scheme: dark)', color: '#141218' }
  ]
}

export default function ListeningLayout({ children }) {
  return <div className={`${chubbo.variable} font-supreme`}>{children}</div>
}
