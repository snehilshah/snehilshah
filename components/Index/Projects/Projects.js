'use client'
import { useRef } from 'react'
import Heading from '../Heading'
import StockScreen from '../../../public/projects/stockscreen.webp'
import AgendaBuilder from '../../../public/projects/agenda.webp'
import Balgurukul from '../../../public/projects/balgurukul.webp'
import ProjectGallery from '../../../public/projects/homebackground.webp'
import HyperSpectral from '../../../public/projects/hypersceptral.webp'
import Heart from '../../../public/projects/heart.png'
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
    classes: '',
    bgColor: 'from-amber-600 to-neutral-900',
    imagePath: StockScreen
  },
  {
    title: 'Agenda Builder',
    desc: 'This is the project description',
    classes: '',
    // bgColor: 'from-violet-500 to-pink-500',
    bgColor: 'from-purple-500 via-pink-500 to-red-500',
    imagePath: AgendaBuilder
  },
  {
    title: 'IDF Balgurukul',
    desc: 'This is the project description',
    classes: '',
    bgColor: 'from-blue-600 to-cyan-500',
    imagePath: Balgurukul
  },
  {
    title: 'Project Gallery',
    desc: 'This is the project description',
    classes: 'text-black',
    bgColor: 'from-white via-neutral-700 to-black text-black',
    imagePath: ProjectGallery
  },
  {
    title: 'Hyperspectral Image',
    desc: 'This is the project description',
    classes: 'text-black',
    bgColor: 'from-green-500 via-teal-500 to-blue-500',
    imagePath: HyperSpectral
  },
  {
    title: 'Portfolio Website',
    desc: 'This is the project description',
    classes: '',
    bgColor: 'from-neutral-600 via-neutral-800 to-rose-600',
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
    <div className='max-w-screen-xl mx-auto text-white my-32' id='projects'>
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
                classes={item.classes}
              ></Cards>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  )
}
