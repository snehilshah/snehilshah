import React from 'react'

const About = () => {
  return (
    <section class='text-white body-font px-[10vw] mt-24'>
      <div class='container mx-auto flex px-5 py-24 md:flex-row flex-col items-center'>
        <div class='lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center'>
          <h1 class='title-font sm:text-4xl text-3xl mb-4 font-medium text-white whitespace-nowrap'>
            Code with Passion
            <br />
            Create with Purpose
          </h1>
          <p class='mb-8 leading-relaxed'>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum,
            necessitatibus, repellat cupiditate dignissimos sapiente dolorum
            vero laboriosam id deleniti voluptas ea possimus, animi sint
            ratione! Odit consequuntur iste commodi quidem libero sunt vitae ex
            architecto, tenetur, tempora quis inventore facilis rerum maxime
            aliquam expedita modi fugiat est? Reprehenderit, doloremque laborum.
          </p>
          {/* <div class='flex justify-center'>
            <button class='inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg'>
              Button
            </button>
            <button class='ml-4 inline-flex text-white bg-gray-100 border-0 py-2 px-6 focus:outline-none hover:bg-gray-200 rounded text-lg'>
              Button
            </button>
          </div> */}
        </div>
        <div class='lg:max-w-lg lg:w-full md:w-1/2 w-5/6'>
          <img
            class='object-cover object-center rounded'
            alt='hero'
            src='https://dummyimage.com/720x600'
          />
        </div>
      </div>
    </section>
  )
}

export default About
