import Image from 'next/image'
import { cn } from '@/lib/utils'

function Cards({ title, desc, src, bgColor, accent }) {
  return (
    <div className='group relative h-[400px] w-[300px] shrink-0 select-none overflow-hidden rounded-3xl shadow-[5px_5px_30px_rgba(0,0,0,0.3)] ring-1 ring-white/10 transition-transform duration-500 hover:-translate-y-2 sm:w-[340px]'>
      <Image
        src={src}
        alt={title}
        fill
        sizes='(max-width: 640px) 300px, 340px'
        className='object-cover transition-transform duration-700 ease-out group-hover:scale-110'
        draggable={false}
      />
      {/* per-project color overlay */}
      <div
        className={cn(
          'absolute inset-0 bg-linear-to-br opacity-60 mix-blend-multiply transition-opacity duration-500 group-hover:opacity-80',
          bgColor
        )}
      />
      {/* legibility gradient */}
      <div className='absolute inset-0 bg-linear-to-t from-black/85 via-black/20 to-transparent' />

      <div className='absolute inset-x-0 bottom-0 p-6'>
        <h3 className={cn('font-supreme text-2xl font-semibold drop-shadow', accent)}>
          {title}
        </h3>
        {desc && (
          <p className='max-h-0 overflow-hidden text-sm text-stone-200/90 opacity-0 transition-all duration-500 group-hover:mt-2 group-hover:max-h-24 group-hover:opacity-100'>
            {desc}
          </p>
        )}
      </div>
    </div>
  )
}

export default Cards
