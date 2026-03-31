import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router';

function Calculator() {
    const theme = useSelector((state) => state.theme.value);
    const navigate = useNavigate();
  return (
    <div className={`${theme ? 'bg-gray-800 text-white' : 'bg-white text-black'} min-h-screen p-5`}>
        <span onClick={()=>{navigate('/games')}}> Back </span>
      <h1 className='text-3xl font-bold mb-5'>Calculator</h1>
      <div className='border border-gray-300 rounded-md p-4'>
        <iframe className='w-full h-[80vh]' src="https://oikawatoru1.github.io/basicCalculator/" frameborder="0"></iframe>
      </div>
    </div>  
  )
}

export default Calculator