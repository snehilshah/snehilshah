import Image from 'next/image'
import Logo from '../../public/logo-s.png'

const BlogHero = () => {
  return (
    <section class='text-gray-600 body-font'>
      <div class='container px-5 py-24 mx-auto'>
        <div class='xl:w-1/2 lg:w-3/4 w-full mx-auto text-center'>
          <h3 class='leading-relaxed text-3xl text-stone-950'>
            Lets Read and Connect
          </h3>
          <h3 class='leading-relaxed text-lg text-stone-950'>
            Find the latest of my writing here
          </h3>
          <span class='inline-block h-1 w-10 rounded bg-stone-500 mt-8'></span>
        </div>
      </div>
    </section>
  )
}

export default BlogHero
