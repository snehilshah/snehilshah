import '@/styles/globals.tail.css'
import { supreme, product, copernicus, cabinet } from '@/styles/fonts'
import '@/constants/defaultMetadata'
import { defaultMetadata } from '@/constants/defaultMetadata'

const fontClasses = [
  supreme.variable,
  product.variable,
  cabinet.variable,
  copernicus.variable
].join(' ')

export const metadata = {
  ...defaultMetadata
}

export default function RootLayout({ children }) {
  return (
    <html lang='en' className=''>
      <body className={`${fontClasses} font-product`}>{children}</body>
    </html>
  )
}
