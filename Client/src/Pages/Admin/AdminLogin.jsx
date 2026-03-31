import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeTheme } from "../../store/themeSlice";
import Input from "../../components/Auth/Input/Input";
import Button from "../../components/Auth/Button/Button";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import axios from "axios";


function AdminLogin() {
  const theme = useSelector((state) => state.theme.value);
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const navigate = useNavigate();
  const [passwordType, setPasswordType] = useState("password");
  const [error,setError] = useState({status : false, msg : ''})

  const adminLogin = (data) => {
    console.log(data)
    axios.post("/api/admin/login", data)
    .then((res) => {
      if (res.data.status) navigate("/sh/admin/dashboard");
    })
    .catch(err=>{
      console.log(err)
      setError({status : true , msg : "Wrong credintials"})
      
    })
  };

  return (
    <div
      className={`min-h-screen w-full flex transition-colors duration-500 ${theme ? "bg-[#050505] text-white" : "bg-slate-50 text-slate-900"}`}
    >
      {/* Left Panel: Abstract Geometric Pattern (No Images) */}
      <div
        className={`hidden lg:flex w-5/12 relative overflow-hidden ${theme ? "bg-slate-900" : "bg-blue-900"}`}
      >
        {/* CSS-only Background Pattern */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, ${theme ? "#334155" : "#fff"} 1px, transparent 0)`,
            backgroundSize: "32px 32px",
          }}
        ></div>

        {/* Animated Gradient Glow */}
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-600 rounded-full blur-[120px] opacity-30 animate-pulse"></div>

        <div className="relative z-10 p-16 flex flex-col justify-between w-full">
          <div>
            <div className="flex items-center gap-2 mb-8">
              <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/50">
                <span className="text-white font-black text-xl">S</span>
              </div>
              <span className="text-2xl font-black tracking-tighter text-white">
                StudyHive <span className="text-blue-400">Admin</span>
              </span>
            </div>
          </div>

          <div className="space-y-6">
            <h2 className="text-5xl font-bold text-white leading-tight">
              Secure <br />
              Management console.
            </h2>
            <div className="h-1 w-20 bg-blue-500 rounded-full"></div>
            <p className="text-blue-100/60 text-lg max-w-sm">
              Access system-level configurations, user moderation, and real-time
              analytics.
            </p>
          </div>

          <div className="text-xs font-mono text-blue-300/40 tracking-widest uppercase">
            System Protocol v4.0.2 // Encrypted Node
          </div>
        </div>
      </div>

      {/* Right Panel: Login Form */}
      <div className="w-full lg:w-7/12 flex flex-col items-center justify-center p-8 sm:p-12">
        {/* Theme Toggle (Top Right) */}
        <div className="absolute top-8 right-8">
          <button
            onClick={() => dispatch(changeTheme(!theme))}
            className={`p-3 rounded-2xl transition-all border ${theme ? "bg-white/5 border-white/10 hover:bg-white/10" : "bg-white border-slate-200 shadow-sm hover:shadow-md"}`}
          >
            {theme ? "☀️" : "🌙"}
          </button>
        </div>

        <div className="max-w-md w-full">
          <header className="mb-12 text-center lg:text-left">
            <h1 className="text-4xl font-black tracking-tight mb-4">
              Internal Access
            </h1>
            <p className="text-slate-500 font-medium">
              Please enter your administrative credentials.
            </p>
          </header>

          <form onSubmit={handleSubmit(adminLogin)} className="space-y-8">
            {error.status && <span className="text-xl text-red-500">{error.msg}!!!! Re check data</span>}
            <div className="space-y-6">
              {/* Username Input */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500">
                  Admin Identifier
                </label>
                <div className="relative">
                  <Input
                    {...register("username")}
                    placeholder="e.g. admin_main"
                    className={`w-full !bg-transparent border-2 rounded-2xl px-5 py-4 transition-all outline-none font-medium ${
                      theme
                        ? "border-white/10 focus:border-blue-500 focus:bg-white/5"
                        : "border-slate-200 focus:border-blue-500 focus:bg-slate-50"
                    }`}
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-2">
                <label className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500">
                  Security Key
                </label>
                <div className="relative">
                  <Input
                    {...register("password")}
                    type={passwordType}
                    placeholder="••••••••"
                    className={`w-full !bg-transparent border-2 rounded-2xl px-5 py-4 transition-all outline-none font-medium ${
                      theme
                        ? "border-white/10 focus:border-blue-500 focus:bg-white/5"
                        : "border-slate-200 focus:border-blue-500 focus:bg-slate-50"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setPasswordType(
                        passwordType === "password" ? "text" : "password",
                      )
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 hover:text-blue-500"
                  >
                    {passwordType === "password" ? "SHOW" : "HIDE"}
                  </button>
                </div>
              </div>
            </div>

            <Button
              text="Initialize Session"
              className="w-full py-5 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl font-black text-lg shadow-xl shadow-blue-600/30 transition-all active:scale-[0.98]"
            />

            <div className="flex items-center justify-center gap-4 text-slate-500 text-xs font-bold uppercase tracking-widest">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              Server Status: Operational
            </div>
          </form>

          <div className="mt-16 pt-8 border-t border-slate-500/10 text-center">
            <Link
              to="/auth/login"
              className="text-sm font-bold text-slate-400 hover:text-blue-500 transition-colors"
            >
              Standard User Login →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminLogin;
