import { BsFillRocketTakeoffFill } from 'react-icons/bs'
import Heading from '../Heading'
import Wave from '../../../public/footerBg/Vector.svg'
import Image from 'next/image'
function Footer() {
  return (
    <section className='mt-20 mb-8'>
      <div className='container mx-auto flex text-white'>
        <div className='xl:w-1/2 lg:w-3/4 w-full mx-auto text-center flex flex-col items-center justify-center'>
          <p className='leading-relaxed text-lg'>Made with 💖 by</p>
          <span className='inline-block h-1 w-10 rounded bg-indigo-500 my-2'></span>
          <h2 className='text-gray-300 font-medium title-font tracking-wider text-sm'>
            SNEHIL SHAH
          </h2>
        </div>
      </div>
    </section>
  )
}

export default Footer
