import Loader from '@/components/Loader'
import Navbar from '@/components/Navbar'
import BGGrid from '@/components/BGGrid'
import HeroSection from '@/components/Hero/HeroSection'
import SocialBar from '@/components/SocialBar'
import About from '@/components/About/About'
import Experience from '@/components/Experience/Experience'
import Projects from '@/components/Projects/Projects'
import Timeline from '@/components/Timeline/Timeline'
import Footer from '@/components/Footer/Footer'
import Cursor from '@/components/Cursor'

export default function Home() {
  return (
    <main className=''>
      <Loader />
      <Cursor />
      <Navbar />
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
