import Blue from '../../public/Blue.jpeg'
import Image from 'next/image'
import Cards from './Cards'

import { motion } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import Heading from '../Heading'

function Projects() {
  const boxRef = useRef(null)
  return (
    <div className='max-w-screen-xl mx-auto text-white mt-16'>
      <Heading title={'Projects'} details={'Projects I have worked'} />
      <div
        ref={boxRef}
        className='cursor-grab flex overflow-hidden w-full mx-auto p-4'
      >
        <motion.div
          drag='x'
          dragConstraints={boxRef}
          className='flex gap-10 pl-2'
        >
          <div className='h-[40rem] py-10'>
            <Cards />
          </div>
          <div className='h-[40rem] py-10 '>
            <Cards />
          </div>
          <div className='h-[40rem] py-10 '>
            <Cards />
          </div>
          <div className='h-[40rem] py-10 '>
            <Cards />
          </div>
          <div className='h-[40rem] py-10 '>
            <Cards />
          </div>
          <div className='h-[40rem] py-10 '>
            <Cards />
          </div>
          <div className='h-[40rem] py-10 '>
            <Cards />
          </div>
          <div className='h-[40rem] py-10 '>
            <Cards />
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default Projects
