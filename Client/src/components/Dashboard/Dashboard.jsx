import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router";
import { MdTableRows } from "react-icons/md";
import Card from "../Entertaintment/Card";
import { IoMdTime } from "react-icons/io";
import { MdOutlineRadar } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { useEffect } from "react";
import axios from "axios";
import { FaAward } from "react-icons/fa6";
ChartJS.register(ArcElement, Tooltip, Legend);

function Dashboard() {
  const [showSideBar, setShowSideBar] = useState(true);
  const [topUsers, setTopUsers] = useState([]); // State for real leaderboard data
  const theme = useSelector((state) => state.theme.value);
  const { username, totalSessions } = useSelector((state) => state.auth.user);
  const [todos,setTodos] = useState()

  const sidebarOptions = [
    { name: "Home", path: "/home" },
    { name: "Notes", path: "/notes" },
    { name: "Chat", path: "/chat" },
    { name: "Leaderboard", path: "/leaderboard" },
    { name: "Entertainment", path: "/games" },
    { name: "Help Zone", path: "/help" },
  ];

  // Fetch real leaderboard data
  useEffect(() => {
    axios
      .get("/api/admin/users") // Replace with your public user endpoint if different
      .then((res) => {
        const sorted = [...res.data].sort(
          (a, b) => (b.studyHours || 0) - (a.studyHours || 0),
        );
        setTopUsers(sorted.slice(0, 6)); // Show top 6 on dashboard
      })
      .catch((err) => console.log("Leaderboard error:", err));

      axios.get('/api/user/todos')
      .then(res=> setTodos(res.data))
      .catch(err=> console.log(err));
  }, []);

  axios.get('/api/user/todos')
  .then(res=> console.log(res.data))
  .catch(err => console.log(err))

  // Dynamic Chart Data based on User Sessions
  const chartData = {
    labels: ["Completed", "Remaining"],
    datasets: [
      {
        data: [totalSessions, 20 - totalSessions > 0 ? 20 - totalSessions : 10],
        backgroundColor: ["#3b82f6", theme ? "#1e293b" : "#e2e8f0"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div
      className={`flex h-screen w-full transition-colors duration-300 ${theme ? "bg-[#0f1115] text-slate-100" : "bg-slate-50 text-slate-900"}`}
    >
      {/* Sidebar */}
      {showSideBar && (
        <div
          className={`shrink-0 border-r transition-all duration-300 ${theme ? "border-slate-800 bg-[#0f1115]" : "border-slate-200 bg-white"} lg:w-64 md:w-56 w-64 p-4`}
        >
          <div className="mb-10 px-4">
            <h1 className="text-2xl font-black text-blue-500 tracking-tighter italic">
              StudyHive
            </h1>
          </div>
          <nav className="space-y-1">
            {sidebarOptions.map((option) => (
              <Link
                key={option.name}
                to={option.path}
                className="flex items-center gap-3 px-4 py-3 rounded-xl font-medium transition-all duration-200 hover:bg-blue-600/10 hover:text-blue-500"
              >
                {option.name}
              </Link>
            ))}
          </nav>
        </div>
      )}

      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto flex flex-col relative">
        <header className="flex items-center px-8 py-4 sticky top-0 z-10 backdrop-blur-md border-b border-slate-500/10">
          <button
            onClick={() => setShowSideBar(!showSideBar)}
            className="p-2 hover:bg-slate-500/10 rounded-lg transition-colors mr-4"
          >
            <MdTableRows size={24} />
          </button>
          <span className="text-xs font-bold uppercase tracking-widest opacity-40">
            User Console // {new Date().toLocaleDateString()}
          </span>
        </header>

        <main className="p-8 max-w-[1600px] w-full mx-auto">
          {/* Welcome Hero */}
          <section className="mb-10">
            <h1 className="text-4xl font-extrabold tracking-tight mb-2">
              Welcome back, <span className="text-blue-500">{username}</span>!
            </h1>
            <p
              className={`${theme ? "text-slate-400" : "text-slate-500"} text-lg`}
            >
              You've completed{" "}
              <span className="font-bold text-blue-500">
                {totalSessions} sessions
              </span>{" "}
              this period.
            </p>
          </section>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            <div className="xl:col-span-2 space-y-8">
              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  {
                    label: "Focused Time",
                    value: "12h 30m",
                    sub: "This week",
                    icon: <IoMdTime />,
                    color: "text-blue-500",
                  },
                  {
                    label: "Total Sessions",
                    value: totalSessions,
                    sub: "All time",
                    icon: <MdOutlineRadar />,
                    color: "text-purple-500",
                  },
                  {
                    label: "Tasks Done",
                    value: "10",
                    sub: "Daily goal hit",
                    icon: <FaCheckCircle />,
                    color: "text-emerald-500",
                  },
                  {
                    label: "Streak",
                    value: "5 Days",
                    sub: "Best: 10 days",
                    icon: <MdOutlineRadar />,
                    color: "text-orange-500",
                  },
                ].map((stat, i) => (
                  <div
                    key={i}
                    className={`p-5 rounded-2xl border transition-all ${theme ? "bg-slate-900/50 border-slate-800" : "bg-white border-slate-200 shadow-sm"}`}
                  >
                    <div className={`${stat.color} mb-3 text-xl`}>
                      {stat.icon}
                    </div>
                    <p className="text-sm font-medium text-slate-500 uppercase tracking-wider">
                      {stat.label}
                    </p>
                    <h3 className="text-2xl font-bold mt-1">{stat.value}</h3>
                    <p className="text-xs text-slate-400 mt-2">{stat.sub}</p>
                  </div>
                ))}
              </div>

              {/* Progress & Chart Section */}
              <div
                className={`p-8 rounded-3xl border ${theme ? "bg-slate-900/50 border-slate-800" : "bg-white border-slate-200 shadow-sm"}`}
              >
                <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                  <div className="flex-1">
                    <h2 className="text-2xl font-black mb-2">
                      Session Milestone
                    </h2>
                    <p className="text-slate-500 mb-6">
                      Reach 20 sessions to unlock the "Pro Student" badge.
                    </p>
                    <div className="space-y-4">
                      <div className="flex justify-between text-sm font-black uppercase tracking-tighter">
                        <span>Current Progress</span>
                        <span className="text-blue-500">
                          {Math.round((totalSessions / 20) * 100)}%
                        </span>
                      </div>
                      <div className="w-full bg-slate-700/20 rounded-full h-4 overflow-hidden p-1 border border-slate-500/10">
                        <div
                          className="bg-blue-500 h-full rounded-full shadow-[0_0_15px_rgba(59,130,246,0.5)] transition-all duration-1000"
                          style={{ width: `${(totalSessions / 20) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div className="h-44 w-44">
                    <Doughnut
                      data={chartData}
                      options={{
                        cutout: "80%",
                        plugins: { legend: { display: false } },
                      }}
                    />
                  </div>
                  <div></div>
                </div>
                <div>Keep going !!!</div>
              </div>
              <div className="w-full min-h-40 max-h-80 scroll-auto">
                {todos ? (
                  todos.map((todo) => (
                    <div
                      className={`p-8 rounded-3xl border ${theme ? "bg-slate-900/50 border-slate-800" : "bg-white border-slate-200 shadow-sm"}`}
                    >
                      {" "}
                      todo{" "}
                    </div>
                  ))
                ) : (
                  <div
                    className={`p-8 rounded-3xl border ${theme ? "bg-slate-900/50 border-slate-800" : "bg-white border-slate-200 shadow-sm"}`}
                  >
                    No todos available currenlty
                  </div>
                )}
              </div>
            </div>

            {/* INTEGRATED LEADERBOARD */}
            <div
              className={`p-6 rounded-3xl border flex flex-col ${theme ? "bg-slate-900/50 border-slate-800" : "bg-white border-slate-200 shadow-sm"}`}
            >
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="text-xl font-bold">Hall of Fame</h2>
                  <p className="text-xs text-slate-500">Based on study hours</p>
                </div>
                <FaAward className="text-yellow-500 text-2xl" />
              </div>

              <div className="space-y-4 overflow-y-auto pr-2 custom-scrollbar">
                {topUsers.map((user, i) => (
                  <div
                    key={user.id}
                    className={`flex items-center justify-between p-3 rounded-2xl transition-all ${user.username === username ? "bg-blue-500/10 border border-blue-500/20" : "hover:bg-slate-500/5"}`}
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`w-6 text-xs font-black ${i < 3 ? "text-blue-500" : "text-slate-500 opacity-50"}`}
                      >
                        0{i + 1}
                      </span>
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs ${i === 0 ? "bg-yellow-500 text-black shadow-lg shadow-yellow-500/20" : "bg-slate-500/10"}`}
                      >
                        {user.username.substring(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <p
                          className={`font-bold text-sm ${user.username === username ? "text-blue-500" : ""}`}
                        >
                          {user.username === username
                            ? "You"
                            : `@${user.username}`}
                        </p>
                        <p className="text-[10px] text-slate-500 font-medium">
                          {user.sessions || 0} Sessions
                        </p>
                      </div>
                    </div>
                    <span className="font-black text-sm">
                      {user.studyHours || 0}h
                    </span>
                  </div>
                ))}
              </div>

              <Link
                to="/leaderboard"
                className="mt-8 w-full py-4 rounded-2xl bg-slate-500/10 text-center text-xs font-black uppercase tracking-widest hover:bg-blue-600 hover:text-white transition-all"
              >
                View Full Rankings
              </Link>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;