import CustomButton from './CustomButton'

const HeroText = () => {
  return (
    <div className='mt-6'>
      <h1 className='text-8xl text-white font-semibold tracking-[6px] md:text-[165px]'>
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
    <div className='mt-8 font-light min-w-[240px] md:-rotate-90 md:mb-48 md:mr-24'>
      <h3 className='text-stone-300 font-supreme md:text-3xl'>
        Coding Enthusiast <br /> Pursuing AI & ML <br /> Web Developer
      </h3>
    </div>
  )
}

const HeroSection = () => {
  return (
    <div className='ml-16 h-[calc(90svh+5rem)] flex flex-col justify-center md:h-screen md:flex-row-reverse md:items-end md:pb-8 md:justify-around'>
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
