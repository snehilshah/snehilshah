import Image from 'next/image'
import { AiFillInfoCircle, AiOutlineWarning } from 'react-icons/ai'
import { BiErrorAlt } from 'react-icons/bi'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { nord } from 'react-syntax-highlighter/dist/cjs/styles/hljs'

export const ErrorBox = ({ text }) => {
  return (
    <div className='bg-rose-700 rounded-xl text-white mb-6 px-3 py-2 flex items-center gap-4'>
      <BiErrorAlt size={30} />
      {text}
    </div>
  )
}

export const InfoBox = ({ text }) => {
  return (
    <div className='bg-sky-700 rounded-xl text-white mb-6 px-3 py-2 flex items-center gap-4'>
      <AiFillInfoCircle size={30} />
      {text}
    </div>
  )
}

export const WarningBox = ({ text }) => {
  return (
    <div className='bg-amber-500 rounded-xl text-white mb-6 px-3 py-2 flex items-center gap-4'>
      <AiOutlineWarning size={30} />
      {text}
    </div>
  )
}

export const ImageBox = ({ link }) => {
  return (
    <div className='rounded-xl'>
      <img src={link} className='rounded-xl mx-auto outline outline-sky-400' />
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
