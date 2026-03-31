import React from 'react'
import { useState } from 'react'
import { useSelector } from 'react-redux'

function TodoStatus({themeStatus, customThemeStatus, customTheme}) {

    const todos = useSelector(state =>state.todo.todos)
    const completedTodo = todos.filter(todo=> todo.completedStatus == true).length
    console.log(customThemeStatus, customTheme, 'theme status in todo status')

  return (

    <div 
   
    className={`${
        customThemeStatus
          ? `bg-${customTheme}`
          : themeStatus
          ? "bg-black text-white"
          : "bg-white text-black"
      } w-2/5 text-center   rounded-md border-1 border-gray-800 flex flex-col justify-around p-3 `}
      >
            <p className='text-lg font-bold'>Work Status</p>
            <span className='text-gray-400 text-sm'>{`${completedTodo} of ${todos.length} complete`}</span>
           
         </div>
  )
}

export default TodoStatus