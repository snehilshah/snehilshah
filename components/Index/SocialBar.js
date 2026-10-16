'use client'

import { useEffect, useRef, useState } from 'react'
import { UserRound, Mail } from 'lucide-react'
import { GithubLogo, LinkedinLogo } from '@/lib/svg'

const SocialBar = () => {
  // Touch devices have no hover, so the first tap opens a row and the second follows the link
  const [openId, setOpenId] = useState(null)
  const barRef = useRef(null)

  useEffect(() => {
    if (openId === null) return
    const close = (e) => {
      if (!barRef.current?.contains(e.target)) setOpenId(null)
    }
    document.addEventListener('pointerdown', close)
    return () => document.removeEventListener('pointerdown', close)
  }, [openId])

  const handleClick = (e, id) => {
    if (window.matchMedia('(hover: hover)').matches || openId === id) return
    e.preventDefault()
    setOpenId(id)
  }

  const socialLinks = [
    {
      id: 1,
      icon: <LinkedinLogo className='text-2xl shrink-0' />,
      text: 'Linkedin',
      href: 'https://www.linkedin.com/in/snehil-shah-7794a9209/',
      style: 'rounded-tl-lg'
    },
    {
      id: 2,
      icon: <GithubLogo className='text-2xl shrink-0' />,
      text: 'Github',
      href: 'https://github.com/snehilshah'
    },
    {
      id: 3,
      icon: <Mail aria-hidden='true' className='text-2xl shrink-0' />,
      text: 'Mail',
      href: 'mailto:snehilshah27@gmail.com'
    },
    {
      id: 4,
      icon: <UserRound aria-hidden='true' className='text-2xl shrink-0' />,
      text: 'Resume',
      href: '/SnehilShahResume.pdf',
      style: 'rounded-bl-lg'
    }
  ]

  return (
    <div ref={barRef} className='flex flex-col top-[35%] right-0 fixed z-50'>
      <ul className='divide-y divide-stone-300'>
        {socialLinks.map(({ icon, text, href, style = '', id }) => (
          <li
            key={id}
            className={
              'w-40 h-14 duration-300 bg-stone-200/95 text-stone-950 shadow-lg shadow-black/40 ' +
              'hover:translate-x-[10px] hover:rounded-l-lg hover:bg-cyan-200 hover:text-stone-950 ' +
              'focus-within:translate-x-[10px] focus-within:rounded-l-lg focus-within:bg-cyan-200 ' +
              (openId === id
                ? 'translate-x-[10px] rounded-l-lg bg-cyan-200'
                : 'translate-x-[100px]') +
              ' ' +
              style
            }
          >
            <a
              href={href}
              target='_blank'
              rel='noopener noreferrer'
              onClick={(e) => handleClick(e, id)}
              className='flex justify-between items-center w-full h-full px-4 font-semibold tracking-wide focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-stone-950'
            >
              {icon}
              <span>{text}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SocialBar
