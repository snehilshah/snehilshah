import '@/styles/globals.tail.css'
import { supreme, product, copernicus, cabinet } from '@/styles/fonts'

const fontClasses = [
  supreme.variable,
  product.variable,
  cabinet.variable,
  copernicus.variable
].join(' ')

export const metadata = {
  title: 'Snehil Shah | Portfolio',
  description: 'Portfolio Website for Snehil Shah'
}

export default function RootLayout({ children }) {
  return (
    <html lang='en' className=''>
      <body className={`${fontClasses} font-product`}>{children}</body>
    </html>
  )
}
