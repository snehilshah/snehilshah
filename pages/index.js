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
        <meta name='description' content='Portfolio Website for Snehil Shah' />
        <meta name='image' content='https://www.srshah.me/SnehilImage3x.jpg' />
        <meta property='og:title' content='Snehil Shah | Portfolio' />
        <meta
          property='og:description'
          content='Portfolio Website for Snehil Shah'
        />
        <meta
          property='og:image'
          content='https://www.srshah.me/SnehilImage3x.jpg'
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
