import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { MdTableRows } from "react-icons/md";
import { FiUsers } from "react-icons/fi";
import { FiTrash2 } from "react-icons/fi";
import { FiDatabase } from "react-icons/fi";
import { FiActivity } from "react-icons/fi";
import { IoMdAdd } from "react-icons/io";
import { IoMdTime } from "react-icons/io";
import { MdOutlineAdd } from "react-icons/md";
import { MdOutlineNoteAdd } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { NavLink, Link } from 'react-router';
import axios from 'axios';

function AdmingDashboard() {

  const theme = useSelector(state=> state.theme.value);
  const [showSideBar, setShowSideBar] = useState(false);
  const [allUsers, setAllUsers] = useState([])
  const [allNotes, setAllNotes] = useState([]);
  const [totalSessionsAttended, setTotalSessionsAttended] = useState(0);
  const [avgSessions, setAvgSessions] = useState(0);
  const [queries, setQueries] = useState()
  const sidebarOptions = [
      { name: "DashBoard", path: "/sh/admin/dashboard" },
      { name: "Notes", path: "/notes" },
      { name: "Entertainment", path: "/games" },
      { name: "Leaderboard", path: "/leaderboard" },
      { name: "Helping Zone", path: "/help" },
  ];




  useEffect(()=>{
    axios.get("/api/admin/users")
    .then(res=> {
      console.log(res.data)
      res.data.map(userData=>{
        setAllUsers(prev=> [...prev,userData])
        setTotalSessionsAttended(prev=> prev+userData.sessions)
      })
      const avg = totalSessionsAttended/ res.data.length ;
      setAvgSessions(avg)
      
      console.log("Total sessions", totalSessionsAttended, 'the number of svg', avg, res.data.length);
    }
  )
    .catch(err=> console.log(err));

    axios.get('/api/admin/notes')
    .then(res=>{
      console.log(res.data);
      res.data.map(notes=> {setAllNotes(prev=> [...prev,notes])})
    })
    .catch(err=> console.log(err));

    axios.get('/api/queries')
    .then(res=> {setQueries(res.data)})
    .catch(err=> console.log(err))
    
  },[])

  return (
    <div
      className={`flex h-screen w-full transition-colors duration-300 ${theme ? "bg-[#0f1115] text-slate-100" : "bg-slate-50 text-slate-900"}`}
    >
      {/* Sidebar (Kept as per benchmark) */}
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
            Global Monitor
          </h1>
        </header>

        <main className="p-8 max-w-[1600px] w-full mx-auto">
          {/* Top Level Stats */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
            {[
              {
                label: "Total Users",
                value: allUsers.length,
                icon: <FiUsers />,
                color: "text-blue-500",
              },
              {
                label: "Total Sessions ",
                value: totalSessionsAttended,
                sub: avgSessions,
                icon: <IoMdTime />,
                color: "text-purple-500",
              },
              {
                label: "Notes Available",
                value: allNotes.length,
                sub: "0 pending review",
                icon: <MdOutlineNoteAdd />,
                color: "text-emerald-500",
              },
              // { label: "Tasks Completed", value: "85%", sub: "Platform average", icon: <FaCheckCircle />, color: "text-orange-500" }
            ].map((stat, i) => (
              <div
                key={i}
                className={`p-6 rounded-2xl border transition-all ${theme ? "bg-slate-900/50 border-slate-800" : "bg-white border-slate-200 shadow-sm"}`}
              >
                <div className={`${stat.color} mb-3 text-2xl`}>{stat.icon}</div>
                <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                  {stat.label}
                </p>
                <h3 className="text-3xl font-black mt-1">{stat.value}</h3>
                <p className="text-xs text-slate-400 mt-2">{stat.sub}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
            {/* Left Column: Note Management & Help Center */}
            <div className="xl:col-span-2 space-y-8">
              {/* Note Management Section */}
              <div
                className={`rounded-2xl border transition-all duration-300 ${theme ? "bg-slate-900/50 border-slate-800" : "bg-white border-slate-200 shadow-sm"}`}
              >
                <div className="p-6 border-b border-slate-800 flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-bold italic tracking-tight">
                      Note Repository Management
                    </h2>
                    <p className="text-xs text-slate-500 mt-1 font-medium">
                      Review and moderate community-contributed documents
                    </p>
                  </div>
                  <div className="flex items-center gap-2 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
                    <span className="text-[10px] font-black text-blue-500 uppercase">
                      {allNotes?.length || 0} Total Files
                    </span>
                  </div>
                </div>

                <div className="p-0 overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead
                      className={`text-[10px] uppercase text-slate-500 font-black tracking-[0.15em] ${theme ? "bg-slate-800/50" : "bg-slate-50"}`}
                    >
                      <tr>
                        <th className="px-6 py-4">Document Details</th>
                        <th className="px-6 py-4">Uploader</th>
                        <th className="px-6 py-4">Uploaded At</th>
                        <th className="px-6 py-4 text-right">Moderation</th>
                      </tr>
                    </thead>
                    <tbody
                      className={`divide-y ${theme ? "divide-slate-800" : "divide-slate-100"}`}
                    >
                      {allNotes?.map((note) => (
                        <tr
                          key={note.id}
                          className="group hover:bg-blue-500/5 transition-colors"
                        >
                          {/* Title & Description */}
                          <td className="px-6 py-4 max-w-md">
                            <div className="flex flex-col">
                              <a
                                href={note.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-bold text-sm text-blue-500 hover:underline flex items-center gap-2"
                              >
                                {note.title || "Untitled Document"}
                                <span className="text-[10px] bg-slate-500/10 text-slate-400 px-1 rounded font-mono">
                                  ID: {note.id}
                                </span>
                              </a>
                              <p className="text-xs text-slate-500 mt-1 line-clamp-1 italic">
                                {note.description || "No description provided."}
                              </p>
                            </div>
                          </td>

                          {/* SAFE STRING HANDLING for Uploader */}
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2">
                              <div
                                className={`w-7 h-7 rounded-lg flex items-center justify-center text-[10px] font-bold ${theme ? "bg-slate-800 text-slate-300" : "bg-slate-100 text-slate-600"}`}
                              >
                                {/* Safely get first two letters or fallback to '??' */}
                                {(note.createdBy || "Anonymous")
                                  .toString()
                                  .substring(0, 2)
                                  .toUpperCase()}
                              </div>
                              <span className="text-sm font-semibold">
                                @{note.createdBy || "unknown"}
                              </span>
                            </div>
                          </td>

                          {/* CreatedAt Date */}
                          <td className="px-6 py-4">
                            <p className="text-xs font-medium text-slate-400">
                              {note.createdAt
                                ? new Date(note.createdAt).toLocaleDateString()
                                : "N/A"}
                            </p>
                          </td>

                          {/* Action Buttons */}
                          <td className="px-6 py-4 text-right">
                            <div className="flex justify-end gap-2">
                              <button
                                onClick={() => deleteNote(note.id)}
                                className="p-2 bg-red-500/10 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition-all border border-red-500/20"
                              >
                                <FiTrash2 size={14} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
              {/* List of all users */}
              <div
                className={`p-6 rounded-2xl border ${theme ? "bg-slate-900/50 border-slate-800" : "bg-white border-slate-200 shadow-sm"}`}
              >
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-xl font-bold tracking-tight">
                      User Directory
                    </h2>
                    <p className="text-xs text-slate-500 font-medium">
                      Manage and monitor platform members
                    </p>
                  </div>
                  <span className="px-3 py-1 bg-blue-500/10 text-blue-500 text-xs font-black rounded-full uppercase">
                    {allUsers?.length} Total Users
                  </span>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left border-separate border-spacing-y-3">
                    <thead>
                      <tr className="text-xs uppercase text-slate-500 font-black tracking-widest">
                        <th className="px-4 py-2">Identity</th>
                        <th className="px-4 py-2">Contact</th>
                        <th className="px-4 py-2 text-center">Stats</th>
                        <th className="px-4 py-2 text-right">Settings</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allUsers &&
                        allUsers.map((user) => (
                          <tr
                            key={user.id}
                            className={`group transition-all duration-200 ${theme ? "hover:bg-slate-800/40" : "hover:bg-slate-50"}`}
                          >
                            {/* Username & Avatar */}
                            <td
                              className={`px-4 py-4 rounded-l-xl border-y border-l ${theme ? "border-slate-800 bg-slate-900/30" : "border-slate-100 bg-white"}`}
                            >
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 flex items-center justify-center text-white font-bold text-sm shadow-lg shadow-blue-500/20">
                                  {user.username.substring(0, 2).toUpperCase()}
                                </div>
                                <div>
                                  <p className="font-bold text-sm">
                                    {user.username}
                                  </p>
                                  <p className="text-[10px] font-mono text-slate-500 opacity-60 truncate w-24">
                                    {user.id.split("-")[0]}...
                                  </p>
                                </div>
                              </div>
                            </td>

                            {/* Email */}
                            <td
                              className={`px-4 py-4 border-y ${theme ? "border-slate-800 bg-slate-900/30" : "border-slate-100 bg-white"}`}
                            >
                              <p className="text-sm font-medium text-slate-400">
                                {user.email}
                              </p>
                            </td>

                            {/* Sessions & Hours */}
                            <td
                              className={`px-4 py-4 border-y ${theme ? "border-slate-800 bg-slate-900/30" : "border-slate-100 bg-white"}`}
                            >
                              <div className="flex justify-center gap-4">
                                <div className="text-center">
                                  <p className="text-[10px] font-black uppercase text-slate-500">
                                    Hours
                                  </p>
                                  <p className="text-sm font-bold text-blue-500">
                                    {user.studyHours || 0}
                                  </p>
                                </div>
                                <div className="text-center">
                                  <p className="text-[10px] font-black uppercase text-slate-500">
                                    Sessions
                                  </p>
                                  <p
                                    className={`text-sm font-bold ${user.sessions > 0 ? "text-emerald-500" : "text-slate-400"}`}
                                  >
                                    {user.sessions ?? 0}
                                  </p>
                                </div>
                              </div>
                            </td>

                            {/* Action Buttons */}
                            <td
                              className={`px-4 py-4 rounded-r-xl border-y border-r ${theme ? "border-slate-800 bg-slate-900/30" : "border-slate-100 bg-white"}`}
                            >
                              <div className="flex justify-end gap-2">
                                <button className="p-2 hover:bg-blue-500/10 text-slate-500 hover:text-blue-500 rounded-lg transition-colors">
                                  <FiActivity size={16} />
                                </button>
                                <button
                                  className="p-2 hover:bg-red-500/10 text-slate-500 hover:text-red-500 rounded-lg transition-colors"
                                  onClick={() =>
                                    console.log("Delete user:", user.id)
                                  }
                                >
                                  <FiTrash2 size={16} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* Right Column: Global Productivity Status */}
            <div className="space-y-8">
              <div
                className={`p-6 rounded-2xl border ${theme ? "bg-slate-900/50 border-slate-800" : "bg-white border-slate-200 shadow-sm"}`}
              >
                <h2 className="text-xl font-bold mb-6 text-center">
                  Platform Productivity
                </h2>
                <div className="space-y-8">
                  {/* Productivity Gauges */}
                  <div className="text-center">
                    <div className="text-4xl font-black text-blue-500">
                      72.4%
                    </div>
                    <p className="text-xs uppercase font-bold text-slate-500 mt-1 tracking-widest">
                      Efficiency Index
                    </p>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm font-bold">
                        <span>To-Do Completion</span>
                        <span className="text-emerald-500">82%</span>
                      </div>
                      <div className="w-full bg-slate-800 rounded-full h-2">
                        <div
                          className="bg-emerald-500 h-2 rounded-full"
                          style={{ width: "82%" }}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm font-bold">
                        <span>Session Consistency</span>
                        <span className="text-blue-500">64%</span>
                      </div>
                      <div className="w-full bg-slate-800 rounded-full h-2">
                        <div
                          className="bg-blue-500 h-2 rounded-full"
                          style={{ width: "64%" }}
                        />
                      </div>
                    </div>
                  </div>

                  <div
                    className={`p-4 rounded-xl text-center border ${theme ? "bg-slate-800/50 border-slate-700" : "bg-slate-100"}`}
                  >
                    <p className="text-xs text-slate-400 font-medium">
                      Productivity is up{" "}
                      <span className="text-emerald-500">+4%</span> compared to
                      last month.
                    </p>
                  </div>
                </div>
              </div>

              {/* Help Queries Support Panel */}
              <div
                className={`p-6 rounded-2xl border ${theme ? "bg-slate-900/50 border-slate-800" : "bg-white border-slate-200 shadow-sm"}`}
              >
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-bold italic text-slate-500 underline">
                    Help Queries
                  </h2>
                  <span className="text-xs font-semibold bg-blue-500/10 text-blue-500 px-2 py-1 rounded-full">
                    3 Pending
                  </span>
                </div>

                <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                  {queries?.map((query) => (
                    <div
                      key={query.id}
                      className={`p-3 rounded-lg border ${theme ? "border-slate-800 bg-slate-900/30" : "border-slate-100 bg-slate-50/50"}`}
                    >
                      {/* Header: User & Time */}
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <p className="text-xs font-bold text-blue-500">
                            {query.authorUsername}
                          </p>
                          <p className="text-[10px] opacity-50">
                            {new Date().toLocaleDateString()}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <button  className="text-[10px] text-emerald-500 hover:underline font-bold uppercase tracking-wider">
                            Answer
                          </button>
                          <button
                            onClick={()=>{
                              // axios.get(`/api/delete/queries/${query.id}`)

                            }}
                          className="text-[10px] text-red-400 hover:underline font-bold uppercase tracking-wider">
                            Delete
                          </button>
                        </div>
                      </div>

                      {/* Query Content */}
                      <p
                        className={`text-sm ${theme ? "text-slate-300" : "text-slate-600"} leading-relaxed`}
                      >
                        "I'm having trouble downloading the Advanced Calculus
                        notes. The link seems to expire immediately. Any fix?"
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdmingDashboard