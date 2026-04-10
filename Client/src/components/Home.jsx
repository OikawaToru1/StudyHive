import { React, useState, useEffect, useRef } from "react";
import useSound from "use-sound";
// import {Howl, Howler} from 'howler';
import {
  clockSound,
  whitenoise,
  calm,
  rainsound,
  meditation,
  timeup,
  harekrishna,
  rock,
  flute,
  pop,
} from "../assets/sound.js";
import { Todo, Progressbar, Notes } from "./index.js";
import { Header, TodoStatus } from "./index.js";
import { NavLink, useNavigate } from "react-router";
import { CiPlay1 } from "react-icons/ci";
import { CiPause1 } from "react-icons/ci";
import { MdTableRows } from "react-icons/md";
import { Link } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { changeTheme } from "../store/themeSlice.js";
import axios from "axios";
import { addUser, removeUser } from "../store/authSlice.js";
import { changeTimerStatus, changeTimerValue } from "../store/timerSlice.js";
import DocViewer,{DocViewerRenderers} from 'react-doc-viewer'
import report from  '../assets/showcase.pdf'
import sijan from '../assets/sijan.pdf'
import showcase from '../assets/showcase.pdf'
import Draggable from "react-draggable";
import { DraggableCore } from "react-draggable";
import {SplitPane , Pane} from 'react-split-pane'
import { changeScreenChoice } from "../store/screenChoiceSlice.js";
import bg from '../assets/fabio.jpg'
import { MdFullscreen } from "react-icons/md";


function Home() {
  const theme = useSelector((state) => state.theme.value);
  const [splitScreen, setSplitScreen] = useState(false)
  const [currentFile, setCurrentFile] = useState(null);
  const [fullScreen, setFullScreen]= useState(null)
  const elementRef = useRef(null);
  const timerStatus = useSelector((state) => state.pomo.timer.isPlaying);
  const timerMinutes = useSelector((state) => state.pomo.timer.minutes);
  const timerSeconds = useSelector((state) => state.pomo.timer.seconds);
  const username = useSelector((state) => state.auth.user.username);
  const [darkTheme, setDarkTheme] = useState(theme);
  const dispatch = useDispatch();
  const [start, setStart] = useState({ min: 25, sec: 0 });
  const startRef = useRef({ min: 25, sec: 0 });
  const [now, setNow] = useState(null);
  const ref = useRef(null);
  const date = new Date();
  const [play, { stop }] = useSound(clockSound, { volume: 0.4 });
  const [timeUp, { stop: timeUpStop }] = useSound(timeup);
  const [sessions, setSessions] = useState(0);
  const [musicEnable, setMusicEnable] = useState(false);
  const [playing, setIsPlaying] = useState(false);
  const [music, setMusic] = useState(clockSound);
  const [playMusic, { stop: stopMusic }] = useSound(music, {
    onend: () => setIsPlaying(false),
  });
  const bookMarkedFiles = useSelector((state) => state.bookmark.values);
  const nodeRef = useRef(null);

  const [showSideBar, setShowSideBar] = useState(false);
  const [ambienceVisibility, setAmbienceVisibility] = useState(true);
  const [showNote, setShowNote] = useState(true);
  const [showquote, setShowQuote] = useState(false);
  const [profilePopout, setProfilePopout] = useState(false);
  const [todoStatus, setTodoStatus] = useState({ total: 0, completed: 0 });
  const navigate = useNavigate();
  const [quotes, setQuotes] = useState([
    "One glass of water , one glass of beer, Happy new year !",
    "East or west, doing nothing is the best",
    "One day at a time, bed rot without without mind",
    "The vastness of this universe and you are worried about a pity result of a tiny work. See big",
    "Think out of Box",
  ]);
  const [currentQuote, setCurrentQuote] = useState(
    "East or west, doing nothing is the best"
  );
  const [showNotes, setShowNotes] = useState(false);
  const [currentNote, setCurrentNote] = useState([
    {
      uri : import.meta.env.VITE_CLOUDINARY_URL
    }
  ]);

  const [customThemeStatus, setCustomThemeStatus] = useState(false);
  const [customTheme, setCustomTheme] = useState("black");
  const customThemes = [
    { name: "Black", color: "black" },
    { name: "Red", color: "red-700" },
    { name: "Blue", color: "blue-700" },
    { name: "Orange", color: "orange-400" },
    { name: "Gray", color: "gray-700" },
  ];

  const sidebarOptions = [
    { name: "DashBoard", path: "/dashboard" },
    { name: "Chat", path: "/chat" },
    { name: "Notes", path: "/notes" },
    { name: "Entertainment", path: "/games" },
    { name: "Leaderboard", path: "/leaderboard" },
    { name: "Helping Zone", path: "/help" },
    {
      name: "Quiz zone",
      path: "https://quiz-asan1k4zl-anikets-projects-a1e9c41f.vercel.app/",
    },
  ];

  const profileOptions = [
    { name: "Profile", path: "/dashboard" },
    { name: "Settings", path: "/Setting" },
    { name: "Theme", path: "/" },
    { name: "LogOut", path: "/Logout" },
  ];

  const song = (e) => {
    setIsPlaying(false);
    console.log(e.currentTarget.value);
    if (e.currentTarget.value == "harekrishna") {
      stopMusic();
      setMusic(harekrishna);
    } else if (e.currentTarget.value == "rock") {
      stopMusic();
      setMusic(rock);
    }
    if (e.currentTarget.value == "pop") {
      stopMusic();
      setMusic(pop);
    } else if (e.currentTarget.value == "flute") {
      stopMusic();
      setMusic(flute);
    } else if (e.currentTarget.value == "clock") {
      stopMusic();
      setMusic(clockSound);
    }
    else if (e.currentTarget.value == "calm") {
      stopMusic();
      setMusic(calm);
    }
    else if (e.currentTarget.value == "white-noise") {
      stopMusic();
      setMusic(whitenoise);
    }
    else if (e.currentTarget.value == "meditation") {
      stopMusic();
      setMusic(meditation);
    }
    else if (e.currentTarget.value == "rain-noise") {
      stopMusic();
      setMusic(rainsound);
    }
  };

  const logout = () => {
    axios
      .get("api/auth/logout")
      .then((res) => {
        console.log("logout vayo", res);
        dispatch(removeUser());
        navigate("/");
      })
      .catch((err) => console.log(err));
  };

  const openProfile = () => {
    setProfilePopout((prev) => !prev);
  };

  const handleFullScreen = ()=>{
    const element = elementRef.current;
    if (element) {
      // Use the standard API and vendor prefixes for broader compatibility
      if (element.requestFullscreen) {
        element.requestFullscreen();
        dispatch(changeScreenChoice(true))
      } else if (element.mozRequestFullScreen) { // Firefox
        element.mozRequestFullScreen();
        dispatch(changeScreenChoice(true))
      } else if (element.webkitRequestFullscreen) { // Chrome, Safari, Opera
        element.webkitRequestFullscreen();
        dispatch(changeScreenChoice(true))
      } else if (element.msRequestFullscreen) { // IE/Edge
        element.msRequestFullscreen();
        dispatch(changeScreenChoice(true))
      }
    }
    
  }

  const themeSetting = () => {
    dispatch(changeTheme(!darkTheme));
    setDarkTheme((prev) => !prev);
  };

  async function handleStart() {

    
    dispatch(changeTimerStatus(true));
    timeUpStop();

    clearInterval(ref.current);
    ref.current = setInterval(() => {
      setStart((prev) => {
        if (prev.sec === 0 && prev.min > 0) {
          // dispatch(changeTimerValue({minutes: prev.min-1, seconds : 59}))
          return { min: prev.min - 1, sec: 59 };
        }
        if (prev.sec === 0 && prev.min === 0) {
          // dispatch(changeTimerValue({minutes : 25, seconds : 0}))
          timeUp();
          
          handleStop();
          setTimeout(() => {
            timeUpStop();
          }, 5000);
          {
      username && axios.post('/api/pomo/complete',{totalSession : sessions+1})
          .then(res=> console.log('response from bck',res.data))
          .catch(err=> console.log(err, 'err at axios pomo post'))
    }
          setSessions((prev) => prev + 1);
          return { min: 25, sec: 0 };
        } else {
          dispatch(
            changeTimerValue({ minutes: prev.min, seconds: prev.sec - 1 })
          );
          return { ...prev, sec: prev.sec - 1 };
        }
      });

    //  {
    //     username &&  axios.get('/api/pomo/start',sessions)
    //   .then(res=> console.log(res.data))
    //   .catch(err=> console.log(err,"error encountered"));
    //  }

      // play()
    }, 1000);
  }

  function handleStop() {
    // stop()
    dispatch(changeTimerStatus(false));
    clearInterval(ref.current);
  }

  const handleRestart = ()=>{

     dispatch(changeTimerStatus(true));
     timeUpStop();

     clearInterval(ref.current);
    setStart({min : 25 , sec : 0})

  }

  function giveQuotes(quotes) {
    const quote = setInterval(() => {
      const index = Math.floor(Math.random() * quotes.length);
      console.log(quotes[index]);
      setCurrentQuote(quotes[index]);
    }, 10000);
  }

  useEffect(() => {

    axios
      .get("https://studyhive-sse4.onrender.com/api/auth/me")
      .then((res) => {
        console.log("Auth state", res.data);
        if (!username) {
          dispatch(addUser({ username: res.data.username }));
        }
      })
      .catch((err) => console.log("err in authenticated me", err));

    axios.post('https://studyhive-sse4.onrender.com/api/user/session',sessions)
  }, []);


{/* Split screen logic   */}


  return splitScreen ? (
    <SplitPane direction="horizontal">
      <Pane
        className=" flex justify-center items-center  mt-10"
        minSize={"50%"}
      >
        <button
          className="bg-red-500 absolute right-0 top-1/2 "
          onClick={() => {
            setSplitScreen(false);
          }}
        >
          Exit split
        </button>
        <div className="flex  flex-col justify-center font-mono lg:w-8/12 md:w-7/12  sm:w-full w-full">
          <div className="flex flex-col justify-center items-center  ">
            <div
              className={`${
                customThemeStatus
                  ? `bg-transparent border-gray-50`
                  : theme
                    ? "bg-black text-white"
                    : "bg-white text-black"
              }  w-full py-10 px-12 rounded-2xl border-1 border-gray-800 flex flex-col justify-center items-center`}
            >
              <p className="text-gray-500 text-xl my-2 ">Session Study</p>
              <div className="my-4">
                <p className="lg:text-9xl md:text-6xl sm:text-4xl text-7xl text-center font-bold">
                  {start.min}:{start.sec}
                </p>
                <button
                  className=" hover:text-gray-700 hover:cursor-pointer p-3 m-5"
                  onClick={handleStart}
                >
                  {" "}
                  Start
                </button>
                <button
                  className="rounded-md hover:bg-white hover:text-gray-600 border-1 border-blue-200 p-3 m-5"
                  onClick={handleStop}
                >
                  Stop
                </button>
                <button
                  className="rounded-md hover:bg-white hover:text-gray-600 border-1 border-blue-200 p-3 m-5"
                  onClick={handleRestart}
                >
                  Restart
                </button>
              </div>
              <TodoStatus
                themeStatus={theme}
                customThemeStatus={customThemeStatus}
                customTheme={customTheme}
              />
            </div>
          </div>

          <div className=" p-4">
            <Todo
              themeStatus={theme}
              customThemeStatus={customThemeStatus}
              customTheme={customTheme}
            />
          </div>
        </div>
      </Pane>
      <Pane defaultSize={"25%"} minSize={"18%"}>
        {" "}
        {/* Iframe Section */}
        <div className="w-full h-screen bg-white">
          <iframe
            className="h-full w-full"
            src={currentFile}
            title="Document Viewer"
          ></iframe>
        </div>
      </Pane>
    </SplitPane>
  ) : (
    <div
      ref={elementRef}
      className={`
        min-h-screen
        w-full
        
        ${
          customThemeStatus
            ? `bg-${customTheme}   `
            : theme
              ? "bg-black text-white"
              : "bg-white text-black"
        }`}
    >
      <Draggable nodeRef={nodeRef}>
        <div
          ref={nodeRef}
          className={` fixed bottom-5 right-5  p-4 rounded-full border-2 border-gray-500  cursor-move  flex justify-center items-center  ${theme ? "-800 text-white" : "bg-white text-black"} `}
        >
          <p className=" text-center ">Drag me </p>
        </div>
      </Draggable>

      <div className=" flex justify-between items-center border-b-1 \ border-gray-500 w-full xl:h-[100px] lg:h-[80px] md:h-[75px] h-[60px]">
        <div>
          <div className=" flex justify-around lg:w-[200px] md:w-[150px] w-[135px] xl:text-3xl lg:text-3xl md:text-2xl sm:text-xl text-md font-bold text-blue-500    ">
            <div
              className={`${
                theme ? "text-white" : "text-black"
              } w-10 pl-2 text-white text-center`}
              onClick={() => {
                setShowSideBar((prev) => !prev);
              }}
            >
              <MdTableRows
                className={`${darkTheme ? "text-white" : "text-gray-700"}`}
                size={25}
              />
            </div>
            <div>
              <NavLink to="/">StudyHive</NavLink>
            </div>
          </div>
        </div>
        <div className=" font-semibold text-sm lg:text-lg lg:w-2/6 md:w-3/6 w-4/6 flex justify-around items-center  ">
          <div className="flex items-center gap-2 sm:gap-4 ">
            {/* Music Selection & Play Toggle Capsule */}
            <div
              className={`flex items-center gap-2 p-1.5 rounded-xl border transition-all ${
                theme
                  ? "bg-white/5 border-white/10"
                  : "bg-slate-100 border-slate-200 shadow-sm"
              }`}
            >
              {/* Select Dropdown */}
              <div className="relative">
                <select
                  className={`appearance-none bg-transparent pl-3 pr-8 py-1.5 text-xs sm:text-sm font-bold outline-none cursor-pointer rounded-lg transition-colors ${
                    theme
                      ? "text-slate-300 hover:text-white"
                      : "text-slate-600 hover:text-black"
                  }`}
                  name="Music"
                  onChange={song} // Changed from onClick to onChange for better accessibility
                >
                  <option value="clock">Clock</option>
                  <option value="white-noise">White Noise</option>
                  <option value="meditation">Meditation</option>
                  <option value="rain-noise">Raining</option>
                  <option value="calm">Calm</option>
                  <option value="pop">Pop Song</option>
                  <option value="harekrishna">Hare Krishna</option>
                  <option value="flute">Flute music</option>
                  <option value="rock">Rock music</option>
                </select>

                {/* Custom Chevron for the select */}
                <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none opacity-50">
                  <svg
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 1L5 5L9 1"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>

              {/* Vertical Divider */}
              <div
                className={`h-4 w-[1px] ${theme ? "bg-white/10" : "bg-slate-300"}`}
              />

              {/* Play/Pause Button */}
              <button
                onClick={() => {
                  setIsPlaying((prev) => !prev);
                  playing ? stopMusic() : playMusic();
                }}
                className={`group flex items-center justify-center size-8 rounded-lg transition-all ${
                  playing
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/20"
                    : theme
                      ? "hover:bg-white/10 text-slate-400"
                      : "hover:bg-slate-200 text-slate-600"
                }`}
              >
                {playing ? (
                  <CiPause1
                    size={18}
                    className="transition-transform group-active:scale-90"
                  />
                ) : (
                  <CiPlay1
                    size={18}
                    className="ml-0.5 transition-transform group-active:scale-90"
                  />
                )}
              </button>
            </div>
          </div>

          {/* <div onClick={themeSetting}>Theme</div> */}
          <div onClick={handleFullScreen}>
            <MdFullscreen size={35} />
          </div>

          {username ? (
            <div className="relative">
              {/* The Trigger Button */}
              <div
                onClick={openProfile}
                className={`flex items-center gap-3 px-4 py-2 rounded-xl cursor-pointer transition-all duration-300 ${
                  theme
                    ? "bg-white/5 hover:bg-white/10 border border-white/10"
                    : "bg-slate-100 hover:bg-slate-200 border border-slate-200"
                }`}
              >
                <div className="size-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-black text-xs">
                  {username.substring(0, 2).toUpperCase()}
                </div>
                <span className="font-bold text-sm hidden sm:block">
                  {username}
                </span>
              </div>

              {/* The Dropdown Menu */}
              <div
                className={`absolute right-0 mt-4 w-64 rounded-2xl shadow-2xl border transition-all duration-300 transform origin-top-right z-[100] ${
                  profilePopout
                    ? "opacity-100 scale-100 translate-y-0"
                    : "opacity-0 scale-95 -translate-y-2 pointer-events-none"
                } ${
                  theme
                    ? "bg-[#15171c] border-white/10 text-slate-300"
                    : "bg-white border-slate-200 text-slate-700"
                }`}
              >
                {/* Top Section: User Info */}
                <div className="p-4 border-b border-white/5">
                  <p className="text-[10px] font-black uppercase tracking-widest opacity-40 mb-1">
                    Signed in as
                  </p>
                  <p
                    className={`font-bold truncate ${theme ? "text-white" : "text-black"}`}
                  >
                    {username}
                  </p>
                </div>

                <ul className="p-2">
                  {[
                    { name: "My Dashboard", path: "/dashboard" },
                    { name: "Account Settings", path: "/settings" },
                  ].map((item) => (
                    <li key={item.name}>
                      <Link
                        to={item.path}
                        className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-bold transition-colors ${
                          theme
                            ? "hover:bg-white/5 hover:text-white"
                            : "hover:bg-slate-100 hover:text-black"
                        }`}
                      >
                        <span className="text-lg">{item.icon}</span>
                        {item.name}
                      </Link>
                    </li>
                  ))}

                  {/* Theme Toggle inside Menu */}
                  <li
                    onClick={themeSetting}
                    className={`flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-bold cursor-pointer transition-colors ${
                      theme
                        ? "hover:bg-white/5 hover:text-white"
                        : "hover:bg-slate-100 hover:text-black"
                    }`}
                  >
                    <span className="text-lg">{theme ? "☀️" : "🌙"}</span>
                    {theme ? "Light Mode" : "Dark Mode"}
                  </li>

                  <div className="h-[1px] bg-white/5 my-2 mx-2" />

                  {/* Logout */}
                  <li
                    onClick={logout}
                    className="flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-bold text-red-500 hover:bg-red-500/10 transition-colors cursor-pointer"
                  >
                    <span className="text-lg"></span>
                    Logout
                  </li>
                </ul>
              </div>
            </div>
          ) : (
            <button
              onClick={() => navigate("/auth/login")}
              className="bg-blue-600 hover:bg-blue-500 text-white px-6 py-2 rounded-xl font-bold shadow-lg shadow-blue-600/20 transition-all active:scale-95"
            >
              Log in
            </button>
          )}
        </div>
      </div>

      <div
        className={` lg:flex md:flex  ${
          showSideBar ? "justify-between" : "justify-around"
        }  w-full min-h-screen md:h-[80vh]  `}
      >
        {showSideBar && (
          <div className="border-r-1 border-gray-500 h-full lg:w-1/6 md:w-[200px] sm:w-3/6 w-4/6  ">
            {sidebarOptions.map((option) => (
              <div
                key={option.name}
                className=" h-14 flex items-center justify-start px-4 font-bold text-lg rounded-md my-3 text-center hover:text-gray-400"
              >
                <Link to={option.path}>{option.name} </Link>
              </div>
            ))}
            
          </div>
        )}

        <div className="flex  flex-col justify-around font-mono lg:w-7/12 md:w-7/12  sm:w-full w-full ">
          <div className="flex flex-col items-center  ">
            <div
              className={`${
                customThemeStatus
                  ? `bg-transparent border-gray-50`
                  : theme
                    ? "bg-black text-white"
                    : "bg-white text-black"
              }  w-full py-10 px-12 rounded-2xl border-1 border-gray-800 flex flex-col justify-center items-center`}
            >
              <p className="text-gray-500 text-xl my-2 ">Session Study</p>
              <div className="my-4">
                <p className="lg:text-9xl md:text-6xl sm:text-4xl text-7xl text-center font-bold">
                  {start.min}:{start.sec}
                </p>
                <button
                  className=" hover:text-gray-700 hover:cursor-pointer p-3 m-5"
                  onClick={handleStart}
                >
                  {" "}
                  Start
                </button>
                <button
                  className="rounded-md hover:bg-white hover:text-gray-600 border-1 border-blue-200 p-3 m-5"
                  onClick={handleStop}
                >
                  Stop
                </button>
                <button
                  className="rounded-md hover:bg-white hover:text-gray-600 border-1 border-blue-200 p-3 m-5"
                  onClick={handleRestart}
                >
                  Restart
                </button>
              </div>
              <TodoStatus
                themeStatus={theme}
                customThemeStatus={customThemeStatus}
                customTheme={customTheme}
              />
            </div>
          </div>

          <div className=" p-4">
            <Todo
              themeStatus={theme}
              customThemeStatus={customThemeStatus}
              customTheme={customTheme}
            />
          </div>
        </div>

        <div
          className={`lg:w-3/12 md:w-5/12 w-full p-4 flex flex-col ${
            ambienceVisibility && showNote ? "justify-around " : "justify-start"
          } gap-5`}
        >
          {ambienceVisibility ? (
            <div className="h-[25vh] border-1 border-gray-800 p-4 rounded-md flex flex-col gap-3  ">
              <div className="flex justify-between">
                <p className="text-center">Ambience setting </p>
                <span
                  className="hover:underline"
                  onClick={() => {
                    setAmbienceVisibility((prev) => !prev);
                  }}
                >
                  Hide
                </span>
              </div>
              <ul className="flex flex-col gap-2">
                <li className=" flex">
                  <p className="w-40" htmlFor="background">
                    Background
                  </p>
                  {/* <button onClick={()=>{setCustomThemeStatus(prev=> !prev)}}  className='bg-white text-black py-2 px-4'>{customThemeStatus? "disable Custom theme": "enable custom theme"}</button> */}

                  <select
                    onChange={themeSetting}
                    className="border-1 border-gray-800 mx-2 p-2 rounded-md w-3/5"
                    name="background"
                    id=""
                  >
                    <option value="dark">Dark</option>
                    <option value="light">Light</option>
                  </select>
                </li>

                <li className=" flex ">
                  <p className="w-40" htmlFor="background">
                    Custom Theme
                  </p>
                  <select
                    className="border-1 border-gray-800 mx-2 p-2 rounded-md w-3/5"
                    name="quote"
                    id="quote"
                    defaultValue="disable"
                    onChange={(e) => {
                      if (e.currentTarget.value) {
                        setCustomThemeStatus((prev) => !prev);
                      }
                    }}
                  >
                    <option key="disable" value="false">
                      disable
                    </option>
                    <option key="enable" value="true">
                      enable
                    </option>
                  </select>
                  {customThemeStatus && (
                    <select
                      onChange={(e) => {
                        setCustomTheme(e.currentTarget.value);
                      }}
                    >
                      {customThemes.map((opt) => (
                        <option value={opt.color}>{opt.name}</option>
                      ))}
                    </select>
                  )}
                </li>

                <li className=" flex">
                  <p className="w-40" htmlFor="background">
                    Quote
                  </p>
                  <select
                    className="border-1 border-gray-800 mx-2 p-2 rounded-md w-3/5"
                    name="quote"
                    id="quote"
                    onChange={(e) => {
                      if (e.currentTarget.value) {
                        showquote(true);
                        giveQuotes(quotes);
                      }
                    }}
                  >
                    <option id="quote" value="disable">
                      disable
                    </option>
                    <option id="quote" value="enable">
                      enable
                    </option>
                  </select>
                </li>
              </ul>
            </div>
          ) : (
            <div
              className="absolute top-40 right-0 rounded-l-full text-center h-15 w-15 flex justify-center items-center bg-blue-700 border-l-1"
              onClick={() => {
                setAmbienceVisibility((prev) => !prev);
              }}
            >
              Bg
            </div>
          )}
          {showquote && <p className="">{currentQuote}</p>}

          {showNote ? (
            <div className="h-[40vh] text-center rounded-md border-1 border-gray-800 flex flex-col gap-5 ">
              <div className="flex justify-between p-4">
                <p>Notes</p>
                <p
                  className="hover:underline"
                  onClick={() => {
                    setShowNote((prev) => !prev);
                  }}
                >
                  Hide
                </p>
              </div>

              <div>
                {/* This is sudo code for file preview */}
                {showNotes && (
                  <div onClick={() => setShowNotes((prev) => !prev)}>
                    <DocViewer
                      className=" right-0 absolute top-25"
                      pluginRenderers={DocViewerRenderers}
                      documents={currentNote}
                      style={{
                        height: "80vh",
                        width: "40vw",
                      }}
                    />
                  </div>
                )}
                {bookMarkedFiles
                  ? bookMarkedFiles.map((file) => (
                      <div
                        key={file.title}
                        onClick={() => {
                          console.log("view file", file.url);
                          // setCurrentNote([{ uri: file.url }]);
                          // setShowNotes(true);
                          setCurrentFile(file.url);
                          setSplitScreen(true);
                        }}
                        className="my-2 "
                      >
                        <p className="text-blue-500 hover:underline">
                          {file.title}
                        </p>
                      </div>
                    ))
                  : "Notes will appear here !"}
              </div>
            </div>
          ) : (
            <div
              className="rounded-l-full h-15 w-15 bg-blue-700 flex justify-center items-center top-60 right-0 absolute"
              onClick={() => {
                setShowNote((prev) => !prev);
              }}
            >
              Note
            </div>
          )}
          <Progressbar
            sessions={sessions}
            themeStatus={theme}
            customTheme={customTheme}
            customThemeStatus={customThemeStatus}
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
