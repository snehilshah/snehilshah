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
      <div id={clsx(styles.content)}>
        <div id={clsx(styles.blurer)}>
          <div className='z-50 text-center'>{props.children}</div>
        </div>
        <div className={clsx(styles.blob)}></div>
        <div className={clsx(styles.blob)}></div>
        <div className={clsx(styles.blob)}></div>
        <div className={clsx(styles.blob)}></div>
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
