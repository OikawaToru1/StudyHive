import React, { useEffect, useState } from 'react'
import { ReactTyped } from 'react-typed'
import {Link, useNavigate} from 'react-router'
import { useSelector } from 'react-redux'
import { addUser } from '../../store/authSlice'
import axios from 'axios'

function Body() {
    const navigate = useNavigate()
    const theme = useSelector(state=> state.theme.value)
    const authStatus = useSelector(state=> state.auth.user)
    const username = useSelector(state => state.auth.user.username)

    console.log('Theme and auth status', theme, authStatus)

    useEffect(()=>{

        axios.get('/api/auth/me')
        .then(res=> {
        console.log('Auth state', res.data)
        if(!username)
        {
            dispatch(addUser({username: res.data.username}))
        }
        })
        .catch(err=> console.log('err in authenticated me', err))
    },[navigate])

    
  return (
    <div>
        <div className={`${theme? "bg-black" :"bg-white"} h-screen w-full text-center mx-auto max-w-[800px] mt-[96px] flex flex-col `}>
            {username && <p>Hey Folks {username}</p>}
            <h1 className='text-blue-500 font-bold p-2 text-3xl'>Welcome to StudyHive</h1>
            <h1 className='md:text-7xl sm:5xl text-4xl font-bold md:py-6'>A Learning platform that promotes efficient learning.</h1>
            <div className='flex justify-center py-4 '>
                <p className='md:text-5xl sm:text-3xl text-xl font-bold '>
                    Let's
                </p>
                <ReactTyped 
                className='md:text-5xl sm:text-3xl text-xl font-bold md:pl-4 pl-2'
                strings={[
                    "get conntected",
                    "Study solo",
                    " Study in group",
                    " Share knowledge",
                    
                ]}
                typeSpeed={80}
                backSpeed={60}
                loop
                />
            </div>
            <p className='md:text-2xl text-xl font-bold text-gray-500'> If you are ready to boost your productivity, join us in this project</p>
            <button className='bg-blue-500 w-[200px] cursor-pointer rounded-md font-medium my-6 mx-auto py-2.5 text-black' onClick={()=>{navigate('/home')}}>Get Started</button>
        </div>
    </div>
  )
}

export default Body