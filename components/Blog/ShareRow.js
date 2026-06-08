'use client'
import { useState } from 'react'
import { Share2, Link as LinkIcon, Check } from 'lucide-react'

export default function ShareRow({ title }) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      /* clipboard unavailable */
    }
  }

  const share = async () => {
    const url = window.location.href
    if (navigator.share) {
      try {
        await navigator.share({ title, url })
      } catch {
        /* user dismissed */
      }
    } else {
      copy()
    }
  }

  return (
    <div className='post-foot__share'>
      <button className='share-btn' title='Share' onClick={share}>
        <Share2 />
      </button>
      <button
        className='share-btn'
        title={copied ? 'Copied!' : 'Copy link'}
        onClick={copy}
      >
        {copied ? <Check /> : <LinkIcon />}
      </button>
    </div>
  )
}
