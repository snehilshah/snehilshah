import { AiFillInfoCircle } from 'react-icons/ai'

export const InfoBox = ({ text }) => {
  return (
    <div className='bg-sky-700 rounded-xl text-white mb-6 px-3 py-2 flex items-center gap-4'>
      <AiFillInfoCircle />
      {text}
    </div>
  )
}
