import React, { useEffect, useRef, useState } from "react";
import deskImg from "../../../assets/desk.jpg";
import comp from "../../../assets/computer.jpg";
import { useSelector, useDispatch } from "react-redux";
import { changeTheme } from "../../../store/themeSlice";
import Input from "../Input/Input";
import { Link, useNavigate } from "react-router";
import Button from "../Button/Button";
import axios from "axios";
import { useForm } from "react-hook-form";
import { addUser } from "../../../store/authSlice";

function Login() {
  const theme = useSelector((state) => state.theme.value);
  const authStatus = useSelector((state) => state.auth.user.authStatus);
  console.log("auth status", authStatus);
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [passwordType, setPasswordType] = useState("password");
  const showPassword = () => {
    if (passwordType == "password") {
      console.log("text");
      setPasswordType("text");
    } else {
      setPasswordType("password");
    }
  };

  const login = (data) => {
    console.log(data);
    axios
      .post("/api/auth/login", {
        username: data.username,
        password: data.password,
      })
      .then((res) => {
        console.log(res.data);
        if (res.data.valid) {
          dispatch(addUser({ username: res.data.username, totalSessions : res.data.totalSessions }));
          console.log("log in success", res.data.username , res.data.totalSessions);
          navigate("/home");
        }
      });
  };

  useEffect(() => {

    axios
      .get("/api/auth/me")
      .then((res) => {
        console.log("Auth state", res.data);
        if (!authStatus) {
          dispatch(addUser({ username: res.data.username }));
        }
      })
      .catch((err) => console.log("err in authenticated me", err));

    if (authStatus) {
      navigate("/home");
    }

    axios
      .get("/api/auth/login")
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));

    axios.get('/api/google/callback')
    .then(res => console.log(res.data))
    .catch(err=> console.log(err))

  }, [navigate, login]);
  return (

    <div className={`min-h-screen w-full flex overflow-hidden transition-colors duration-500 ${theme ? "bg-[#0a0a0a] text-white" : "bg-white text-slate-900"}`}>
  
  {/* Left Panel: Visual/Brand Section */}
  <div className="hidden lg:flex w-1/2 relative p-8">
    <div className="absolute inset-12 z-20 flex flex-col justify-between pointer-events-none">
      <Link to="/home" className="hover:cursor-pointer text-3xl font-black tracking-tighter text-white">
        Study<span className="text-blue-500">Hive</span>
      </Link>
      <div className="max-w-md">
        <h2 className="text-5xl font-bold text-white leading-tight mb-4">Master your craft with deep focus.</h2>
        <p className="text-white/60 text-lg">Join other students optimizing their productivity daily.</p>
      </div>
    </div>
    
    {/* Image Container with Overlay */}
    <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl border border-white/10">
      <img
        src={comp}
        className="h-full w-full object-cover transition-transform duration-1000 hover:scale-105"
        alt="Desktop workspace"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
    </div>
  </div>

  {/* Right Panel: Login Form */}
  <div className="w-full lg:w-1/2 flex flex-col px-6 sm:px-12 lg:px-24 py-12">
    
    {/* Header Actions */}
    <div className="flex justify-end mb-16">
      <button
        onClick={() => dispatch(changeTheme(!theme))}
        className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all ${
          theme ? "bg-white/5 hover:bg-white/10 border border-white/10" : "bg-slate-100 hover:bg-slate-200 border border-slate-200"
        }`}
      >
        {theme ? '☀️ Light Mode' : '🌙 Dark Mode'}
      </button>
    </div>

    {/* Form Container */}
    <div className="max-w-md w-full mx-auto flex-1 flex flex-col justify-center">
      <div className="mb-10 text-center lg:text-left">
        <h1 className="text-4xl font-black tracking-tight mb-3">Welcome Back</h1>
        <p className="text-slate-500 font-medium">
          New here?{" "}
          <Link to="/auth/signup" className="text-blue-500 hover:text-blue-600 transition-colors font-bold underline underline-offset-4">
            Create an account
          </Link>
        </p>
      </div>

      <form onSubmit={handleSubmit(login)} className="space-y-6">
        <div className="space-y-4">
          <div className="group">
            <label className="text-xs font-black uppercase tracking-widest text-slate-500 mb-2 block transition-colors group-focus-within:text-blue-500">
              Username
            </label>
            <Input
              {...register("username")}
              placeholder="Enter your username"
              className={`w-full !bg-transparent !border-x-0 !border-t-0 !rounded-none !px-0 !py-3 !border-b-2 transition-all outline-none ${
                theme ? "border-white/10 focus:border-blue-500" : "border-slate-200 focus:border-blue-500"
              }`}
            />
          </div>

          <div className="group">
            <label className="text-xs font-black uppercase tracking-widest text-slate-500 mb-2 block transition-colors group-focus-within:text-blue-500">
              Password
            </label>
            <Input
              {...register("password", { required: true })}
              placeholder="••••••••"
              type={passwordType}
              className={`w-full !bg-transparent !border-x-0 !border-t-0 !rounded-none !px-0 !py-3 !border-b-2 transition-all outline-none ${
                theme ? "border-white/10 focus:border-blue-500" : "border-slate-200 focus:border-blue-500"
              }`}
            />
          </div>

          <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-2 cursor-pointer group">
              <input
                onChange={showPassword}
                type="checkbox"
                id="pwd"
                className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
              />
              <label htmlFor="pwd" className="text-sm font-bold text-slate-500 cursor-pointer group-hover:text-slate-400 transition-colors">
                Show Password
              </label>
            </div>
            <Link className="text-sm font-bold text-blue-500 hover:text-blue-600">Forgot?</Link>
          </div>
        </div>

        <div className="pt-4">
          <Button 
            text="Sign In" 
            className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black text-lg shadow-xl shadow-blue-600/20 transition-all active:scale-[0.98]" 
          />
        </div>
      </form>

      {/* Social Logins */}
      <div className="mt-12">
        <div className="relative flex items-center mb-8">
          <div className="flex-grow border-t border-gray-500/20"></div>
          <span className="flex-shrink mx-4 text-xs font-black uppercase tracking-widest text-slate-500">Or continue with</span>
          <div className="flex-grow border-t border-gray-500/20"></div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Link 
            to="http://localhost:8080/api/auth/google"
            className={`flex items-center justify-center gap-3 py-3 rounded-xl border font-bold transition-all hover:shadow-md ${
              theme ? "bg-white/5 border-white/10 hover:bg-white/10" : "bg-white border-slate-200 hover:bg-slate-50"
            }`}
          >
            <img src="https://www.svgrepo.com/show/475656/google-color.svg" className="w-5 h-5" alt="Google" />
            Google
          </Link>
          <button 
            className={`flex items-center justify-center gap-3 py-3 rounded-xl border font-bold transition-all hover:shadow-md ${
              theme ? "bg-white/5 border-white/10 hover:bg-white/10" : "bg-white border-slate-200 hover:bg-slate-50"
            }`}
          >
            <img src="https://www.svgrepo.com/show/512317/github-142.svg" className={`w-5 h-5 ${theme ? 'invert' : ''}`} alt="Github" />
            Github
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
  );
}

export default Login;
