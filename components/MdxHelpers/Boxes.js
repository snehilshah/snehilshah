import { Info, CircleAlert, OctagonX } from 'lucide-react'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { nord } from 'react-syntax-highlighter/dist/cjs/styles/hljs'

export const ErrorBox = ({ text }) => {
  return (
    <div className='bg-rose-700 rounded-xl text-white mb-6 px-3 py-2 flex items-center gap-4'>
      <OctagonX size={30} />
      <span className='text-center w-full font-product text-rose-200'>
        {text}
      </span>
    </div>
  )
}

export const InfoBox = ({ text }) => {
  return (
    <div className='bg-sky-700 rounded-xl text-white mb-6 px-3 py-2 flex items-center gap-4'>
      <Info size={30} />
      <span className='text-center w-full font-product text-sky-200'>
        {text}
      </span>
    </div>
  )
}

export const WarningBox = ({ text }) => {
  return (
    <div className='bg-amber-500 rounded-xl text-white mb-6 px-3 py-2 flex items-center gap-4'>
      <CircleAlert size={30} />
      <span className='text-center w-full font-product text-amber-950'>
        {text}
      </span>
    </div>
  )
}

export const ImageBox = ({ link, text = '' }) => {
  return (
    <div className='rounded-xl'>
      <div className='relative rounded-xl bg-gradient-to-r from-[#216F3F] via-rose-500 to-[#3F216F] animate-gradient-x'>
        <img
          src={link}
          className='rounded-xl p-[3px] mx-auto w-full h-full object-cover'
          alt={text || 'image'}
        />
      </div>
      <figcaption className='text-center mt-0 text-[#59321A] font-bold'>
        {text}
      </figcaption>
    </div>
  )
}

export const StyleBox = props => {
  return (
    <div className='relative w-4/5 h-[100px] mx-auto overflow-hidden bg-[#ffe4c4] rounded-[15px] flex z-[1] shadow-[0_0_30px_5px_rgba(0,0,0,0.2)]'>
      <div className='relative z-[5] w-full h-full flex items-center justify-center rounded-[15px] backdrop-filter backdrop-blur-[40px]'>
        <div className='font-product text-amber-950 text-base z-50 text-center p-4'>
          {props.children}
        </div>
      </div>
      <div className='absolute w-[230px] h-[230px] rounded-full z-[2] left-0 bg-[#ffb84c] animate-wave [animation-delay:0s]'></div>
      <div className='absolute w-[230px] h-[230px] rounded-full z-[2] top-0 left-[100px] bg-[#f266ab] animate-wave [animation-delay:0.5s]'></div>
      <div className='absolute w-[230px] h-[230px] rounded-full z-[2] top-[10px] left-[200px] bg-[#af71d38b] animate-wave [animation-delay:1s]'></div>
      <div className='absolute w-[230px] h-[230px] rounded-full z-[2] top-0 left-[350px] bg-[#2cd3e1] animate-wave [animation-delay:1.5s]'></div>
    </div>
  )
}

export const CodeBox = ({ code, language }) => {
  return (
    <SyntaxHighlighter language={language} style={nord}>
      {code}
    </SyntaxHighlighter>
  )
}
