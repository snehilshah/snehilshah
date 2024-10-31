import Image from 'next/image'
import clsx from 'clsx'
import Heading from '../Heading'

export default function TechStack() {
  const technologies = [
    {
      title: 'Golang',
      source: '/domains/golangcrop.png',
      style: 'shadow-teal-400 bg-teal-400/20'
    },
    {
      title: 'Database',
      source: '/domains/clouddatabase.png',
      style: 'shadow-fuchsia-500 bg-fuchsia-400/20'
    },
    {
      title: 'Next.js',
      source: '/domains/Next.png',
      style: 'shadow-white bg-stone-500/20'
    },
    {
      title: 'Python',
      source: '/domains/pythonlogo.png',
      style: 'shadow-amber-500 bg-amber-400/20'
    },
    {
      title: 'gRPC',
      source: '/domains/grpc.png',
      style: 'shadow-lime-500 bg-lime-400/20'
    },
    {
      title: 'Kubernetes',
      source: '/domains/kuber.png',
      style: 'shadow-sky-500 bg-sky-500/20'
    }
  ]
  return (
    <div className='section' id='experience'>
      <div className='w-full max-w-screen-xl mx-auto text-white'>
        <Heading title={'Tech Stack'} details={'Tech I have worked Upon'} />
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
                  'shadow-md hover:scale-105 duration-500 p-8 rounded-lg h-48 ' +
                    style
                )}
              >
                <div className='h-[80%] flex items-center w-full'>
                  <Image
                    src={source}
                    alt={title + ' logo'}
                    className='w-20 mx-auto'
                    width={512}
                    height={512}
                  />
                </div>
                <p className='mt-4 font-supreme'>{title}</p>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
