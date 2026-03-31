import React from 'react'
import Header from '../Landing-Page/Header'
import { Outlet } from 'react-router'
import { useSelector } from 'react-redux'

function Layout() {
  const timerPlaying = useSelector(state=> state.pomo.timer.isPlaying)
  console.log(typeof(timerPlaying))
  const minutes = useSelector(state => state.pomo.timer.minutes)
  const seconds = useSelector(state=> state.pomo.timer.seconds)

  return (
    <div>
      <Header/>
      <main>
        {
          timerPlaying ? "boss" : ""
        }
        <Outlet />
      </main>
    </div>
  )
}

export default Layout