import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter, Routes, Route, createBrowserRouter } from 'react-router'
import {WebCam,WebRTC,MusicPlayer, Home, Notes, Games, Login, SignUp, SketchPad,RockPaper, Calculator } from './components/index.js'
import ReatDOM from 'react-dom/client'
import { store } from './store/store.js'
import {Provider} from 'react-redux'
import Auth from './components/Auth/Auth.jsx'
import DashBoard from './components/Dashboard/Dashboard.jsx'
import Layout from './components/Outlet/Layout.jsx'
import Queries from './components/Notes/Queries.jsx'
import {AdminLogin, AdmingDashboard} from './Pages/Admin/index.js'
import Leaderboard from './components/Leaderboard/Leaderboard.jsx'
import About from './components/About.jsx'



createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <BrowserRouter>

   <Routes>
    <Route path='/' element={<App/>} />
    <Route path='/auth/login' element={<Login/>} />
    <Route path='/auth/signup' element={<SignUp/>} />
    <Route path='/camera' element = {<WebCam/>} />
    <Route path='/leaderboard' element = {<Leaderboard/>} />
    <Route path='/about' element = {<About/>} />

    <Route path='/chat' element= {
      <Auth>
        <WebRTC/>
      </Auth>} 
    />
    <Route path='/home' element={<Home/>} />
    <Route element={<Layout/>}>
    <Route path='/music' element = {<MusicPlayer/>} />
   
     <Route path='/notes' element={<Notes/>} />
    <Route path='/games' element={<Games/>} />
    <Route path='/dashboard' element={
      <Auth>
        <DashBoard/>
      </Auth>
    } />
    <Route path='/help' element={<Queries/>} />
    <Route path='/sketchpad' element={<SketchPad/>} />
    <Route path='/rock-paper-scissors' element={<RockPaper/>} />
    <Route path='/calculator' element={<Calculator/>} />
    </Route>

    <Route path='/sh/admin/login' element={<AdminLogin/>} />
    <Route path='/sh/admin/dashboard' element={<AdmingDashboard/>} />

   </Routes>

  </BrowserRouter>
  </Provider>
)
