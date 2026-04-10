import React from 'react'
import deskImg from '../../../assets/desk.jpg'
import {useSelector, useDispatch} from 'react-redux'
import { addUser } from '../../../store/authSlice'
import { changeTheme } from '../../../store/themeSlice'
import Input from '../Input/Input'
import {Link, useNavigate} from 'react-router'
import Button from '../Button/Button'
import axios from 'axios'
import { useEffect, useRef, useState } from 'react'
import {useForm} from 'react-hook-form'

function SignUp() {
  const theme = useSelector(state=> state.theme.value)
  const authStatus = useSelector(state => state.auth.user.authStatus)
  console.log('auth',authStatus)
  const dispatch = useDispatch()
  const {
    register,
    handleSubmit,
    watch,
    formState:{errors}
  } = useForm()
  const navigate = useNavigate()

  const onSubmit = async(data)=>{
   console.log(data)
   axios.post('https://studyhive-sse4.onrender.com/api/auth/signup',{username : data.username, email: data.email, password: data.password})
   .then(res=> {
    console.log(res.data)
    if(res.data.valid)
    {
      console.log('Success Registration')
      navigate('/home')
    }
  })
   .catch(err=> console.log(err))
  }

  const [passwordType, setPasswordType]= useState('password')
  const showPassword = ()=>{
    if(passwordType=='password')
    {
      console.log("text")
      setPasswordType('text')
    }
    else{
      setPasswordType('password')
    }
  }

  useEffect(()=>{

    axios.get('https://studyhive-sse4.onrender.com/api/auth/me')
    .then(res=> {
      console.log('Auth state', res.data)
      if(!authStatus)
      {
        dispatch(addUser({username: res.data.username}))
      }
    })
    .catch(err=> console.log('err in authenticated me', err))

    if(authStatus)
    {
      navigate('/home')
    }
    axios.get('https://studyhive-sse4.onrender.com/api/auth/signup')
    .then(res=> console.log(res.data))
    .catch(err=> console.log(err))
  },[navigate, onSubmit])
  return (
    // <div className={`${theme ? "bg-black ": "bg-white text-black"} h-[100vh] w-full flex justify-between`}>
    //   <div className=' w-full px-5 my-5 '>
    //     <h1 className=' absolute text-blue-600  font-bold text-3xl'><Link to='/'>StudyHive</Link></h1>
    //     <img src={deskImg} className='h-full w-full   border-1 border-gray-800 rounded-md' alt="Desktop image" />
    //   </div>

    //   <div className='w-full h-full flex flex-col gap-[100px] px-24  '>

    //     <div className='flex  justify-between items-center'>
    //       <div>
    //       <h1 className='text-4xl py-3'>Create an account</h1>
    //       <p className='text-gray-600 text-lg'>Already have an account? <span className='hover:text-red-700 hover:underline'><Link to='/auth/login'>Login</Link></span></p>
    //       </div>
    //       <div className={`text-lg ${theme? "hover:bg-gray-800": "hover:bg-gray-200"} p-3 rounded-md`}
    //         onClick={()=>{dispatch(changeTheme(!theme))}}>
    //         Theme
    //       </div>
    //     </div>
    //   <form onSubmit={handleSubmit(onSubmit)}>
    //     <div className='flex flex-col gap-7'>
    //       {/* <div className='flex justify-between gap-3'>
    //       <Input {...register("first_name")}  placeholder="First Name" type={'text'} />
    //       <Input {...register("last_name")} placeholder="Last Name" type={'text'}/> 

    //     </div> */}

    //     <div>
    //       <Input  {...register("username")} placeholder="username"  type= "text" />
    //     </div>

    //     <div>
    //       <Input {...register("email")} placeholder="email"  type="email"/>
    //     </div>

    //     <div>
    //       <Input {...register("password")} placeholder="password"  type={passwordType}/>
    //     </div>
    //     <div>
    //       <input onClick={showPassword} className='px-2' type="checkbox" name="pwd" id="pwd" />
    //       <label className='px-2' htmlFor="pwd">Show Password</label>
    //     </div>  
        
    //     <div>
    //       <Button  text={'Create an account'} />
    //     </div>
    //     </div>
    //   </form>

    //     <div className='w-full'>
    //      <h1 className='text-2xl text-gray-400 text-center'> Register with other platforms</h1>
    //      <div className='flex justify-center gap-4 pt-5'>
    //         <div>Google</div>
    //         <div>Github?</div>
    //      </div>
    //     </div>
    //   </div>
    // </div>
    <div className={`h-screen w-full flex overflow-hidden transition-colors duration-500 ${theme ? "bg-[#0a0a0a] text-white" : "bg-white text-slate-900"}`}>
  
  {/* Left Panel: Fixed to screen height */}
  <div className="hidden lg:flex w-1/2 h-full p-6">
    <div className="relative w-full h-full rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/5">
      {/* Branding Overlay */}
      <div className="absolute inset-12 z-20 flex flex-col justify-between pointer-events-none">
        <Link to="/" className="text-3xl font-black tracking-tighter text-white">
          Study<span className="text-blue-500">Hive</span>
        </Link>
        <div className="max-w-md">
          <h2 className="text-4xl font-bold text-white leading-tight mb-4">
            Build your <br /> 
            <span className="text-blue-500">focus habit.</span>
          </h2>
        </div>
      </div>

      {/* The Image: Constrained to its parent */}
      <img
        src={deskImg}
        className="h-full w-full object-cover transition-transform duration-[2s] hover:scale-105"
        alt="Workspace"
      />
      
      {/* Vignette to ensure text readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
    </div>
  </div>

  {/* Right Panel: Scrollable only if content exceeds screen */}
  <div className="w-full lg:w-1/2 h-full flex flex-col overflow-y-auto custom-scrollbar">
    
    {/* Floating Utility Nav */}
    <div className="flex justify-between items-center px-8 sm:px-16 lg:px-24 pt-10 pb-6">
       <Link to="/" className="lg:hidden text-2xl font-black tracking-tighter">Study<span className="text-blue-500">Hive</span></Link>
       <button
        onClick={() => dispatch(changeTheme(!theme))}
        className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
          theme ? "bg-white/5 border border-white/10" : "bg-slate-50 border border-slate-200"
        }`}
      >
        {theme ? 'Light' : 'Dark'}
      </button>
    </div>

    {/* Center Form Container */}
    <div className="max-w-md w-full mx-auto flex-1 flex flex-col justify-center px-6 pb-12">
      <div className="mb-8">
        <h1 className="text-4xl font-black tracking-tight mb-2">Create account</h1>
        <p className="text-slate-500 text-sm font-medium">
          Already a member?{" "}
          <Link to="/auth/login" className="text-blue-500 font-bold hover:underline underline-offset-4">
            Log in
          </Link>
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-4">
          <div className="group">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1 block group-focus-within:text-blue-500">Identity</label>
            <Input  
              {...register("username")} 
              placeholder="Username"  
              type="text" 
              className={`w-full !bg-transparent !border-x-0 !border-t-0 !rounded-none !px-0 !py-2 !border-b-2 transition-all outline-none ${
                theme ? "border-white/10 focus:border-blue-500" : "border-slate-200 focus:border-blue-500"
              }`}
            />
          </div>

          <div className="group">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1 block group-focus-within:text-blue-500">Email Address</label>
            <Input 
              {...register("email")} 
              placeholder="you@example.com"  
              type="email"
              className={`w-full !bg-transparent !border-x-0 !border-t-0 !rounded-none !px-0 !py-2 !border-b-2 transition-all outline-none ${
                theme ? "border-white/10 focus:border-blue-500" : "border-slate-200 focus:border-blue-500"
              }`}
            />
          </div>

          <div className="group">
            <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1 block group-focus-within:text-blue-500">Password</label>
            <Input 
              {...register("password")} 
              placeholder="••••••••"  
              type={passwordType}
              className={`w-full !bg-transparent !border-x-0 !border-t-0 !rounded-none !px-0 !py-2 !border-b-2 transition-all outline-none ${
                theme ? "border-white/10 focus:border-blue-500" : "border-slate-200 focus:border-blue-500"
              }`}
            />
          </div>

          <div className="flex items-center gap-2 py-1">
            <input 
              onClick={showPassword} 
              type="checkbox" 
              id="pwd" 
              className="size-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
            />
            <label className="text-xs font-bold text-slate-500 cursor-pointer" htmlFor="pwd">Show Password</label>
          </div>
        </div>

        <div className="pt-4">
          <Button 
            text="Create Account" 
            className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black text-lg transition-all active:scale-[0.98] shadow-lg shadow-blue-600/20" 
          />
        </div>
      </form>

      {/* Social Footer */}
      <div className="mt-8 text-center">
        <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-4">Or sign up with</p>
        <div className="flex justify-center gap-4">
          <button className={`p-3 rounded-xl border transition-all hover:bg-blue-500/10 ${theme ? "border-white/10" : "border-slate-200"}`}>
             <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="size-5" alt="Google" />
          </button>
          <button className={`p-3 rounded-xl border transition-all hover:bg-blue-500/10 ${theme ? "border-white/10" : "border-slate-200"}`}>
             <img src="https://www.svgrepo.com/show/512317/github-142.svg" className={`size-5 ${theme ? 'invert' : ''}`} alt="Github" />
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
  )
}

export default SignUp