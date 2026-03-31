import React,{useId} from 'react'
import { useSelector } from 'react-redux'

function Input({placeholder, type,className, ...props}, ref) {
    const theme = useSelector(state => state.theme.value)
    const id = useId()


  return (
    <>
        <input 
          ref={ref}
          id={id}
          type={type} 
          {...props}  
          placeholder={placeholder} 
          className={`${theme? "text-white  border-white": "text-black  border-black"} border-1 rounded-md h-[50px] w-full px-3 py-1 ${className} `} 
        />
    </>
  )
}

export default React.forwardRef(Input)