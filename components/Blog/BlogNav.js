import Image from 'next/image'
import NavBarLogo from '../SVG/NavbarLogo'
import Link from 'next/link'

export default function BlogNav() {
  return (
    <header className='p-4 flex justify-between items-center relative bg-stone-900'>
      <Image src={'/SnehilLogo/Slice1.svg'} width={"110"} height={"110"}/>
      <Link href={'/'} className=''>
        <button className='text-stone-300 flex items-center bg-stone-500 py-1 px-3 rounded-xl'>
          Portfolio
          <svg
            fill='none'
            stroke='currentColor'
            strokeLinecap='round'
            strokeLinejoin='round'
            strokeWidth='2'
            className='w-4 h-4 ml-1'
            viewBox='0 0 24 24'
          >
            <path d='M5 12h14M12 5l7 7-7 7'></path>
          </svg>
        </button>
      </Link>
    </header>
  )
}
