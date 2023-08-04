export const StandOut = ({ text }) => {
  return (
    <span className='bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-600 to-rose-600'>
      <b>{text}</b>
    </span>
  )
}
