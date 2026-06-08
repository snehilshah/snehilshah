import { Info, Lightbulb, TriangleAlert, OctagonX } from 'lucide-react'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { nord } from 'react-syntax-highlighter/dist/cjs/styles/hljs'

function Callout({ kind, Icon, title, text, children }) {
  return (
    <div className={`callout callout--${kind}`}>
      <span className='callout__ic'>
        <Icon />
      </span>
      <div>
        <p className='callout__t'>{title}</p>
        <p className='callout__b'>{text ?? children}</p>
      </div>
    </div>
  )
}

export const InfoBox = ({ text, children }) => (
  <Callout kind='info' Icon={Info} title='Note' text={text}>
    {children}
  </Callout>
)

export const TipBox = ({ text, children }) => (
  <Callout kind='tip' Icon={Lightbulb} title='Tip' text={text}>
    {children}
  </Callout>
)

export const WarningBox = ({ text, children }) => (
  <Callout kind='warning' Icon={TriangleAlert} title='Heads-up' text={text}>
    {children}
  </Callout>
)

export const ErrorBox = ({ text, children }) => (
  <Callout kind='error' Icon={OctagonX} title='Careful' text={text}>
    {children}
  </Callout>
)

export const ImageBox = ({ link, text = '' }) => (
  <figure className='fig'>
    <img src={link} alt={text || 'image'} />
    {text && <figcaption>{text}</figcaption>}
  </figure>
)

export const CodeBox = ({ code, language }) => (
  <div className='codeblock'>
    <div className='codeblock__bar'>
      <span className='codeblock__dots'>
        <i style={{ background: '#bf616a' }} />
        <i style={{ background: '#ebcb8b' }} />
        <i style={{ background: '#a3be8c' }} />
      </span>
      <span className='codeblock__lang'>{language}</span>
    </div>
    <SyntaxHighlighter
      language={language}
      style={nord}
      customStyle={{
        margin: 0,
        background: '#2e3440',
        padding: '16px 18px',
        borderRadius: 0
      }}
    >
      {code}
    </SyntaxHighlighter>
  </div>
)

export const StyleBox = props => {
  return (
    <div className='relative w-4/5 h-[100px] mx-auto overflow-hidden bg-[#ffe4c4] rounded-[15px] flex z-1 shadow-[0_0_30px_5px_rgba(0,0,0,0.2)]'>
      <div className='relative z-5 w-full h-full flex items-center justify-center rounded-[15px] backdrop-filter backdrop-blur-2xl'>
        <div className='font-product text-amber-950 text-base z-50 text-center p-4'>
          {props.children}
        </div>
      </div>
      <div className='absolute w-[230px] h-[230px] rounded-full z-2 left-0 bg-[#ffb84c] animate-wave [animation-delay:0s]'></div>
      <div className='absolute w-[230px] h-[230px] rounded-full z-2 top-0 left-[100px] bg-[#f266ab] animate-wave [animation-delay:0.5s]'></div>
      <div className='absolute w-[230px] h-[230px] rounded-full z-2 top-[10px] left-[200px] bg-[#af71d38b] animate-wave [animation-delay:1s]'></div>
      <div className='absolute w-[230px] h-[230px] rounded-full z-2 top-0 left-[350px] bg-[#2cd3e1] animate-wave [animation-delay:1.5s]'></div>
    </div>
  )
}
