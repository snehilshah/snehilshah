const Heading = ({ title, details }) => {
  return (
    <div className='flex flex-col items-center lg:block'>
      <p className='text-4xl font-bold border-b-4 border-stone-500 p-2 pl-0 inline tracking-wide'>
        {title}
      </p>
      <p className='pb-6 md:py-6'>{details}</p>
    </div>
  )
}

export default Heading
