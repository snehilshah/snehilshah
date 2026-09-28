import { Laptop, MicVocal, Users, BriefcaseBusiness } from 'lucide-react'
import Heading from '../Heading'
import TimelineProgress from './TimelineProgress'

const timelineData = [
  {
    date: '2024-Present',
    header: 'SDE',
    organization: (
      <a
        target='_blank'
        href='https://www.n7.io'
        rel='noopener noreferrer'
        className='underline decoration-cyan-500/60 underline-offset-2 transition-colors hover:text-cyan-300'
      >
        N7
      </a>
    ),
    qualities: '',
    Icon: BriefcaseBusiness
  },
  {
    date: '2022-2024',
    header: 'Projects Lead',
    organization: 'Research Cell',
    qualities: 'Leadership | Management | Research',
    Icon: Users
  },
  {
    date: '2021-2023',
    header: 'Website Team',
    organization: 'Computer Society of India (CSI)',
    qualities: 'WebDevelopment',
    Icon: Laptop
  },
  {
    date: '2021-2022',
    header: 'IEEE Event Speaker',
    organization: 'Institute of Electrical and Electronics Engineers',
    qualities: 'Public Speaking | Community Contribution',
    Icon: MicVocal
  }
]

const Timeline = () => {
  return (
    <div
      className='max-w-(--breakpoint-xl) mx-auto overflow-x-hidden'
      id='positions'
    >
      <div className='text-white'>
        <Heading title={'Positions'} details={'Position I have been trusted with'} />
      </div>

      <div className='relative pb-20'>
        {timelineData.map(({ date, header, organization, qualities, Icon }) => (
          <div key={date} className='flex justify-start pt-10 md:gap-10 md:pt-24'>
            {/* Sticky left: dot + date */}
            <div className='sticky top-28 z-20 flex max-w-xs flex-col items-center self-start md:w-full md:max-w-sm md:flex-row'>
              <div className='absolute left-2 flex h-12 w-12 items-center justify-center rounded-full bg-stone-400 ring-4 ring-[#0097A7] md:left-2'>
                <Icon className='h-5 w-5 text-stone-800' aria-hidden='true' />
              </div>
              <h3 className='hidden text-4xl font-bold text-stone-400 md:block md:pl-24 lg:text-5xl'>
                {date}
              </h3>
            </div>

            {/* Right: content card */}
            <div className='relative w-full pl-20 pr-2 md:pl-4'>
              <h3 className='mb-2 block text-2xl font-bold text-stone-400 md:hidden'>
                {date}
              </h3>
              <div className='rounded-lg bg-stone-700/60 p-5 text-white shadow-[2px_5px_4px_0px_#0097A7] backdrop-blur-sm'>
                <h4 className='text-xl font-semibold'>{header}</h4>
                <h5 className='text-cyan-100'>{organization}</h5>
                {qualities && <p className='mt-1 text-sm text-stone-300'>{qualities}</p>}
              </div>
            </div>
          </div>
        ))}

        {/* Progress line */}
        <div className='absolute inset-y-0 left-8 w-[2px] overflow-hidden bg-stone-600/40 [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]'>
          <TimelineProgress />
        </div>
      </div>
    </div>
  )
}

export default Timeline
