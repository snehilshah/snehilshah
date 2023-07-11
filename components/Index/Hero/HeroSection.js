import CustomButton from './CustomButton'
import BlogPopUp from '../BlogPopUp'

const HeroText = () => {
  return (
    <div className='mt-6'>
      <h1 className='text-8xl md:text-8xl text-white font-semibold tracking-[6px] lg:text-[165px]'>
        Hello<span className='text-red-200'>.</span>
        <br />
        I am
        <br />
        Snehil
      </h1>
    </div>
  )
}

const HeroSubtile = () => {
  return (
    <div className='relative lg:right-24 mt-8 font-light min-w-[240px] md:-rotate-90 md:mb-48 md:mr-24'>
      <h2 className='text-stone-300 font-supreme md:text-3xl'>
        Coding Enthusiast
      </h2>
      <h2 className='text-stone-300 font-supreme md:text-3xl'>
        Pursuing AI & ML
      </h2>
      <h2 className='text-stone-300 font-supreme md:text-3xl'>Web Developer</h2>
    </div>
  )
}

const HeroSection = () => {
  return (
    <div className='h-screen mx-[10vw] md:gap-36 flex flex-col sm:items-center justify-center md:flex-row-reverse md:items-end pb-8'>
      <BlogPopUp />
      <HeroText />
      <div className='md:flex md:flex-col'>
        <HeroSubtile />
        <div className='mt-8 md:hidden'>
          <CustomButton content={'Lets Connect'} />
        </div>
      </div>
    </div>
  )
}

export default HeroSection
