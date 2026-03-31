import React from 'react'
import { useNavigate } from 'react-router'


function Card({image, title, description, link}) {
    const navigate = useNavigate();
  return (
    <div onClick={() => navigate(link)} className='border-1 w-[300px] rounded-md  shadow-md'>
        <div className='border-b-1 mb-2 h-[300px] w-[300px] '>
            <img className='max-h-[300px] max-w-[300px]' height={200} width={500} src={image} alt={title} />
        </div>
        <div className='text-center mb-1'>
            <h3>{title}</h3>
            <p>{description}</p>
        </div>
    </div>
  )
}

export default Card