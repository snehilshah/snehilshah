const Heading = ({ title, details }) => {
  return (
    <div>
      <p className='text-4xl font-bold border-b-4 border-stone-500 p-2 inline tracking-wide'>
        {title}
      </p>
      <p className='py-6'>{details}</p>
    </div>
  )
}

export default Heading
