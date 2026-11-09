import Heading from '../Heading'
import Sajni from '../../../public/projects/sajni.webp'
import Geet from '../../../public/projects/geet.webp'
import HyperSpectral from '../../../public/projects/hypersceptral.webp'
import Balgurukul from '../../../public/projects/balgurukul.webp'
import ProjectGallery from '../../../public/projects/homebackground.webp'
import AgendaBuilder from '../../../public/projects/agenda.webp'
import StockScreen from '../../../public/projects/stockscreen.webp'
import Heart from '../../../public/projects/final_heart.webp'
import LazyCarousel from './LazyCarousel'
import Cards from './Cards'

const projects = [
  {
    title: 'Sajni',
    desc: 'Personal assistant for notes, tasks, habits and money. Go API with a Gemini agent and its own MCP server, plus React web and native Android apps.',
    accent: 'text-teal-200',
    bgColor: 'from-teal-700 to-cyan-900',
    imagePath: Sajni,
    link: 'https://www.ohmysajni.com'
  },
  {
    title: 'Geet',
    desc: 'Music player for my own library on Android (Kotlin) and Linux (Rust, GTK 4), with gapless playback, synced lyrics and listening history synced to a Go server.',
    accent: 'text-orange-200',
    bgColor: 'from-red-800 via-orange-800 to-stone-900',
    imagePath: Geet,
    link: ''
  },
  {
    title: 'Hyperspectral Imaging',
    desc: 'Research at IIT Bombay: few-shot learning for hyperspectral image classification, in Python and TensorFlow.',
    accent: 'text-teal-200',
    bgColor: 'from-green-700 via-teal-700 to-blue-700',
    imagePath: HyperSpectral,
    link: ''
  },
  {
    title: 'IDF Balgurukul',
    desc: 'Student-data portal used across 300+ Balgurukuls, built with Next.js, Tailwind and MySQL.',
    accent: 'text-cyan-200',
    bgColor: 'from-indigo-700 to-blue-700',
    imagePath: Balgurukul,
    link: ''
  },
  {
    title: 'Project Gallery',
    desc: 'Community site where developers showcase and discover projects. Next.js, NextAuth and MySQL.',
    accent: 'text-stone-200',
    bgColor: 'from-neutral-700 to-stone-900',
    imagePath: ProjectGallery,
    link: 'https://project-gallery-vert.vercel.app'
  },
  {
    title: 'Agenda Builder',
    desc: 'Generates an event run of show with timings, buffer slots, MC scripts and speaker notes.',
    accent: 'text-rose-200',
    bgColor: 'from-purple-700 via-pink-700 to-red-700',
    imagePath: AgendaBuilder,
    link: 'https://agenda-builder.vercel.app'
  },
  {
    title: 'Stock Analysis',
    desc: 'Python tools that find demand and supply zones and recurring patterns in market data.',
    accent: 'text-amber-200',
    bgColor: 'from-amber-700 to-neutral-900',
    imagePath: StockScreen,
    link: ''
  },
  {
    title: 'This Website',
    desc: 'Portfolio, blog and a private listening dashboard. Next.js 16, Tailwind 4 and Motion.',
    accent: 'text-rose-200',
    bgColor: 'from-red-700 via-neutral-600 to-neutral-700',
    imagePath: Heart,
    link: 'https://github.com/snehilshah/snehilshah'
  }
]

export default function Projects() {
  return (
    <div
      className='max-w-(--breakpoint-xl) mx-auto px-4 text-white my-32'
      id='projects'
    >
      <Heading title={'Projects'} details={'Things I have built'} />
      <div className='mt-6'>
        <LazyCarousel>
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
        </LazyCarousel>
      </div>
    </div>
  )
}
