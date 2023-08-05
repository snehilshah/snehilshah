import '@/styles/globals.tail.css'
import localFont from 'next/font/local'
import Script from 'next/script'
import Head from 'next/head'

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
      <Head>
        <meta charSet='UTF-8' />
        <meta
          name='keywords'
          content='Snehil Shah, Snehil, Shah, Snehil Shah Portfolio, Snehil Shah Website, Snehil Shah Developer, Snehil Shah Engineer, Snehil Shah Programmer, Snehil Shah Full Stack Developer'
        />
        <meta name='author' content='Snehil, Snehil Shah, Shah' />
        <meta property='og:url' content='https://srshah.me' />
        <meta property='og:site_name' content='Snehil' />
        <meta property='og:type' content='website' />
        <link rel='icon' href='/favicon.ico' sizes='any' />
      </Head>
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
