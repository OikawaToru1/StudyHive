import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router';


function RockPaper() {
    const navigate = useNavigate();
    const theme = useSelector((state) => state.theme.value);
  return (
    <div className={`${theme ? 'bg-gray-800 text-white' : 'bg-white text-black'} min-h-screen p-5`}>
        <span onClick={()=>{navigate('/games')}}> Back </span>
      <h1 className='text-3xl font-bold mb-5'>Rock Paper Scissors</h1>
      <div className='border border-gray-300 rounded-md p-4'>
        <iframe className='w-full h-[80vh]' src="https://oikawatoru1.github.io/RockPaperScissor/" frameborder="0"></iframe>
      </div>
    </div>
  )
}

export default RockPaper