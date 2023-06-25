import Loader from '@/components/Loader'
import Navbar from '@/components/Navbar'
import BGGrid from '@/components/BGGrid'
export default function Home() {
  return (
    <main>
      {/* <Loader /> */}
      <Navbar />
      {/* <div className="bg-red-600 h-[200vh]"></div> */}
      <BGGrid />
    </main>
  )
}
