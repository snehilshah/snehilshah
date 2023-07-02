import {
  VerticalTimeline,
  VerticalTimelineElement
} from 'react-vertical-timeline-component'
import 'react-vertical-timeline-component/style.min.css'
import { FaGraduationCap } from 'react-icons/fa'
import Heading from '../Heading'

const timelineData = [
  {
    date: '2021-Present',
    header: 'Projects Team',
    organization: 'Research Cell',
    qualities: 'Leadership | Discipline',
    icon: <FaGraduationCap className='text-stone-700' />
  },
  {
    date: '2021-Present',
    header: 'Projects Team',
    organization: 'Research Cell',
    qualities: 'Leadership | Discipline',
    icon: <FaGraduationCap className='text-stone-700' />
  },
  {
    date: '2021-Present',
    header: 'Projects Team',
    organization: 'Research Cell',
    qualities: 'Leadership | Discipline',
    icon: <FaGraduationCap className='text-stone-700' />
  },
  {
    date: '2021-Present',
    header: 'Projects Team',
    organization: 'Research Cell',
    qualities: 'Leadership | Discipline',
    icon: <FaGraduationCap className='text-stone-700' />
  }
]

const Timeline = () => {
  return (
    <div className='max-w-screen-xl mx-auto relative left-2'>
      <div className='text-white'>
        <Heading title={'Experience'} details={'Events'} />
      </div>
      <div className='timeline'>
        <VerticalTimeline animate={true} layout='2-columns' lineColor='#0097A7'>
          {timelineData.map(
            ({ date, header, organization, qualities, icon }, index) => {
              return (
                <VerticalTimelineElement
                  key={index}
                  contentArrowStyle={{ borderRight: '7px solid #0097A7' }}
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
    </div>
  )
}

export default Timeline
