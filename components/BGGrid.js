const GridChild = ({ children }) => {
  return (
    <div className='w-px h-screen bg-black border border-black'>
      <div className='hidden text-9xl text-stone-700/30 font-cabinet md:flex flex-col mt-96'>
        {children}
      </div>
    </div>
  )
}

const BGGrid = () => {
  return (
    <div className='fixed bg-stone-900 w-screen h-screen -z-20'>
      <div className='flex justify-evenly text-9xl text-stone-700/50'>
        <div className='right-3 relative md:static'>
          <GridChild>
            <span>D</span>
            <span>O</span>
          </GridChild>
        </div>
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
        <div className='left-3 relative md:static'>
          <GridChild>
            <span>L</span>
          </GridChild>
        </div>
      </div>
    </div>
  )
}

export default BGGrid
