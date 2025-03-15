import Loader from '@/components/Index/Loader'
import Cursor from '@/components/Index/Cursor'
import BGGrid from '@/components/Index/BGGrid'
import HeroSection from '@/components/Index/Hero/HeroSection'
import SocialBar from '@/components/Index/SocialBar'
import About from '@/components/Index/About/About'

import TechStack from '@/components/Index/TechStack/TechStack'
import Projects from '@/components/Index/Projects/Projects'
// import Timeline from '@/components/Index/Timeline/Timeline'
import Footer from '@/components/Index/Footer/Footer'
import Navbar from '@/components/Index/Navbar'

export default function Home() {
  return (
    <main className=''>
      <Navbar />
      <Loader />
      <Cursor />
      <BGGrid />
      <HeroSection />
      <SocialBar />
      <About />
      <TechStack />
      <Projects />
      {/* <Timeline /> */}
      <Footer />
    </main>
  )
}
