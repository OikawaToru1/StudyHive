import React from 'react'

function Button({text}) {
  return (
    <>
      <button type="submit" 
        className='w-full h-[50px] border-1 hover:cursor-pointer hover:bg-blue-900  bg-blue-500 text-white rounded-md px-3 py-1 '>
        {text}
      </button>
    </>
  )
}

export default Button