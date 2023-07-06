import Header from '@/components/Blog/Header'
import Logo from '../../public/logo-s.png'
import Image from 'next/image'

function blogs() {
  return (
    <div className={'max-w-screen-2xl mx-auto'}>
      <Header />
      <div
        className={
          'flex justify-between items-center bg-yellow-400 border-y border-black py-10 lg:py-0'
        }
      >
        <div className={'px-10 space-y-5'}>
          <h1 className={'text-6xl max-w-xl font-serif'}>Read and Connect</h1>
          <h2>Stay Curious and Keep exploring</h2>
        </div>
        <Image
          src={Logo}
          className={'hidden md:inline-flex h-32 lg:h-full max-w-xs'}
          alt={'Snehil Logo'}
        />
      </div>
    </div>
  )
}

export default blogs