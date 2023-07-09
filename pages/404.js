import Link from 'next/link'
const Custom404 = () => {
  return (
    <>
      <div className='container h-screen bg-[#3498DB] text-white text-xl'>
        <h1 className='text-9xl'>: (</h1>
        <br />
        <h2>
          A <span>404</span> error occured, Page not found, check the URL and
          try again.
        </h2>
        <br />
        <br />
        <h3>
          <Link href='/'>Return to home</Link>&nbsp;|&nbsp;
          <Link href='javascript:history.back()'>Go Back</Link>
        </h3>
      </div>
    </>
  )
}

export default Custom404
