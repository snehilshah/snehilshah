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
    <main className=''>
      <Head>
        <title>Snehil Shah | Portfolio</title>
        <meta charSet='UTF-8' />
        <meta name='description' content='Portfolio Website for Snehil Shah' />
        <meta
          name='keywords'
          content='Snehil Shah, Snehil, Shah, Snehil Shah Portfolio, Snehil Shah Website, Snehil Shah Developer, Snehil Shah Engineer, Snehil Shah Programmer, Snehil Shah Full Stack Developer'
        />
        <meta name='author' content='Snehil, Snehil Shah, Shah' />
        <link rel='icon' href='/favicon.ico' sizes='any' />
      </Head>
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
  )
}
