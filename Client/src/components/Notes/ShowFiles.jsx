import React from 'react'
import { Link } from 'react-router'

function ShowFile({url, title , description}) {
  return (
   <>
    <div className='bg-white text-black py-5 px-3'><Link to={url}> <p>{title}</p> <span>{description}</span> </Link></div>
   </>
  )
}

export default ShowFile