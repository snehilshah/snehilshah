import React from 'react'

const Custom404 = () => {
  return (
    <>
      <div class='container h-screen bg-[#3498DB] text-white text-xl'>
        <h1 className='text-9xl'>: (</h1>
        <br />
        <h2>
          A <span>404</span> error occured, Page not found, check the URL and
          try again.
        </h2>
        <br />
        <br />
        <h3>
          <a href='/'>Return to home</a>&nbsp;|&nbsp;
          <a href='javascript:history.back()'>Go Back</a>
        </h3>
      </div>
    </>
  )
}

export default Custom404
