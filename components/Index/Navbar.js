'use client'
import { useEffect, useState } from 'react'
import { NavbarLogo } from '@/lib/svg'
import Link from 'next/link'

export default function Navbar() {
  const links = [
    {
      title: 'home',
      to: '#'
    },
    {
      title: 'about',
      to: '#'
    },
    {
      title: 'experience',
      to: '#'
    },
    {
      title: 'projects',
      to: '#'
    },
    {
      title: 'positions',
      to: '#'
    },
    {
      title: 'blogs',
      to: '/'
    }
  ]

  const [mobileNav, setMobileNav] = useState(false)

  useEffect(() => {
    let lastScrollTop = 0
    let navbar = document.getElementById('nav')
    let ticking = false

    const handleScroll = () => {
      let scrollTop = window.scrollY || document.documentElement.scrollTop
      if (!ticking) {
        // Throttling DOM updates using requestAnimationFrame to avoid layout thrashing
        window.requestAnimationFrame(() => {
          if (scrollTop > lastScrollTop) {
            navbar.style.top = '-100px'
          } else {
            navbar.style.top = '0'
          }
          lastScrollTop = scrollTop
          ticking = false
        })
        ticking = true
      }
    }

    // Using { passive: true } to improve scrolling performance
    window.addEventListener('scroll', handleScroll, { passive: true })

    // Added cleanup function to prevent memory leaks on unmount
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    let navbar = document.getElementById('nav')
    navbar.style.top = '-100px'
    setTimeout(() => {
      navbar.style.top = '0'
    }, 3000)
  }, [])

  const HorizontalNavList = ({ title, url }) => {
    return (
      <li className='font-supreme px-4 cursor-pointer uppercase font-medium text-sm text-stone-400 tracking-wide hover:scale-105 duration-200'>
        <Link href={url} prefetch={title === 'blogs' ? false : undefined}>{title}</Link>
      </li>
    )
  }
  const VerticalNavList = ({ title, url }) => {
    return (
      <li className={`uppercase py-6 text-4xl cursor-pointer transition-all duration-500 ${mobileNav ? 'translate-y-0 opacity-100' : 'translate-y-[45%] opacity-0'}`}>
        <Link href={url} prefetch={title === 'blogs' ? false : undefined}>{title}</Link>
      </li>
    )
  }

  return (
    <nav id='nav' className='fixed w-full duration-700 shadow-2xl z-50'>
      <div className='flex justify-between items-center w-full h-20 bg-stone-950 text-white px-4'>
        <div className='ml-2 pb-1'>
          <NavbarLogo />
        </div>
        <ul className='hidden md:flex'>
          {links.map((link, index) => {
            return (
              <HorizontalNavList
                title={link.title}
                url={link.to + link.title}
                key={index}
              />
            )
          })}
        </ul>
        <button
          type='button'
          aria-label='Toggle navigation'
          aria-expanded={mobileNav}
          onClick={() => {
            setMobileNav(!mobileNav)
          }}
          className='cursor-pointer md:hidden text-gray-500 pr-4 z-10'
        >
          <svg
            width='48'
            height='48'
            viewBox='0 0 32 32'
            fill='none'
            xmlns='http://www.w3.org/2000/svg'
          >
            <rect
              x='6'
              y='9'
              width='20'
              height='2'
              rx='1'
              fill='currentColor'
              className='transition-transform duration-700'
              style={{ transform: mobileNav ? 'translateY(7px) rotate(45deg)' : 'none', transformOrigin: '16px 10px' }}
            />
            <rect
              x='6'
              y='15'
              width='20'
              height='2'
              rx='1'
              fill='currentColor'
              className={`transition-opacity duration-400 ${mobileNav ? 'opacity-0' : 'opacity-100'}`}
            />
            <rect
              x='6'
              y='21'
              width='20'
              height='2'
              rx='1'
              fill='currentColor'
              className='transition-transform duration-400'
              style={{ transform: mobileNav ? 'translateY(-7px) rotate(-45deg)' : 'none', transformOrigin: '16px 22px' }}
            />
          </svg>
        </button>
        <div
          aria-hidden={!mobileNav}
          inert={!mobileNav}
          className={`flex flex-col justify-center items-center fixed top-0 left-0 w-screen h-3/4 bg-linear-to-b from-black to-stone-900 opacity-90 transition-transform duration-500 ${mobileNav ? 'translate-y-0' : '-translate-y-full pointer-events-none'}`}
        >
          <ul className='text-center'>
            {links.map((link, index) => {
              return (
                <VerticalNavList
                  title={link.title}
                  url={link.to + link.title}
                  key={index}
                />
              )
            })}
          </ul>
        </div>
      </div>
    </nav>
  )
}
