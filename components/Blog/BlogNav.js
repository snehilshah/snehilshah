import NavBarLogo from '../SVG/NavbarLogo'
import Link from 'next/link'

export default function BlogNav() {
  return (
    <header className='p-4 flex justify-center relative bg-stone-900'>
      <NavBarLogo />
      <Link href={'/'}>
        <button className='text-stone-300 inline-flex items-center bg-stone-500 py-1 px-3 rounded mt-4 md:mt-0 absolute right-5 top-6'>
          Portfolio
          <svg
            fill='none'
            stroke='currentColor'
            stroke-linecap='round'
            stroke-linejoin='round'
            stroke-width='2'
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
