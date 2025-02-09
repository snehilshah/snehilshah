import Image from 'next/image'
function Cards({ title, desc, src, classes, bgColor }) {
  return (
    <div className='hero'>
      <Image
        src={src}
        className='aspect-square object-cover h-full w-full'
        alt='Project Background'
      />
      <div className={`text bg-gradient-to-br ${bgColor}`}></div>
      <div className='main-text'>
        <p className={`${classes}`}>{title}</p>
      </div>
      <p className=''>{desc}</p>
    </div>
  )
}

export default Cards
