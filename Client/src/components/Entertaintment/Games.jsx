import React from 'react'
import { useSelector } from 'react-redux';
import Card from './Card';
import cameraIcon from '../../assets/photo-camera-icon.png'
import sketchIcon from '../../assets/sketch.png'
import rockpaperIcon from '../../assets/rock-paper-scissors.png'
import calcutor from '../../assets/calculator.jpeg'
import soon from '../../assets/comming-soon.avif'
import { Link } from 'react-router';
import { MdTableRows } from "react-icons/md";


function Games() {
    const theme = useSelector((state) => state.theme.value);
    console.log(theme);
    const [showSideBar, setShowSideBar] = React.useState(true);
    const sidebarOptions = [
    { name: "DashBoard", path: "/dashboard" },
    { name: "Chat", path: "/chat" },
    { name: "Notes", path: "/notes" },
    { name: "Entertainment", path: "/games" },
    { name: "Leaderboard", path: "/leaderboard" },
    { name: "Helping Zone", path: "/help" },
  ];
  return (
    // <div className={`${theme ? 'bg-gray-800 text-white' : 'bg-white text-black'} min-h-screen p-5`}> 
    //     {/* <div className='absolute left-0 top-18  rounded-r-full bg-gray-700 p-2 font-bold' onClick={()=>{setShowSideBar(prev=> !prev)}}>Show</div> */}
    //      <div className='absolute left-0 top-10  translate-y-[-50%] font-bold' onClick={()=>{setShowSideBar(prev=> !prev)}}><MdTableRows size={24} /></div>
    //     {showSideBar && (
    //         <div className={`${theme ? 'bg-gray-800 text-white' : 'bg-white text-black' } absolute border-r-1 border-gray-500 h-full lg:w-1/6 md:w-[200px] sm:w-3/6 w-4/6  `}>
    //         {sidebarOptions.map((option) => (
    //             <div className=" h-14 flex items-center justify-start px-4 font-bold text-lg rounded-md my-3 text-center hover:text-gray-400">
    //             <Link to={option.path}>{option.name} </Link>
    //             </div>
    //         ))}
    //         </div>
    //     )}

    //     <h1 className='text-3xl font-bold mb-5'><Link to="/home">Games & Entertainment</Link></h1>
    //     <div className='grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-4'>
    //         <Card 
    //             image=  {cameraIcon}
    //             title="Camera App"
    //             description="A simple camera application."
    //             link="/camera"
    //         />
    //         <Card 
    //             image={sketchIcon}
    //             title="SketchPad"
    //             description="A simple sketchpad application."
    //             link="/sketchpad"
    //         />
    //         <Card 
    //             image={rockpaperIcon}
    //             title="Rock Paper Scissors"
    //             description="A classic game of Rock Paper Scissors."
    //             link="/rock-paper-scissors"
    //         />
    //         <Card 
    //             image={calcutor}
    //             title="Calculator"
    //             description="A simple calculator application."
    //             link="/calculator"
    //         />
    //         <Card 
    //             image={soon}
    //             title="Suprise suprise"
    //             description="Comming soon"
    //         />
    //     </div>
    // </div>
        <div className={`h-screen w-full flex overflow-hidden transition-colors duration-500 ${theme ? "bg-[#0a0a0a] text-white" : "bg-white text-slate-900"}`}>
  
  {/* SIDEBAR: Consistent with other pages */}
  {showSideBar && (
    <aside className={`shrink-0 border-r h-full lg:w-1/6 md:w-[200px] sm:w-3/6 w-4/6 flex flex-col transition-all duration-300 ${theme ? 'bg-black border-white/5 shadow-2xl shadow-black' : 'bg-slate-50 border-slate-200'}`}>
     
      <div className="flex-1 overflow-y-auto px-3 custom-scrollbar">
        {sidebarOptions.map((option) => (
          <Link 
            key={option.name} 
            to={option.path} 
            className={`h-12 flex items-center px-4 font-bold rounded-xl mb-1 transition-all ${
              theme ? 'hover:bg-white/5 text-slate-400 hover:text-white' : 'hover:bg-blue-50 text-slate-600 hover:text-blue-600'
            }`}
          >
            {option.name}
          </Link>
        ))}
      </div>
    </aside>
  )}

  {/* MAIN CONTENT AREA */}
  <main className="flex-1 flex flex-col h-full relative overflow-hidden">
    
    {/* Sidebar Toggle Trigger */}
    <div className="absolute left-6 top-8 z-50 cursor-pointer p-2 hover:bg-blue-500/10 rounded-xl text-blue-500 transition-colors" onClick={() => setShowSideBar(prev => !prev)}>
      <MdTableRows size={26} />
    </div>

    {/* HEADER: Matching the Query Page style */}
    <header className="shrink-0 pt-16 px-10 pb-6 max-w-7xl mx-auto w-full">
      <h1 className="text-3xl font-bold tracking-tight">
        <Link to="/home" className="hover:text-blue-600 transition-all">Games & Entertainment</Link>
      </h1>
      <p className="text-sm font-medium opacity-50 mt-1">Take a break and explore these modules</p>
    </header>

    {/* GAMES GRID: Scrollable viewport */}
    <div className="flex-1 overflow-y-auto px-10 pb-10 custom-scrollbar">
      <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-6 max-w-7xl mx-auto">
        
        {[
          { img: cameraIcon, title: "Camera App", desc: "A simple camera application.", path: "/camera" },
          { img: sketchIcon, title: "SketchPad", desc: "A simple sketchpad application.", path: "/sketchpad" },
          { img: rockpaperIcon, title: "Rock Paper Scissors", desc: "A classic break game.", path: "/rock-paper-scissors" },
          { img: calcutor, title: "Calculator", desc: "A simple math tool.", path: "/calculator" },
          { img: soon, title: "Surprise", desc: "Coming soon.", path: null }
        ].map((item, idx) => (
          <div 
            key={idx} 
            className={`group flex flex-col rounded-[2rem] border-2 overflow-hidden transition-all hover:scale-[1.02] ${
              theme ? 'bg-white/5 border-white/5 hover:border-blue-500/30 shadow-2xl shadow-black/20' : 'bg-gray-50 border-gray-100 hover:border-blue-500/20 shadow-sm'
            }`}
          >
            <div className="p-5 flex flex-col h-full">
              {/* IMAGE WRAPPER: Centers the image and prevents spill */}
              <div className={`aspect-square w-full rounded-2xl flex items-center justify-center p-6 mb-4 overflow-hidden ${theme ? 'bg-white/[0.03]' : 'bg-white shadow-inner'}`}>
                 <img 
                   src={item.img} 
                   alt={item.title} 
                   className="max-h-full max-w-full object-contain pointer-events-none"
                 />
              </div>

              <div className="flex-1 flex flex-col">
                <h3 className="text-lg font-bold mb-1">{item.title}</h3>
                <p className="text-xs font-medium opacity-60 line-clamp-2 mb-4">{item.desc}</p>
                
                {item.path && (
                  <Link 
                    to={item.path} 
                    className="mt-auto w-full py-2 bg-blue-600 text-white rounded-xl text-xs font-bold text-center hover:bg-blue-700 transition-colors"
                  >
                    Open App
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}

      </div>
    </div>
  </main>
</div>
)
}

export default Games