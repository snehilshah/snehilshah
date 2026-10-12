'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

/**
 * A link for long lists: loads its page when a pointer heads for it (hover,
 * touch), not as it scrolls into view, so a grid of 100 albums doesn't
 * fetch 100 pages.
 */
export function PLink({ href, children, ...props }) {
  const router = useRouter()
  const warm = () => router.prefetch(href)
  return (
    <Link href={href} prefetch={false} onMouseEnter={warm} onTouchStart={warm} onFocus={warm} {...props}>
      {children}
    </Link>
  )
}
