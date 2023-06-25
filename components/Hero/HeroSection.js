import CustomButton from './CustomButton'

const HeroText = () => {
  return (
    <div className='mt-6'>
      <h1 className='text-8xl md:text-5xl text-white font-semibold tracking-[6px]'>
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
    <div className='mt-8 font-light text-lg '>
      <h3 className='text-stone-300 font-supreme'>
        Coding Enthusiast <br /> Pursuing AI & ML <br /> Web Developer
      </h3>
    </div>
  )
}

const HeroSection = () => {
  return (
    <>
      <div className='ml-16 h-[calc(90svh+5rem)] flex flex-col justify-center md:h-screen'>
        <HeroText />
        <HeroSubtile />
        <div className='mt-8'>
          <CustomButton content={'Lets Connect'} />
        </div>
      </div>
    </>
  )
}

export default HeroSection
