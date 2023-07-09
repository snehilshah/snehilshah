import Cards from './Cards'
import { motion } from 'framer-motion'
import { useRef } from 'react'
import Heading from '../Heading'

function Projects() {
  const boxRef = useRef(null)
  const projects = [
    {
      title: 'Stock Analysis',
      desc: 'This is the project description',
      bgImage: '/projects/stockscreen.jpg',
      classes: ''
    },
    {
      title: 'Agenda Builder',
      desc: 'This is the project description',
      bgImage: '/projects/agenda.jpg',
      classes: 'text-black'
    },
    {
      title: 'IDF Balgurukul',
      desc: 'This is the project description',
      bgImage: '/projects/balgurukul.webp',
      classes: 'text-black'
    },
    {
      title: 'Project Gallery',
      desc: 'This is the project description',
      bgImage: '/projects/homebackground.jpg',
      classes: 'text-black'
    },
    {
      title: 'Hyperspectral Image',
      desc: 'This is the project description',
      bgImage: '/projects/hypersceptral.jpg',
      classes: 'text-black'
    },
    {
      title: 'Portfolio Website',
      desc: 'This is the project description',
      bgImage: '/projects/heart.png',
      classes: ''
    }
  ]
  return (
    <div className='max-w-screen-xl mx-auto text-white my-32'>
      <Heading title={'Projects'} details={'Projects I have worked'} />
      <div
        ref={boxRef}
        className='cursor-grab flex overflow-hidden w-full mx-auto p-4'
      >
        <motion.div
          drag='x'
          dragConstraints={boxRef}
          className='flex gap-8 pl-2'
        >
          {projects.map((project, index) => {
            return (
              <Cards
                key={index}
                title={project.title}
                desc={project.desc}
                src={project.bgImage}
                classes={project.classes}
              />
            )
          })}
        </motion.div>
      </div>
    </div>
  )
}

export default Projects
