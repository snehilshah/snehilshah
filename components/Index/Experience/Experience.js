import Image from 'next/image'
import clsx from 'clsx'
import Heading from '../Heading'

const Experience = () => {
  const technologies = [
    {
      title: 'React',
      source: '/domains/react.png',
      style: 'shadow-teal-500 '
    },
    {
      title: 'Database',
      source: '/domains/sqlServer.png',
      style: 'shadow-blue-500 '
    },
    {
      title: 'Next.js',
      source: '/domains/Next.png',
      style: 'shadow-white'
    },
    {
      title: 'Python',
      source: '/domains/chip.png',
      style: 'shadow-yellow-500 '
    },
    {
      title: 'AIML',
      source: '/domains/chip.png',
      style: 'shadow-purple-500 '
    },
    {
      title: 'TensorFlow',
      source: '/domains/tensorflow.png',
      style: 'shadow-orange-500 '
    }
  ]
  return (
    <div className='section'>
      <div className='w-full max-w-screen-xl mx-auto text-white'>
        <Heading
          title={'Tech Stack'}
          details={'Tech I have worked Upon'}
          className='lmao'
        />
      </div>
      <div className='max-w-screen-lg mx-auto p-4 flex flex-col justify-center w-full h-full text-white'>
        <div
          className={clsx(
            'w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 text-center py-8 px-12 sm:px-0 '
          )}
        >
          {technologies.map(({ title, source, style }, index) => {
            return (
              <div
                key={index}
                className={clsx(
                  'shadow-md hover:scale-105 duration-500 p-8 rounded-lg bg-stone-700/60 ' +
                    style
                )}
              >
                <Image
                  src={source}
                  alt={title + ' logo'}
                  className='w-20 mx-auto'
                  width={512}
                  height={512}
                />
                <p className='mt-4'>{title}</p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Experience
