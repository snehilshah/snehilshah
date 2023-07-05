import Loader from '@/components/Index/Loader'
import Navbar from '@/components/Index/Navbar'
import BGGrid from '@/components/Index/BGGrid'
import HeroSection from '@/components/Index/Hero/HeroSection'
import SocialBar from '@/components/Index/SocialBar'
import About from '@/components/Index/About/About'
import Experience from '@/components/Index/Experience/Experience'
import Projects from '@/components/Index/Projects/Projects'
import Timeline from '@/components/Index/Timeline/Timeline'
import Footer from '@/components/Index/Footer/Footer'
import Cursor from '@/components/Index/Cursor'

export default function Home() {
  return (
    <main className=''>
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
