import Loader from '@/components/Loader'
import Navbar from '@/components/Navbar'
import BGGrid from '@/components/BGGrid'
import HeroSection from '@/components/Hero/HeroSection'
export default function Home() {
  return (
    <main>
      <Loader />
      <Navbar />
      <BGGrid />
      <HeroSection />
      {/* <div className=' h-[200vh]'></div> */}
    </main>
  )
}
