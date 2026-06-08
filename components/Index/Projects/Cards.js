import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'

function Cards({ title, desc, src, bgColor, accent, link }) {
  return (
    <div className='group relative isolate h-[400px] w-[300px] shrink-0 transform-gpu select-none overflow-hidden rounded-3xl shadow-[5px_5px_30px_rgba(0,0,0,0.3)] transition-transform duration-300 sm:w-[340px] [@media(hover:hover)]:hover:-translate-y-2'>
      <Image
        src={src}
        alt={title}
        fill
        sizes='(max-width: 640px) 300px, 340px'
        className='transform-gpu object-cover [@media(hover:hover)]:transition-transform [@media(hover:hover)]:duration-500 [@media(hover:hover)]:group-hover:scale-105'
        draggable={false}
      />

      {/* per-project color tint — hidden until hover on pointer devices, subtle on touch */}
      <div
        className={cn(
          'pointer-events-none absolute inset-0 bg-linear-to-br opacity-35 transition-opacity duration-300 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:opacity-65',
          bgColor
        )}
      />

      {/* content: legibility gradient + title/link/desc — revealed on hover, always shown on touch */}
      <div className='absolute inset-x-0 bottom-0 bg-linear-to-t from-black/85 via-black/20 to-transparent p-6 transition-opacity duration-300 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:opacity-100'>
        <div className='flex items-center gap-2'>
          <h3 className={cn('font-supreme text-2xl font-semibold drop-shadow', accent)}>
            {title}
          </h3>
          {link && (
            <a
              href={link}
              target='_blank'
              rel='noopener noreferrer'
              aria-label={`Open ${title} in a new tab`}
              className='text-white/80 transition-colors hover:text-white'
            >
              <ArrowUpRight className='h-5 w-5' />
            </a>
          )}
        </div>
        {desc && <p className='mt-1 text-sm text-stone-200/90'>{desc}</p>}
      </div>
    </div>
  )
}

export default Cards
