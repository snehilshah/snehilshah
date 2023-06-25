const GridChild = ({ children }) => {
  return (
    <div className='w-px h-screen bg-black border border-black'>
      <div className='hidden text-9xl text-stone-700/30 md:flex flex-col mt-96'>
        {children}
      </div>
    </div>
  )
}

const BGGrid = () => {
  return (
    <div className='absolute bg-stone-900 w-screen h-screen'>
      <div className='flex justify-evenly text-9xl text-stone-700/50'>
        <GridChild>
          <span>D</span>
          <span>O</span>
        </GridChild>
        <GridChild>
          <span>E</span>
          <span>P</span>
        </GridChild>
        <GridChild>
          <span>V</span>
          <span>E</span>
        </GridChild>
        <GridChild>
          <span>E</span>
          <span>R</span>
        </GridChild>
        <GridChild>
          <span>L</span>
        </GridChild>
      </div>
    </div>
  )
}

export default BGGrid
