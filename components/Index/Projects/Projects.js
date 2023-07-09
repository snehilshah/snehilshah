import Cards from './Cards'
import { motion } from 'framer-motion'
import { useRef } from 'react'
import Heading from '../Heading'
import StockScreen from '../../../public/projects/stockscreen.jpg'
import AgendaBuilder from '../../../public/projects/agenda.png'
import IDF from '../../../public/projects/balgurukul.webp'
import ProjectGallery from '../../../public/projects/homebackground.jpg'
import HyperSpectral from '../../../public/projects/hypersceptral.png'
import Heart from '../../../public/projects/heart.png'

function Projects() {
  const boxRef = useRef(null)
  const projects = [
    {
      title: 'Stock Analysis',
      desc: 'This is the project description',
      bgImage: StockScreen,
      classes: ''
    },
    {
      title: 'Agenda Builder',
      desc: 'This is the project description',
      bgImage: AgendaBuilder,
      classes: 'text-black'
    },
    {
      title: 'IDF Balgurukul',
      desc: 'This is the project description',
      bgImage: IDF,
      classes: 'text-black'
    },
    {
      title: 'Project Gallery',
      desc: 'This is the project description',
      bgImage: ProjectGallery,
      classes: 'text-black'
    },
    {
      title: 'Hyperspectral Image',
      desc: 'This is the project description',
      bgImage: HyperSpectral,
      classes: 'text-black'
    },
    {
      title: 'Portfolio Website',
      desc: 'This is the project description',
      bgImage: Heart,
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
