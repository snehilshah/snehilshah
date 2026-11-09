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
    const close = e => {
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

  const iconClass = 'size-[22px] shrink-0'
  const socialLinks = [
    {
      id: 1,
      icon: <LinkedinLogo className={iconClass} />,
      text: 'Linkedin',
      href: 'https://www.linkedin.com/in/snehil-shah-7794a9209/'
    },
    {
      id: 2,
      icon: <GithubLogo className={iconClass} />,
      text: 'Github',
      href: 'https://github.com/snehilshah'
    },
    {
      id: 3,
      icon: <Mail aria-hidden='true' className={iconClass} />,
      text: 'Mail',
      href: 'mailto:snehilshah27@gmail.com'
    },
    {
      id: 4,
      icon: <UserRound aria-hidden='true' className={iconClass} />,
      text: 'Resume',
      href: '/SnehilShahResume.pdf'
    }
  ]

  const lastId = socialLinks.at(-1).id

  return (
    <div ref={barRef} className='fixed right-0 top-[35%] z-50'>
      {/* Frosted teal glass: each row is a 160px tab showing only its icon until it slides out.
          The outline runs around the outside of the stack, never between rows. */}
      <ul className='flex flex-col items-end'>
        {socialLinks.map(({ icon, text, href, id }) => (
          <li
            key={id}
            data-open={openId === id}
            className={
              'group h-13 w-40 translate-x-26 border-l border-cyan-200/35 text-cyan-50 backdrop-blur-xl backdrop-saturate-150 ' +
              'bg-teal-100/20 ' +
              'transition-[translate,background-color,border-radius] duration-300 ' +
              'hover:translate-x-0 hover:rounded-l-xl hover:border-y hover:bg-cyan-800/90 ' +
              'focus-within:translate-x-0 focus-within:rounded-l-xl focus-within:border-y focus-within:bg-cyan-800/90 ' +
              'data-[open=true]:translate-x-0 data-[open=true]:rounded-l-xl data-[open=true]:border-y data-[open=true]:bg-cyan-800/90 ' +
              (id === socialLinks[0].id
                ? 'rounded-tl-2xl border-t shadow-[inset_0_1px_0_rgba(255,255,255,0.3)] '
                : '') +
              (id === lastId ? 'rounded-bl-2xl border-b' : '')
            }
          >
            <a
              href={href}
              target='_blank'
              rel='noopener noreferrer'
              onClick={e => handleClick(e, id)}
              className='flex h-full w-full items-center gap-3 px-4 font-semibold tracking-wide rounded-[inherit] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-cyan-200'
            >
              {icon}
              <span className='whitespace-nowrap opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-within:opacity-100 group-data-[open=true]:opacity-100'>
                {text}
              </span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default SocialBar
