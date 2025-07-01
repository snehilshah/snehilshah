'use client'

import { useState, useRef, useEffect } from 'react'
import { songs } from '../../../../lib/songData'
import { Play, Pause, SkipBack, SkipForward, FileText } from 'lucide-react'

export function MusicPlayer() {
  const [currentSongIndex, setCurrentSongIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [showLyrics, setShowLyrics] = useState(false)
  const audioRef = useRef(null)

  const currentSong = songs[currentSongIndex]

  useEffect(() => {
    if (isPlaying) {
      audioRef.current?.play()
    } else {
      audioRef.current?.pause()
    }
  }, [isPlaying, currentSongIndex])

  const togglePlay = () => {
    setIsPlaying(!isPlaying)
  }

  const playNext = () => {
    setCurrentSongIndex(prevIndex => (prevIndex + 1) % songs.length)
    setIsPlaying(true)
  }

  const playPrevious = () => {
    setCurrentSongIndex(
      prevIndex => (prevIndex - 1 + songs.length) % songs.length
    )
    setIsPlaying(true)
  }

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime)
    }
  }

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration)
    }
  }

  const handleSeek = e => {
    if (audioRef.current) {
      audioRef.current.currentTime = parseFloat(e.target.value)
      setCurrentTime(parseFloat(e.target.value))
    }
  }

  const formatTime = time => {
    const minutes = Math.floor(time / 60)
    const seconds = Math.floor(time % 61)
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
  }

  return (
    <div className='relative h-screen text-white flex flex-col overflow-hidden'>
      {/* Blurred background from current song cover */}
      <div
        className='absolute inset-0 bg-cover bg-center blur-3xl scale-110'
        style={{ backgroundImage: `url(${currentSong.cover})` }}
      ></div>
      <div className='absolute inset-0 bg-black/40'></div>

      {/* Header with current song info */}
      <div className='relative z-10 bg-black/20 backdrop-blur-md border-b border-white/10 p-4'>
        <div className='flex items-center gap-4'>
          <div className='flex-1'>
            <h1 className='text-2xl font-bold'>{currentSong.title}</h1>
            <p className='text-white/70'>{currentSong.artist}</p>
          </div>
          <button
            onClick={() => setShowLyrics(!showLyrics)}
            className={`p-2 rounded-full transition-colors ${
              showLyrics
                ? 'bg-purple-600 text-white'
                : 'bg-white/10 hover:bg-white/20 text-white/70'
            }`}
            title='Toggle Lyrics'
          >
            <FileText className='w-5 h-5' />
          </button>
        </div>
      </div>

      {/* Main content area with cover and library */}
      <div className='relative z-10 flex-1 flex flex-col lg:flex-row min-h-0'>
        {/* Left side - Large cover image */}
        <div className='w-full lg:w-1/2 p-4 lg:p-6 flex items-center justify-center lg:pb-32'>
          <div className='relative w-full max-w-sm lg:max-w-md aspect-square'>
            <img
              src={currentSong.cover}
              alt={currentSong.title}
              className='w-full h-full object-cover rounded-2xl shadow-2xl'
            />
            <div className='absolute inset-0 rounded-2xl bg-gradient-to-t from-black/20 to-transparent'></div>

            {/* Lyrics overlay */}
            {showLyrics && (
              <div className='absolute inset-0 bg-black/40 backdrop-blur-sm rounded-2xl flex items-center justify-center p-4 lg:p-6'>
                <div className='w-full h-full overflow-y-auto custom-scrollbar'>
                  <div className='text-center'>
                    <h3 className='text-lg lg:text-xl font-bold mb-2 text-white'>
                      {currentSong.title}
                    </h3>
                    <p className='text-xs lg:text-sm text-white/80 mb-4 lg:mb-6'>
                      {currentSong.artist}
                    </p>
                    <div className='text-white leading-relaxed whitespace-pre-line font-supreme text-lg lg:text-xl'>
                      {currentSong.lyrics}
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right side - Library */}
        <div className='w-full lg:w-1/2 p-4 lg:p-6 flex flex-col min-h-0 flex-1'>
          <div className='flex items-center justify-between mb-4 lg:mb-6 flex-shrink-0'>
            <h2 className='text-2xl lg:text-3xl font-bold'>Your Library</h2>
            <div className='text-xs lg:text-sm text-white/60'>
              {songs.length} songs
            </div>
          </div>

          <div className='flex-1 overflow-y-auto pr-2 custom-scrollbar min-h-0'>
            <div className='grid gap-2 pb-20 lg:pb-0'>
              {songs.map((song, index) => (
                <div
                  key={song.id}
                  className={`flex items-center p-3 lg:p-4 rounded-xl cursor-pointer transition-all duration-200 group ${
                    index === currentSongIndex
                      ? 'bg-purple-600/20 border border-purple-500/30'
                      : 'hover:bg-white/5 border border-transparent'
                  }`}
                  onClick={() => {
                    setCurrentSongIndex(index)
                    setIsPlaying(true)
                  }}
                >
                  <div className='relative'>
                    <img
                      src={song.cover}
                      alt={song.title}
                      className='w-12 h-12 lg:w-14 lg:h-14 rounded-lg object-cover'
                    />
                    {index === currentSongIndex && isPlaying && (
                      <div className='absolute inset-0 bg-black/40 rounded-lg flex items-center justify-center'>
                        <div className='w-2 h-2 lg:w-3 lg:h-3 bg-purple-400 rounded-full animate-pulse'></div>
                      </div>
                    )}
                  </div>

                  <div className='ml-3 lg:ml-4 flex-1 min-w-0'>
                    <h3
                      className={`font-semibold truncate text-sm lg:text-base ${index === currentSongIndex ? 'text-purple-300' : 'text-white'}`}
                    >
                      {song.title}
                    </h3>
                    <p className='text-xs lg:text-sm text-white/60 truncate'>
                      {song.artist}
                    </p>
                  </div>

                  <div className='opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0'>
                    <Play className='w-4 h-4 lg:w-5 lg:h-5 text-white/60' />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom player controls - All controls together */}
      <div className='fixed bottom-0 left-0 right-0 z-20 bg-black/40 backdrop-blur-md border-t border-white/10 p-4'>
        <div className='max-w-6xl mx-auto'>
          {/* Progress bar */}
          <div className='mb-4'>
            <input
              type='range'
              min='0'
              max={duration}
              value={currentTime}
              onChange={handleSeek}
              className='w-full h-2 bg-white/20 rounded-full appearance-none cursor-pointer slider'
              style={{
                background: `linear-gradient(to right, #8b5cf6 0%, #8b5cf6 ${(currentTime / duration) * 100}%, rgba(255,255,255,0.2) ${(currentTime / duration) * 100}%, rgba(255,255,255,0.2) 100%)`
              }}
            />
            <div className='flex items-center justify-between mt-1'>
              <div className='text-xs text-white/60'>
                {formatTime(currentTime)}
              </div>
              <div className='text-xs text-white/60'>
                {formatTime(duration)}
              </div>
            </div>
          </div>

          {/* Main player controls */}
          <div className='grid lg:grid-cols-3 items-center gap-4'>
            <div className='hidden lg:flex items-center gap-3 min-w-0'>
              <img
                src={currentSong.cover}
                alt={currentSong.title}
                className='w-12 h-12 rounded-lg object-cover flex-shrink-0'
              />
              <div className='min-w-0'>
                <h3 className='font-semibold text-white truncate'>
                  {currentSong.title}
                </h3>
                <p className='text-sm text-white/60 truncate'>
                  {currentSong.artist}
                </p>
              </div>
            </div>

            <div className='flex items-center justify-center gap-4'>
              <button
                onClick={playPrevious}
                className='p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors'
              >
                <SkipBack className='w-5 h-5' />
              </button>
              <button
                onClick={togglePlay}
                className='p-3 rounded-full bg-purple-600 hover:bg-purple-700 transition-colors shadow-lg'
              >
                {isPlaying ? (
                  <Pause className='w-6 h-6' />
                ) : (
                  <Play className='w-6 h-6' />
                )}
              </button>
              <button
                onClick={playNext}
                className='p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors'
              >
                <SkipForward className='w-5 h-5' />
              </button>
            </div>

            <div className='hidden lg:block text-sm text-white/60 text-right'>
              <div>Now Playing</div>
              <div className='text-xs'>{songs.length} songs in queue</div>
            </div>
          </div>
        </div>
      </div>

      <audio
        ref={audioRef}
        src={currentSong.audio}
        onEnded={playNext}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={handleLoadedMetadata}
      />

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: #8b5cf6;
          cursor: pointer;
          box-shadow: 0 0 8px rgba(139, 92, 246, 0.5);
        }

        .slider::-moz-range-thumb {
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: #8b5cf6;
          cursor: pointer;
          border: none;
          box-shadow: 0 0 8px rgba(139, 92, 246, 0.5);
        }

        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }

        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 3px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(139, 92, 246, 0.6);
          border-radius: 3px;
        }

        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(139, 92, 246, 0.8);
        }
      `}</style>
    </div>
  )
}
