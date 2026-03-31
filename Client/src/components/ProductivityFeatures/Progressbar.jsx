import {React,useState} from 'react'

function Progressbar({sessions , themeStatus, customTheme, customThemeStatus}) {

  
  
  return (
    <>
    <div className={` flex `}>
      <div className={`${
        customThemeStatus
          ? `bg-${customTheme}`
          : themeStatus
          ? "bg-black text-white"
          : "bg-white text-black"
      } flex-1 w-[300px] mr-4 h-[100px]  border-1 border-gray-800 rounded-md flex flex-col items-center justify-around text-lg `}>
        <p>Sessions</p>
        <p>{sessions}</p>
      </div>
      <div className={` ${
        customThemeStatus?
         `bg-${customTheme}`
          : themeStatus
          ? "bg-black text-white"
          : "bg-white text-black"
      } flex-1 w-[300px] h-[100px]  border-1 border-gray-800 rounded-md flex flex-col items-center justify-around text-lg `}>
        <p>Mode</p>
        <p>Study/Work</p>
      </div>
      </div>   
    </>
  )
}

export default Progressbar