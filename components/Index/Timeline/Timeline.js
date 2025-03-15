'use client'
import {
  VerticalTimeline,
  VerticalTimelineElement
} from 'react-vertical-timeline-component'
import 'react-vertical-timeline-component/style.min.css'
import { Laptop, MicVocal, Users, BriefcaseBusiness } from 'lucide-react'
import Heading from '../Heading'

const timelineData = [
  {
    date: '2024-Present',
    header: 'SDE',
    organization: (
      <a target='_blank' href='https://www.n7.io'>
        N7
      </a>
    ),
    qualities: '',
    icon: <BriefcaseBusiness className='text-stone-700' />
  },
  {
    date: '2022-2024',
    header: 'Projects Lead',
    organization: 'Research Cell',
    qualities: 'Leadership | Management | Research',
    icon: <Users className='text-stone-700' />
  },
  {
    date: '2021-2023',
    header: 'Website Team',
    organization: 'Computer Society of India (CSI)',
    qualities: 'WebDevelopment',
    icon: <Laptop color='#000000' className='text-stone-700' />
  },
  {
    date: '2021-2022',
    header: 'IEEE Event Speaker',
    organization: 'Institute of Electrical and Electronics Engineers',
    qualities: 'Public Speaking | Community Contribution',
    icon: <MicVocal className='text-stone-700' />
  }
]

const Timeline = () => {
  return (
    <div className='max-w-screen-xl overflow-x-hidden mx-auto' id='positions'>
      <div className='text-white'>
        <Heading
          title={'Positions'}
          details={'Position I have been trusted with'}
        />
      </div>
      <VerticalTimeline
        animate={true}
        layout='2-columns'
        lineColor='#0097A7'
        className='md:relative md:left-2'
      >
        {timelineData.map(
          ({ date, header, organization, qualities, icon }, index) => {
            return (
              <VerticalTimelineElement
                key={index}
                contentArrowStyle={{ borderRight: '7px solid #a5f3fc' }}
                iconStyle={{
                  background: '#a3a3a3',
                  boxShadow: '0 0 0 4px #0097A7'
                }}
                date={date}
                dateClassName='text-white'
                icon={icon}
                contentStyle={{
                  background: 'rgb(68 64 60 / 0.6)',
                  color: 'white',
                  boxShadow: '2px 5px 4px 0px #0097A7'
                }}
              >
                <h3 className=''>{header}</h3>
                <h6 className=''>{organization}</h6>
                <p>{qualities}</p>
              </VerticalTimelineElement>
            )
          }
        )}
      </VerticalTimeline>
    </div>
  )
}

export default Timeline
