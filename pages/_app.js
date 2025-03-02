import '@/styles/globals.tail.css'
import localFont from 'next/font/local'
import Head from 'next/head'
import { Analytics } from '@vercel/analytics/react'

const cabinet = localFont({
  src: '../public/fonts/cabinet/CabinetGrotesk-Variable.woff2',
  variable: '--font-cabinet'
})

const copernicus = localFont({
  src: '../public/fonts/corp/copernicus.ttf',
  variable: '--font-copernicus'
})

const supreme = localFont({
  src: '../public/fonts/supreme/Supreme-Variable.woff2',
  variable: '--font-supreme'
})

const product = localFont({
  src: '../public/fonts/productSans/ProductSans-Regular.ttf',
  variable: '--font-product'
})

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta
          name='google-site-verification'
          content='b1Y-2ooYNQfS62XWzvjH0-APwdJZpv3XRa9XF8kW6wk'
        />
        <meta charSet='UTF-8' />
        <meta
          name='keywords'
          content='Snehil Shah, Snehil, Portfolio, Engineer, Web Developer'
        />
        <meta name='author' content='Snehil, Snehil Shah, Shah' />
        <meta property='og:url' content='https://snehilshah.com' />
        <meta property='og:site_name' content='Snehil' />
        <meta property='og:type' content='website' />
        <meta property='og:locale' content='en_IN' />
        <link rel='icon' href='/SRfavicon.ico' />
      </Head>
      <main
        className={`${supreme.variable} ${cabinet.variable} ${copernicus.variable} ${product.variable}`}
      >
        <Component {...pageProps} />
        <Analytics />
      </main>
    </>
  )
}
