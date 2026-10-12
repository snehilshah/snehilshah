'use client'

export default function ListeningError({ reset }) {
  return (
    <div className='min-h-dvh grid place-items-center bg-neutral-950 text-neutral-300 font-supreme'>
      <button onClick={reset} className='text-[15px] hover:text-white transition-colors'>
        Couldn’t reach the listening history. Try again
      </button>
    </div>
  )
}
