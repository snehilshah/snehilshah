'use client'
import { motion, cubicBezier } from 'framer-motion'
import { useState } from 'react'
const bezierEase = cubicBezier(0.69, 0, 0.21, 1)
const imageVariants = {
  initial: { scale: 0.8 },
  animate: {
    scale: [0.8, 1.7, 1],
    transition: { duration: 4, ease: bezierEase }
  },
  static: {
    scale: 1,
    transition: { duration: 0.8, ease: bezierEase }
  },
  hover: {
    scale: 1.2,
    transition: { duration: 0.8, ease: bezierEase }
  }
}

const AnimatedImage = ({ src }) => {
  const [animationComplete, setAnimationComplete] = useState(false)
  return (
    <motion.img
      src={src}
      alt={'header_img'}
      variants={imageVariants}
      initial='initial'
      animate={animationComplete ? 'static' : 'animate'}
      whileHover='hover'
      onAnimationComplete={() => setAnimationComplete(true)}
      className='w-full h-[30rem] object-cover rounded-3xl'
    />
  )
}

export default AnimatedImage
