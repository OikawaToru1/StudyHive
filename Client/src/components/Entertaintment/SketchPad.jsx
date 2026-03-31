import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router';

function SketchPad() {
  const theme = useSelector((state) => state.theme.value);
  const navigate = useNavigate();
  return (
    <div className={`${theme ? 'bg-gray-800 text-white' : 'bg-white text-black'} min-h-screen p-5`}>
        <span onClick={()=>{navigate('/games')}}> Back </span>
      <div className='border border-gray-300 rounded-md p-4'>
        <iframe className='w-full h-[80vh]' src="https://oikawatoru1.github.io/Etch-a-Sketch/" frameborder="0"></iframe>
      </div>
    </div>
  )
}

export default SketchPad