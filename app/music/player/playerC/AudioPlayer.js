'use client'
import { Input } from '@/components/ui/input'
import { Play, Pause, ChevronRight, ChevronLeft } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

function AudioPlayer() {
  const [isPlaying, setIsPlaying] = useState(false)
  const [duration, setDuration] = useState('0')
  const [currentTime, setCurrentTime] = useState(0)
  const audioPlayer = useRef()
  const progressBar = useRef()
  const animationRef = useRef()

  useEffect(() => {
    const audio = audioPlayer.current
    const progress = progressBar.current

    console.log('registering')
    const handleLoadedMetadata = () => {
      console.log('handling')
      const minutes = Math.floor(audio.duration / 60)
      const seconds = Math.floor(audio.duration % 60)
      const secondsWithZero = seconds < 10 ? `0${seconds}` : seconds
      const minutesWithZero = minutes < 10 ? `0${minutes}` : minutes
      const res = `${minutesWithZero}:${secondsWithZero}`

      progress.max = audio.duration
      console.log(res)
      setDuration(res)
    }

    audio.addEventListener('canplay', handleLoadedMetadata)
    console.log('registered')
  }, [])

  const togglePlayPause = () => {
    if (isPlaying) {
      audioPlayer.current.pause()
      cancelAnimationFrame(animationRef.current)
    } else {
      audioPlayer.current.play()
      animationRef.current = requestAnimationFrame(whilePlaying)
    }
    setIsPlaying(!isPlaying)
  }

  const changeRage = () => {
    audioPlayer.current.currentTime = progressBar.current.value
    progressBar.current.style.setProperty(
      '--seek-before-width',
      `${(progressBar.current.value / duration) * 100}%`
    )
    setCurrentTime(progressBar.current.value)
  }

  const whilePlaying = () => {
    progressBar.current.value = audioPlayer.current.currentTime
    progressBar.current.style.setProperty(
      '--seek-before-width',
      `${(progressBar.current.value / duration) * 100}%`
    )
    setCurrentTime(progressBar.current.value)
    animationRef.current = requestAnimationFrame(whilePlaying)
  }
  return (
    <div className='flex'>
      <audio
        ref={audioPlayer}
        src='/audio/pride.mp3'
        preload='metadata'
      ></audio>

      <button className='bg-none border-none flex items-center text-sm cursor-pointer'>
        <ChevronLeft />
      </button>
      <button onClick={togglePlayPause}>
        {isPlaying ? <Pause /> : <Play />}
      </button>
      <button className='bg-none border-none flex items-center cursor-pointer'>
        <ChevronRight />
      </button>

      <div className='p-2 w-8'>{currentTime}</div>

      <div>
        <Input
          type='range'
          name='seek'
          id='seek'
          ref={progressBar}
          onChange={changeRage}
          className={'w-96'}
        />
      </div>

      <div className='p-2 w-8'>{duration}</div>
    </div>
  )
}

export { AudioPlayer }
