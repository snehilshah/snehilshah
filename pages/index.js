import Loader from '@/components/Loader'
import Navbar from '@/components/Navbar'
import BGGrid from '@/components/BGGrid'
import HeroSection from '@/components/Hero/HeroSection'
import SocialBar from '@/components/SocialBar'
import About from '@/components/About/About'
import Experience from '@/components/Experience/Experience'
export default function Home() {
  return (
    <main className=''>
      {/* <Loader /> */}
      <Navbar />
      <BGGrid />
      <HeroSection />
      <SocialBar /> 
      <About />
      <Experience />
      <div className=' h-[200vh]'></div>
    </main>
  )
}
