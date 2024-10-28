'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import NavBarLogo from '../SVG/NavbarLogo'
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
    },
  ]

  const [mobileNav, setMobileNav] = useState(false)

  useEffect(() => {
    let lastScrollTop = 0
    let navbar = document.getElementById('nav')
    window.addEventListener('scroll', () => {
      let scrollTop = window.scrollY || document.documentElement.scrollTop
      if (scrollTop > lastScrollTop) {
        navbar.style.top = '-100px'
      } else {
        navbar.style.top = '0'
      }
      lastScrollTop = scrollTop
    })
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
        <Link href={url}>{title}</Link>
      </li>
    )
  }
  const VerticalNavList = ({ title, url }) => {
    return (
      <motion.li
        className='uppercase py-6 text-4xl cursor-pointer'
        variants={{
          open: {
            y: 0,
            opacity: 1
          },
          closed: {
            y: '45%',
            opacity: 0
          }
        }}
      >
        <Link href={url}>{title}</Link>
      </motion.li>
    )
  }

  const topVariants = {
    open: { rotate: 45, y: 7, originX: '16px', originY: '10px' },
    closed: { rotate: 0, y: 0, originX: 0, originY: 0 }
  }

  const centerVariants = {
    open: { opacity: 0 },
    closed: { opacity: 1 }
  }

  const bottomVariants = {
    open: { rotate: -45, y: -5, originX: '16px', originY: '22px' },
    closed: { rotate: 0, y: 0, originX: 0, originY: 0 }
  }

  return (
    <nav id='nav' className='fixed w-full duration-700 shadow-2xl z-50'>
      <div className='flex justify-between items-center w-full h-20 bg-stone-950 text-white px-4'>
        <div className='ml-2 pb-1'>
          <NavBarLogo />
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
        <div
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
            <motion.rect
              animate={mobileNav ? 'open' : 'closed'}
              variants={topVariants}
              transition={{ duration: 0.7 }}
              x='6'
              y='9'
              width='20'
              height='2'
              rx='1'
              fill='currentColor'
            />
            <motion.rect
              animate={mobileNav ? 'open' : 'closed'}
              variants={centerVariants}
              transition={{ duration: 0.4 }}
              x='6'
              y='15'
              width='20'
              height='2'
              rx='1'
              fill='currentColor'
            />
            <motion.rect
              animate={mobileNav ? 'open' : 'closed'}
              variants={bottomVariants}
              transition={{ duration: 0.4 }}
              x='6'
              y='21'
              width='20'
              height='2'
              rx='1'
              fill='currentColor'
            />
          </svg>
        </div>
        <AnimatePresence>
          {mobileNav && (
            <motion.div
              variants={{
                open: {
                  y: '0%',
                  transition: {
                    when: 'beforeChildren',
                    duration: 0.5
                  }
                },
                closed: {
                  y: '-100%',
                  transition: {
                    when: 'afterChildren',
                    duration: 0.5
                  }
                }
              }}
              initial='closed'
              animate={'open'}
              exit={'closed'}
              className='flex flex-col justify-center items-center fixed top-0 left-0 w-screen h-3/4 bg-gradient-to-b from-black to-stone-900 opacity-90'
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
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}
