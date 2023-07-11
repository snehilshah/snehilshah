import clsx from 'clsx'
const FloatingCircle = ({ top, left }) => {
  return (
    <div
      className={clsx(
        'w-16 h-16 border-[18px] border-solid border-blue-400 rounded-[40px] top-[{top}] left-[{left}]'
      )}
    ></div>
  )
}

export default FloatingCircle
