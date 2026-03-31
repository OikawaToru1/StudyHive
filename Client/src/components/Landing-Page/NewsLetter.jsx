import React from 'react'

function NewsLetter() {
  return (
    <div className='w-full py-16 px-3'>
        <div className="max-w-[1240px] mx-auto grid lg:grid-cols-3">
            <div className=' lg:col-span-2'>
                <h1 className='md:text-4xl sm:text-3xl text-2xl font-bold py-2'>Want tips and tricks to boost your study sessions?</h1>
                <p>Signup for our newsletter to stay upto date</p>
            </div>
            <div className='my-4'>
                <div className=' flex flex-col sm:flex-row items-center justify-between w-full'>
                    <input className='bg-white rounded-md w-full p-3 text-black' type="email" placeholder='Enter your email here...' />
                   <button className='bg-blue-500 w-[200px] rounded-md font-medium ml-4 my-6 px-6 mx-auto py-2.5 text-black'>Notify me</button>
                </div>

            </div>
        </div>
    </div>
  )
}

export default NewsLetter