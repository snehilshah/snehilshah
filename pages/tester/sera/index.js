import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Snehil Shah | Portfolio</title>
        <meta name='description' content='Portfolio Website for Snehil Shah' />
        <meta name='image' content='https://www.snehilshah.com/SnehilImage3x.jpg' />
        <meta property='og:title' content='Snehil Shah | Portfolio' />
        <meta
          property='og:description'
          content='Portfolio Website for Snehil Shah'
        />
        <meta
          property='og:image'
          content='https://www.snehilshah.com/SnehilImage3x.jpg'
        />
      </Head>
      <main id='unique__main'>
        <div className='main__container'>
          <h1>Hello, World!!</h1>
          <div className='unique'>
            <h2>First Heading2</h2>
            <h2>Second Heading2</h2>
          </div>
        </div>
        <div>
          <h2>Third Heading2</h2>
        </div>
        <footer>
          There is only one footer tag in the whole html
        </footer>
      </main>
    </>
  )
}
