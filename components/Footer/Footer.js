import { BsFillRocketTakeoffFill } from 'react-icons/bs'
import Heading from '../Heading'

function Footer() {
  return (
    <section className='text-gray-600 body-font'>
      <div className='container px-5 py-24 mx-auto'>
        <div className='xl:w-1/2 lg:w-3/4 w-full mx-auto text-center flex flex-col justify-center items-center'>
          <BsFillRocketTakeoffFill className='text-5xl mb-10' size={72} />
          <p className='leading-relaxed text-lg'>
            Some Inspiration para
          </p>
          <span className='inline-block h-1 w-10 rounded bg-indigo-500 mt-8 mb-6'></span>
          <h2 className='text-gray-300 font-medium title-font tracking-wider text-sm'>
            SNEHIL SHAH
          </h2>
          <p className='text-gray-500'>Senior Product Designer</p>
        </div>
      </div>
    </section>
  )
}

export default Footer
