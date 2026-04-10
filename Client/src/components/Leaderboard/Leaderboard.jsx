import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { MdTableRows, MdEmojiEvents } from "react-icons/md";
import { FiTrendingUp, FiAward, FiClock } from "react-icons/fi";
import { NavLink, Link } from "react-router";
import axios from "axios";

function Leaderboard() {
  const theme = useSelector((state) => state.theme.value);
  const [showSideBar, setShowSideBar] = useState(false);
  const [rankedUsers, setRankedUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  const sidebarOptions = [
    { name: "DashBoard", path: "/sh/admin/dashboard" },
    { name: "Notes", path: "/notes" },
    { name: "Entertainment", path: "/games" },
    { name: "Leaderboard", path: "/leaderboard" },
    { name: "Helping Zone", path: "/help" },
  ];

  useEffect(() => {
    axios
      .get("https://studyhive-sse4.onrender.com/api/admin/users")
      .then((res) => {
        // Sorting logic: Sort by hours, then sessions
        const sorted = [...res.data].sort((a, b) => {
          if (b.studyHours !== a.studyHours) {
            return (b.studyHours || 0) - (a.studyHours || 0);
          }
          return (b.sessions || 0) - (a.sessions || 0);
        });
        setRankedUsers(sorted);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  // Helper for Podium Styles
  const getRankStyles = (index) => {
    if (index === 0)
      return {
        color: "text-yellow-500",
        bg: "bg-yellow-500/10",
        border: "border-yellow-500/20",
        icon: "🥇",
      };
    if (index === 1)
      return {
        color: "text-slate-400",
        bg: "bg-slate-400/10",
        border: "border-slate-400/20",
        icon: "🥈",
      };
    if (index === 2)
      return {
        color: "text-amber-700",
        bg: "bg-amber-700/10",
        border: "border-amber-700/20",
        icon: "🥉",
      };
    return {
      color: "text-blue-500",
      bg: "bg-blue-500/10",
      border: "border-blue-500/20",
      icon: `#${index + 1}`,
    };
  };

  return (
    <div
      className={`flex h-screen w-full transition-colors duration-300 ${theme ? "bg-[#0f1115] text-slate-100" : "bg-slate-50 text-slate-900"}`}
    >
      {/* Sidebar (Reusable Component logic) */}
      {showSideBar && (
        <div
          className={`shrink-0 border-r transition-all duration-300 ${theme ? "border-slate-800 bg-[#0f1115]" : "border-slate-200 bg-white"} lg:w-64 md:w-56 w-64 p-4`}
        >
          <div className="mb-8 px-4">
            <NavLink
              to="/"
              className="text-2xl font-black text-blue-500 tracking-tight"
            >
              AdminHive
            </NavLink>
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

      <div className="flex-1 overflow-y-auto flex flex-col relative">
        <header className="flex items-center px-8 py-4 sticky top-0 z-10 backdrop-blur-md border-b border-slate-500/10">
          <button
            onClick={() => setShowSideBar(!showSideBar)}
            className="p-2 hover:bg-slate-500/10 rounded-lg transition-colors mr-4"
          >
            <MdTableRows size={24} />
          </button>
          <h1 className="text-lg font-black uppercase tracking-widest text-blue-500">
            Global Leaderboard
          </h1>
        </header>

        <main className="p-8 max-w-[1200px] w-full mx-auto">
          {/* Podium / Top 3 Section */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 items-end">
            {rankedUsers.slice(0, 3).map((user, index) => {
              const rank = getRankStyles(index);
              return (
                <div
                  key={user.id}
                  className={`relative p-8 rounded-3xl border ${rank.bg} ${rank.border} flex flex-col items-center transition-transform hover:scale-[1.02] ${index === 0 ? "order-1 md:order-2 md:pb-16" : index === 1 ? "order-2 md:order-1" : "order-3"}`}
                >
                  <div className="text-4xl mb-4">{rank.icon}</div>
                  <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-slate-700 to-slate-900 flex items-center justify-center border-4 border-white/10 mb-4 shadow-2xl">
                    <span className="text-xl font-black">
                      {user.username.substring(0, 2).toUpperCase()}
                    </span>
                  </div>
                  <h3 className="text-xl font-black tracking-tight">
                    @{user.username}
                  </h3>
                  <p
                    className={`text-sm font-bold ${rank.color} mt-1 uppercase tracking-widest`}
                  >
                    {index === 0
                      ? "Champion"
                      : index === 1
                        ? "Runner Up"
                        : "Contender"}
                  </p>
                  <div className="mt-4 flex gap-4">
                    <div className="text-center">
                      <p className="text-[10px] text-slate-500 font-black uppercase">
                        Hours
                      </p>
                      <p className="font-bold">{user.studyHours || 0}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-[10px] text-slate-500 font-black uppercase">
                        Sessions
                      </p>
                      <p className="font-bold">{user.sessions || 0}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Full Ranking Table */}
          <div
            className={`rounded-3xl border ${theme ? "bg-slate-900/40 border-slate-800" : "bg-white border-slate-200 shadow-xl"}`}
          >
            <div className="p-6 border-b border-slate-500/10 flex justify-between items-center">
              <h2 className="text-xl font-black flex items-center gap-2">
                <FiTrendingUp className="text-blue-500" /> All-Time Rankings
              </h2>
              <span className="text-xs font-bold text-slate-500">
                Live Statistics
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead
                  className={`text-[10px] font-black uppercase tracking-widest text-slate-500 ${theme ? "bg-slate-800/30" : "bg-slate-50"}`}
                >
                  <tr>
                    <th className="px-8 py-5">Rank</th>
                    <th className="px-8 py-5">User</th>
                    <th className="px-8 py-5">Study Time</th>
                    <th className="px-8 py-5">Sessions</th>
                    <th className="px-8 py-5 text-right">Performance</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-500/10">
                  {rankedUsers.map((user, index) => (
                    <tr
                      key={user.id}
                      className="group hover:bg-blue-500/5 transition-colors"
                    >
                      <td className="px-8 py-5">
                        <span
                          className={`text-sm font-black ${index < 3 ? "text-blue-500" : "text-slate-500"}`}
                        >
                          #{index + 1}
                        </span>
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-slate-800 flex items-center justify-center text-[10px] font-bold">
                            {user.username.substring(0, 2).toUpperCase()}
                          </div>
                          <span className="font-bold text-sm">
                            @{user.username}
                          </span>
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <div className="flex items-center gap-2 text-sm font-semibold">
                          <FiClock className="text-slate-500" />
                          {user.studyHours || 0} hrs
                        </div>
                      </td>
                      <td className="px-8 py-5">
                        <span className="text-sm font-medium px-3 py-1 rounded-full bg-blue-500/5 border border-blue-500/10">
                          {user.sessions || 0} Sessions
                        </span>
                      </td>
                      <td className="px-8 py-5 text-right">
                        <div className="inline-flex items-center gap-1 text-emerald-500 text-xs font-bold uppercase">
                          <FiAward /> Excellent
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Leaderboard;
