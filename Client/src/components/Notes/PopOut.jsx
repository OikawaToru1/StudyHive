import React from 'react'
import { useSelector } from 'react-redux'
import { useState } from 'react'

function PopOut({status, msg, showMsg}) {
  const [show,setShow] = useState(showMsg)
  const theme = useSelector(state=> state.theme.value)
  return (
    <div className={`${theme? "bg-white text-black": "bg-black text-white"} ${show? "visible" : "invisible"} border-1 h-[100px] w-[300px] mx-auto rounded-md flex flex-col  items-center gap-12 absolute top-1/3 left-1/2 translate-x-[-50%] translate-y-[-50%] justify-center p-4   `}>
      <div className='flex justify-between px-4 w-[300px]  '>
        <p>Upload  : {status}  </p>
        <p className='text-red-500 cursor-pointer' onClick={()=> setShow(false)}>X</p>
      </div>
      <h2>{msg}</h2>
    </div>
  )
}

export default PopOut