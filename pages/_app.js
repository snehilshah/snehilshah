import '@/styles/globals.tail.css'
import localFont from 'next/font/local'
import Script from 'next/script'

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
    <>
      <Script
        strategy='lazyOnload'
        src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
      />
      <Script id='google-analytics-script' strategy='lazyOnload'>
        {` 
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          
          gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
        `}
      </Script>
      <main
        className={`${supreme.variable} ${cabinet.variable} ${sans.className}`}
      >
        <Component {...pageProps} />
      </main>
    </>
  )
}
