import { Shell } from './_components/Shell'

export default function Loading() {
  return (
    <Shell>
      <div role='status' className='mt-12' aria-live='polite'>
        <p className='meta'>Loading listening history…</p>
        <div aria-hidden className='mt-6 grid grid-cols-2 sm:grid-cols-3 gap-4'>
          {Array.from({ length: 6 }, (_, i) => (
            <div key={i} className='h-24 rounded-2xl bg-m-surface-container-high' />
          ))}
        </div>
      </div>
    </Shell>
  )
}
