import { useState, useRef, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { changeTheme } from './store/themeSlice.js'
import {Header,Body, WebCam, Intro, NewsLetter,Footer, WebRTC} from './components/index.js'
import axios from 'axios'
import { useNavigate } from 'react-router'
import { changeScreenChoice } from './store/screenChoiceSlice.js'




function App() {
  const elementRef = useRef(null)
  const screenChoice = useSelector(state=> state.screen.value)
  const dispatch = useDispatch()
  console.log(screenChoice)
  const theme = useSelector(state=> state.theme.value)
  const navigate = useNavigate()

  window.addEventListener("keydown",(event)=>{
      if(event.key == "Escape")
      {
        dispatch(changeScreenChoice(false))
      }
  })
    
  useEffect(()=>{
    axios.get('/api/users')
    .then(res=> console.log(res.data))
    .catch(err=> console.log('err in fetch',err));

    // const element = elementRef.current;
    // if (element) {
    //   // Use the standard API and vendor prefixes for broader compatibility
    //   if (element.requestFullscreen) {
    //     element.requestFullscreen();
    //   } else if (element.mozRequestFullScreen) { // Firefox
    //     element.mozRequestFullScreen();
    //   } else if (element.webkitRequestFullscreen) { // Chrome, Safari, Opera
    //     element.webkitRequestFullscreen();
    //   } else if (element.msRequestFullscreen) { // IE/Edge
    //     element.msRequestFullscreen();
    //   }
    // }
  },[navigate, screenChoice])
  return (
  <div ref={elementRef} className={`${theme? "bg-black" : "bg-white text-black"}  `}>
    <Header/>
    <Body/>
    <Intro/>
    <NewsLetter/>
    <Footer/>
  </div>
  )
}

export default App
