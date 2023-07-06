import '@/styles/globals.tail.css'
import localFont from 'next/font/local'

const cabinet = localFont({
  src: '../public/fonts/cabinet/CabinetGrotesk-Variable.woff2',
  variable: '--font-cabinet'
})

const supreme = localFont({
  src: '../public/fonts/supreme/Supreme-Variable.woff2',
  variable: '--font-supreme'
})

const sans = localFont({
  src: '../public/fonts/productSans/ProductSans-Regular.ttf'
  // variable: "--font-supreme",
})

export default function App({ Component, pageProps }) {
  return (
    <main
      className={`${supreme.variable} ${cabinet.variable} ${sans.className}`}
    >
      <Component {...pageProps} />
    </main>
  )
}
