import Link from 'next/link'
import Image from 'next/image'
import Logo from '../../public/logo-s.png'

export default function Header() {
  return (
    <header className={'flex justify-between p-5 max-w-7xl mx-auto'}>
      <div className={'flex items-center space-x-5'}>
        <Link href={'/'}>
          <Image
            src={Logo}
            alt={'Logo'}
            className={'w-8 object-contain cursor-pointer'}
          />
        </Link>
        <div className={'hidden md:inline-flex items-center space-x-5'}>
          <h3>About</h3>
          <h3>Contact</h3>
          <h3 className={'text-white bg-green-600 px-4 py-1 rounded-full'}>
            Follow
          </h3>
        </div>
      </div>

      <div className={'flex items-center space-x-5 text-green-600'}>
        <h3>SignIn</h3>
        <h3 className={'border px-4 py-1 rounded-full border-green-600'}>
          Get Started
        </h3>
      </div>
    </header>
  )
}
