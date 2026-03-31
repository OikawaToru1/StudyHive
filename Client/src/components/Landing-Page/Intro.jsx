import React from 'react'
import hero from '../../assets/hero.jpeg'

function Intro() {
  return (
    <div className='w-full  bg-white px-12 py-10'> 

    <div className='grid md:grid-cols-2 mx-auto max-w-[1240px] '>
    <img className='w-[500px] mx-auto my-4 md:w-[800px]' src={hero} alt="/img" />
  
    <div className='text-black flex flex-col justify-center'>
      <p className='text-blue-500 font-bold uppercase '>A platform to study and share</p>
      <h1 className='md:text-4xl font-bold sm:text-3xl text-2xl'>Learn effectively with various techniques</h1>
      <p className=''>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iusto neque labore maxime enim doloribus aliquid. Modi corporis ad nostrum? Ab.</p>
      <button className='bg-black w-[200px] rounded-md font-medium my-6 mx-auto py-2.5 text-blue-500'>Get Started</button>
    </div>

    </div>

    </div>
  )
}

export default Intro