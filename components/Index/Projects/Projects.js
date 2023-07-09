import Cards from './Cards'
import { motion } from 'framer-motion'
import { useRef } from 'react'
import Heading from '../Heading'
import StockScreen from '../../../public/projects/StockScreen.jpg'
import AgendaBuilder from '../../../public/projects/agenda.png'
import IDF from '../../../public/projects/BalGurukul.webp'
import ProjectGallery from '../../../public/projects/HomeBackground.jpg'
import HyperSpectral from '../../../public/projects/HyperSceptral.png'
import Heart from '../../../public/projects/heart.png'

function Projects() {
  const boxRef = useRef(null)
  const projects = [
    {
      title: 'Stock Analysis',
      desc: 'This is the project description',
      bgImage: StockScreen,
      // source: react,
      classes: ''
    },
    {
      title: 'Agenda Builder',
      desc: 'This is the project description',
      bgImage: AgendaBuilder,
      // source: python,
      classes: 'text-black'
    },
    {
      title: 'IDF Balgurukul',
      desc: 'This is the project description',
      bgImage: IDF,
      // source: aiml,
      classes: 'text-black'
    },
    {
      title: 'Project Gallery',
      desc: 'This is the project description',
      bgImage: ProjectGallery,
      // source: database,
      classes: 'text-black'
    },
    {
      title: 'Hyperspectral Image',
      desc: 'This is the project description',
      bgImage: HyperSpectral,
      // source: html,
      classes: 'text-black'
    },
    {
      title: 'Portfolio Website',
      desc: 'This is the project description',
      bgImage: Heart,
      // source: html,
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
