import React, { use, useRef, useState } from 'react'
import {AiOutlineMenu, AiOutlineClose} from 'react-icons/ai'
import {Home} from '../index'
import { NavLink } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import { changeTheme } from '../../store/themeSlice';
import { Link } from 'react-router';

function Header() {
  const theme = useSelector(state=> state.theme.value)
  const dispatch = useDispatch()
  const [darkTheme, setDarkTheme] = useState(theme)
  const [nav, setNav] = useState(false);
  const username = useSelector(state=> state.auth.user.username)

  const handleNav = ()=>{
    setNav(!nav);
  }

  return (
    <div
      className={`${theme ? "bg-black text-white" : "bg-white text-black"}  flex justify-between items-center h-24 w-full mx-auto px-4 border-b border-gray-700  `}
    >
      <div className="w-full text-3xl ml-8 font-bold text-blue-500">
        <NavLink to="/">StudyHive</NavLink>
      </div>

      <ul className="hidden md:flex">
        <li className="p-4 w-32">
          <NavLink to="/home">Home</NavLink>
        </li>
        <li className="p-4 w-32">
          <NavLink to={'/about'}>About</NavLink>
        </li>
        {/* <li className='p-4 w-32'> Contact</li> */}
        <li
          className="p-4 w-32 cursor-pointer"
          onClick={() => {
            dispatch(changeTheme(!darkTheme));
            setDarkTheme((prev) => !prev);
          }}
        >
          Theme
        </li>
        <li className="p-4 w-32">
          {username ? (
            <p>{username}</p>
          ) : (
            <p>
              <Link to="/auth/login">Login</Link>
            </p>
          )}
        </li>
      </ul>

      <div onClick={handleNav} className="block md:hidden">
        {!nav ? <AiOutlineMenu size={22} /> : <AiOutlineClose size={22} />}
      </div>

      <div
        className={
          !nav
            ? "fixed left-[-100%] "
            : "fixed p-4 top-0 left-0 w-[60%] h-full border-r border-r-gray-600  bg-black ease-in-out duration-500 md:hidden "
        }
      >
        <div className="w-full text-3xl font-bold">
          <NavLink to="/">StudyHive</NavLink>
        </div>
        <ul className="p-4">
          <li className="p-4 border-b border-b-gray-300  ">Home</li>
          <li className="p-4  border-b border-b-gray-300 ">About</li>
          <li className="p-4  border-b border-b-gray-300 "> Contact</li>
          <li className="p-4  ">Setting</li>
        </ul>
      </div>
    </div>
  );
}

export default Header