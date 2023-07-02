import Blue from '../../public/Blue.jpeg'
import Image from 'next/image'
import Cards from './Cards'

import { motion } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'

function Projects() {
  const boxRef = useRef(null)

  return (
    <div
      ref={boxRef}
      className='cursor-grab flex overflow-hidden max-w-6xl mx-auto'
    >
      <motion.div drag='x' dragConstraints={boxRef} className='flex gap-10'>
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
  )
}

export default Projects
