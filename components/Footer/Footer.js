import { BsFillRocketTakeoffFill } from 'react-icons/bs'
import Heading from '../Heading'

function Footer() {
  return (
    <section className='text-gray-600 body-font'>
      <div className='container px-5 py-24 mx-auto'>
        <div className='xl:w-1/2 lg:w-3/4 w-full mx-auto text-center flex flex-col justify-center items-center'>
          <BsFillRocketTakeoffFill className='text-5xl mb-10' size={72} />
          <p className='leading-relaxed text-lg'>
            Edison bulb retro cloud bread echo park, helvetica stumptown taiyaki
            taxidermy 90's cronut +1 kinfolk. Single-origin coffee ennui shaman
            taiyaki vape DIY tote bag drinking vinegar cronut adaptogen squid
            fanny pack vaporware. Man bun next level coloring book skateboard
            four loko knausgaard. Kitsch keffiyeh master cleanse direct trade
            indigo juice before they sold out gentrify plaid gastropub normcore
            XOXO 90's pickled cindigo jean shorts. Slow-carb next level
            shoindigoitch ethical authentic, yr scenester sriracha forage
            franzen organic drinking vinegar.
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
