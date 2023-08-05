import Loader from '@/components/Index/Loader'
import Cursor from '@/components/Index/Cursor'
import BGGrid from '@/components/Index/BGGrid'
import HeroSection from '@/components/Index/Hero/HeroSection'
import SocialBar from '@/components/Index/SocialBar'
import About from '@/components/Index/About/About'
import Experience from '@/components/Index/Experience/Experience'
import Projects from '@/components/Index/Projects/Projects'
import Timeline from '@/components/Index/Timeline/Timeline'
import Footer from '@/components/Index/Footer/Footer'
import Navbar from '@/components/Index/Navbar'
import Head from 'next/head'

export default function Home() {
  return (
    <>
      <Head>
        <title>Snehil Shah | Portfolio</title>
        <meta name='og:title' content='Snehil Shah | Portfolio' />
        <meta name='description' content='Portfolio Website for Snehil Shah' />
        <meta
          name='og:description'
          content='Portfolio Website for Snehil Shah'
        />
        <meta
          name='image'
          content='https://raw.githubusercontent.com/srshah27/srshah27/master/public/SnehilImage.jpg?token=GHSAT0AAAAAACD2NHDQ63AMHPRFZKQU6XAMZGO2G2A'
        />
        <meta
          name='og:image'
          content='https://raw.githubusercontent.com/srshah27/srshah27/master/public/SnehilImage.jpg?token=GHSAT0AAAAAACD2NHDQ63AMHPRFZKQU6XAMZGO2G2A'
        />
      </Head>
      <main className=''>
        <Navbar />
        <Loader />
        <Cursor />
        <BGGrid />
        <HeroSection />
        <SocialBar />
        <About />
        <Experience />
        <Projects />
        <Timeline />
        <Footer />
      </main>
    </>
  )
}
