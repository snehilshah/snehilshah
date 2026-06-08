import Heading from '../Heading'
import StockScreen from '../../../public/projects/stockscreen.webp'
import AgendaBuilder from '../../../public/projects/agenda.webp'
import Balgurukul from '../../../public/projects/balgurukul.webp'
import ProjectGallery from '../../../public/projects/homebackground.webp'
import HyperSpectral from '../../../public/projects/hypersceptral.webp'
import Heart from '../../../public/projects/final_heart.webp'
import Carousel from './Carousel'
import Cards from './Cards'

const projects = [
  {
    title: 'Stock Analysis',
    desc: 'This is the project description',
    accent: 'text-amber-200',
    bgColor: 'from-amber-700 to-neutral-900',
    imagePath: StockScreen,
    link: ''
  },
  {
    title: 'Agenda Builder',
    desc: 'This is the project description',
    accent: 'text-rose-200',
    bgColor: 'from-purple-700 via-pink-700 to-red-700',
    imagePath: AgendaBuilder,
    link: ''
  },
  {
    title: 'IDF Balgurukul',
    desc: 'This is the project description',
    accent: 'text-cyan-200',
    bgColor: 'from-indigo-700 to-blue-700',
    imagePath: Balgurukul,
    link: ''
  },
  {
    title: 'Project Gallery',
    desc: 'This is the project description',
    accent: 'text-stone-200',
    bgColor: 'from-neutral-700 to-stone-900',
    imagePath: ProjectGallery,
    link: ''
  },
  {
    title: 'Hyperspectral Image',
    desc: 'This is the project description',
    accent: 'text-teal-200',
    bgColor: 'from-green-700 via-teal-700 to-blue-700',
    imagePath: HyperSpectral,
    link: ''
  },
  {
    title: 'Portfolio Website',
    desc: 'This is the project description',
    accent: 'text-rose-200',
    bgColor: 'from-red-700 via-neutral-600 to-neutral-700',
    imagePath: Heart,
    link: 'https://www.snehilshah.com'
  }
]

export default function Projects() {
  return (
    <div
      className='max-w-(--breakpoint-xl) mx-auto px-4 text-white my-32'
      id='projects'
    >
      <Heading title={'Projects'} details={'Projects I have worked'} />
      <div className='mt-6'>
        <Carousel>
          {projects.map(({ title, desc, accent, bgColor, imagePath, link }) => (
            <Cards
              key={title}
              title={title}
              desc={desc}
              src={imagePath}
              bgColor={bgColor}
              accent={accent}
              link={link}
            />
          ))}
        </Carousel>
      </div>
    </div>
  )
}
