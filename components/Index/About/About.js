import Heading from '../Heading'
import AboutImage from './AboutImage'

const About = () => {
  return (
    <section
      className='text-white body-font max-w-(--breakpoint-xl) mx-auto py-20'
      id='about'
    >
      <Heading title={'About Me'} details={'Get to know me more'} />
      <div className='container mx-auto flex md:flex-row flex-col-reverse items-center'>
        <div className='lg:grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mt-16 md:mb-0 items-center text-center'>
          <h1 className='sm:text-4xl text-3xl mb-4 font-medium text-white whitespace-nowrap'>
            Code with
            <span className='bg-clip-text text-transparent bg-linear-to-r from-cyan-200 to-teal-400 sm:text-5xl text-4xl ml-3'>
              Passion
            </span>
            <br />
            Create with
            <span className='bg-clip-text text-transparent bg-linear-to-r from-cyan-200 to-teal-400 sm:text-5xl text-4xl ml-3'>
              Purpose
            </span>
          </h1>
          <p className='font-supreme mb-8 leading-relaxed text-lg tracking-wide px-[10vw] md:p-0'>
            Welcome to my website! I&apos;m Snehil R. Shah, a passionate tech
            enthusiast with a deep love for all things technology-related.
            I&apos;m here to share my knowledge and insights into the latest
            advancements, gadgets, and trends that shape our digital world. With
            a firm belief in the power of quality software, I strive to make our
            lives easier and more efficient. Join me on this exciting journey as
            we explore the limitless possibilities that technology offers. You
            can also find me on my blogging website, where I share everything
            that is mentioned here. Feel free to visit and dive deeper into the
            topics we discuss.
          </p>
        </div>
        <div className='lg:max-w-lg lg:w-full md:w-1/2 w-5/6 flex items-center justify-center'>
          <AboutImage />
        </div>
      </div>
    </section>
  )
}

export default About
