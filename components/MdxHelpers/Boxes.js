import { AiFillInfoCircle, AiOutlineWarning } from 'react-icons/ai'
import { BiErrorAlt } from 'react-icons/bi'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { nord } from 'react-syntax-highlighter/dist/cjs/styles/hljs'
import styles from '@/styles/StyleBox.module.css'
import clsx from 'clsx'

export const ErrorBox = ({ text }) => {
  return (
    <div className='bg-rose-700 rounded-xl text-white mb-6 px-3 py-2 flex items-center gap-4'>
      <BiErrorAlt size={30} />
      <span className='text-center w-full'>{text}</span>
    </div>
  )
}

export const InfoBox = ({ text }) => {
  return (
    <div className='bg-sky-700 rounded-xl text-white mb-6 px-3 py-2 flex items-center gap-4'>
      <AiFillInfoCircle size={30} />
      <span className='text-center w-full'>{text}</span>
    </div>
  )
}

export const WarningBox = ({ text }) => {
  return (
    <div className='bg-amber-500 rounded-xl text-white mb-6 px-3 py-2 flex items-center gap-4'>
      <AiOutlineWarning size={30} />
      <span className='text-center w-full'>{text}</span>
    </div>
  )
}

export const ImageBox = ({ link, text = '' }) => {
  return (
    <div className='rounded-xl'>
      <img
        src={link}
        className='rounded-xl mx-auto outline outline-sky-400 mb-3'
        alt='text'
      />
      <p className='text-center mt-0'>{text}</p>
    </div>
  )
}

export const StyleBox = props => {
  return (
    <>
      <div className="relative w-4/5 h-[100px] mx-auto overflow-hidden bg-[#ffe4c4] rounded-[15px] flex z-[1] shadow-[0_0_30px_5px_rgba(0,0,0,0.2)]">
        <div className="relative z-[5] w-full h-full flex items-center justify-center rounded-[15px] backdrop-filter backdrop-blur-[40px]">
          <div className="z-50 text-center">{props.children}</div>
        </div>
        <div className="absolute w-[230px] h-[230px] rounded-full z-[2] left-0 bg-[#ffb84c] animate-wave [animation-delay:0s]"></div>
        <div className="absolute w-[230px] h-[230px] rounded-full z-[2] top-0 left-[100px] bg-[#f266ab] animate-wave [animation-delay:0.5s]"></div>
        <div className="absolute w-[230px] h-[230px] rounded-full z-[2] top-[10px] left-[200px] bg-[#af71d38b] animate-wave [animation-delay:1s]"></div>
        <div className="absolute w-[230px] h-[230px] rounded-full z-[2] top-0 left-[350px] bg-[#2cd3e1] animate-wave [animation-delay:1.5s]"></div>
      </div>
    </>
  )
}

export const CodeBox = ({ code, language }) => {
  return (
    <SyntaxHighlighter language={language} style={nord}>
      {code}
    </SyntaxHighlighter>
  )
}
