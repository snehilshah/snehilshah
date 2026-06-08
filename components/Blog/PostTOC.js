'use client'
import { useEffect, useState } from 'react'

export default function PostTOC({ toc }) {
  const [active, setActive] = useState(toc[0]?.id)

  useEffect(() => {
    const ids = toc.map(t => t.id)
    const onScroll = () => {
      let cur = ids[0]
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top <= 120) cur = id
      }
      setActive(cur)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [toc])

  if (!toc.length) return <div />

  const go = (e, id) => {
    e.preventDefault()
    const el = document.getElementById(id)
    if (el)
      window.scrollTo({
        top: el.getBoundingClientRect().top + window.scrollY - 90,
        behavior: 'smooth'
      })
  }

  return (
    <nav className='toc'>
      <div className='toc__label'>On this page</div>
      <ol>
        {toc.map(t => (
          <li key={t.id}>
            <a
              data-active={active === t.id}
              href={'#' + t.id}
              onClick={e => go(e, t.id)}
            >
              {t.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  )
}
