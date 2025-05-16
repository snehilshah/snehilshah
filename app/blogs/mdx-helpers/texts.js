export const Standout = ({ text }) => {
  return (
    <span className='bg-clip-text text-transparent bg-linear-to-r from-fuchsia-600 to-rose-600'>
      <b>{text}</b>
    </span>
  )
}
