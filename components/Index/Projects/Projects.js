'use client'
import { useRef } from 'react'
import Heading from '../Heading'
import StockScreen from '../../../public/projects/stockscreen.webp'
import AgendaBuilder from '../../../public/projects/agenda.webp'
import Balgurukul from '../../../public/projects/balgurukul.webp'
import ProjectGallery from '../../../public/projects/homebackground.webp'
import HyperSpectral from '../../../public/projects/hypersceptral.webp'
import Heart from '../../../public/projects/better_heart.png'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious
} from '../../ui/carousel'
import { SquareChevronLeft, SquareChevronRight } from 'lucide-react'
import { useEffect } from 'react'
import Cards from './Cards'

const projects = [
  {
    title: 'Stock Analysis',
    desc: 'This is the project description',
    fontStyle: 'text-amber-200',
    bgColor: 'from-amber-700 to-neutral-900',
    imagePath: StockScreen
  },
  {
    title: 'Agenda Builder',
    desc: 'This is the project description',
    fontStyle: 'text-rose-200',
    bgColor: 'from-purple-700 via-pink-700 to-red-700',
    imagePath: AgendaBuilder
  },
  {
    title: 'IDF Balgurukul',
    desc: 'This is the project description',
    fontStyle: 'text-cyan-200',
    bgColor: 'from-indigo-700 to-blue-700',
    imagePath: Balgurukul
  },
  {
    title: 'Project Gallery',
    desc: 'This is the project description',
    fontStyle: 'text-stone-200',
    bgColor: 'from-neutral-700 to-stone-900',
    imagePath: ProjectGallery
  },
  {
    title: 'Hyperspectral Image',
    desc: 'This is the project description',
    fontStyle: 'text-teal-200',
    bgColor: 'from-green-700 via-teal-700 to-blue-700',
    imagePath: HyperSpectral
  },
  {
    title: 'Portfolio Website',
    desc: 'This is the project description',
    fontStyle: 'text-rose-200',
    bgColor: 'from-red-700 via-neutral-600 to-neutral-700',
    imagePath: Heart
  }
]
export default function Projects() {
  const carouselRef = useRef(null)

  useEffect(() => {
    const carousel = carouselRef.current
    if (!carousel) return

    let isDown = false
    let startX
    let scrollLeft

    const onMouseDown = e => {
      isDown = true
      carousel.classList.add('active')
      startX = e.pageX - carousel.offsetLeft
      scrollLeft = carousel.scrollLeft
    }

    const onMouseLeave = () => {
      isDown = false
      carousel.classList.remove('active')
    }

    const onMouseUp = () => {
      isDown = false
      carousel.classList.remove('active')
    }

    const onMouseMove = e => {
      if (!isDown) return
      e.preventDefault()
      const x = e.pageX - carousel.offsetLeft
      const walk = (x - startX) * 2
      carousel.scrollLeft = scrollLeft - walk
    }

    carousel.addEventListener('mousedown', onMouseDown)
    carousel.addEventListener('mouseleave', onMouseLeave)
    carousel.addEventListener('mouseup', onMouseUp)
    carousel.addEventListener('mousemove', onMouseMove)
    return () => {
      carousel.removeEventListener('mousedown', onMouseDown)
      carousel.removeEventListener('mouseleave', onMouseLeave)
      carousel.removeEventListener('mouseup', onMouseUp)
      carousel.removeEventListener('mousemove', onMouseMove)
    }
  }, [])

  return (
    <div className='max-w-(--breakpoint-xl) mx-auto text-white my-32' id='projects'>
      <Heading title={'Projects'} details={'Projects I have worked'} />
      <Carousel className='w-full'>
        <div className='flex justify-between items-center'>
          <div className='flex space-x-2'>
            <CarouselPrevious className='relative top-8 left-12 translate-x-0 translate-y-0 h-8 w-8 bg-transparent text-gray-300 '>
              <SquareChevronLeft className='h-4 w-4' />
            </CarouselPrevious>
            <CarouselNext className='relative top-8 translate-x-0 translate-y-0 h-8 w-8 bg-transparent text-gray-300 '>
              <SquareChevronRight className='h-4 w-4' />
            </CarouselNext>
          </div>
        </div>
        <CarouselContent
          ref={carouselRef}
          className='cursor-grab active:cursor-grabbing mt-5'
        >
          {projects.map((item, index) => (
            <CarouselItem
              key={index}
              className='md:basis-1/2 lg:basis-1/3 pl-4'
            >
              <Cards
                key={index}
                title={item.title}
                desc={item.desc}
                src={item.imagePath}
                bgColor={item.bgColor}
                fontStyle={item.fontStyle}
              ></Cards>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  )
}
