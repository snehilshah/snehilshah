const GridChild = () => {
  return (
    <div className='w-px h-screen bg-stone-400 border border-stone-400'>
      <div className='hidden text-[320px] text-stone-700/30 md:flex flex-col mt-24 font-bold'>
        {/* {children} */}
      </div>
    </div>
  )
}

const BlogBGGrid = () => {
  return (
    <div className='fixed bg-stone-100 w-screen h-screen -z-20'>
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

export default BlogBGGrid
