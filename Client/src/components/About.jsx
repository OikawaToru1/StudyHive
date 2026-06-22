import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router";
import { MdTableRows, MdClose } from "react-icons/md";
import { BsStars } from "react-icons/bs";
import { IoIosBook, IoIosPeople, IoIosTime, IoIosStats } from "react-icons/io";

function About() {
  const theme = useSelector((state) => state.theme.value);
  const [showSideBar, setShowSideBar] = useState(false);
  const [activeTab, setActiveTab] = useState("all");

  const sidebarOptions = [
    { name: "Home", path: "/home" },
    { name: "Notes", path: "/notes" },
    { name: "Chat", path: "/chat" },
    { name: "Leaderboard", path: "/leaderboard" },
    { name: "Entertainment", path: "/games" },
    { name: "Help Zone", path: "/help" },
  ];

 const pillars = [
   {
     id: "productivity",
     title: "Study Management",
     icon: <IoIosBook size={24} className="text-blue-500" />,
     desc: "Upload, organize, and share comprehensive study notes with classmates to build a collective knowledge base.",
   },
   {
     id: "community",
     title: "Knowledge Sharing",
     icon: <IoIosPeople size={24} className="text-blue-500" />,
     desc: "Participate in community-driven Q&A discussions. Ask tough questions, provide answers, and learn together.",
   },
   {
     id: "ai",
     title: "AI-Powered Assistance",
     icon: <BsStars size={22} className="text-blue-500" />,
     desc: "Leverage advanced AI capabilities for document-based question answering, context summarization, and custom quiz generation.",
   },
   {
     id: "productivity",
     title: "Focus & Productivity",
     icon: <IoIosTime size={24} className="text-blue-500" />,
     desc: "Stay in the zone with a customizable Pomodoro timer, integrated background music, and adjustable ambient soundscapes.",
   },
 ];

  const features = [
    {
      name: "Task Management",
      cat: "productivity",
      detail:
        "Track daily assignments, set priorities, and monitor learning progress.",
    },
    {
      name: "Ambient Sounds",
      cat: "productivity",
      detail:
        "Block out distractions using custom-tailored ambient backgrounds.",
    },
    {
      name: "Gamified Engagement",
      cat: "community",
      detail:
        "Earn rewards and build recognition by helping peers answer questions.",
    },
    {
      name: "Interactive Mind Breaks",
      cat: "break",
      detail:
        "Casual games and refreshing activities to recharge during study breaks.",
    },
    {
      name: "Smart Summaries",
      cat: "ai",
      detail:
        "Instantly turn long PDFs and complex documents into concise study points.",
    },
    {
      name: "Dynamic Quizzes",
      cat: "ai",
      detail:
        "Test your learning comprehension with automatically generated quizzes.",
    },
  ];

  const filteredFeatures =
    activeTab === "all"
      ? features
      : features.filter((f) => f.cat === activeTab);

  return (
    <div
      className={`h-screen w-full flex overflow-hidden transition-colors duration-500 ${
        theme ? "bg-[#0a0a0a] text-white" : "bg-white text-slate-900"
      }`}
    >
      {/* LEFT SIDEBAR: Navigation (Matches Queries.jsx structural state) */}
      {showSideBar && (
        <aside
          className={`shrink-0 border-r h-full lg:w-1/6 md:w-[200px] sm:w-3/6 w-4/6 flex flex-col transition-all duration-300 ${
            theme
              ? "bg-black border-white/5 shadow-2xl shadow-black"
              : "bg-slate-50 border-slate-200"
          }`}
        >
          <div className="flex-1 overflow-y-auto px-3 mt-20 custom-scrollbar">
            {sidebarOptions.map((option) => (
              <Link
                key={option.name}
                to={option.path}
                className={`h-12 flex items-center px-4 font-bold rounded-xl mb-1 transition-all ${
                  theme
                    ? "hover:bg-white/5 text-slate-400 hover:text-white"
                    : "hover:bg-blue-50 text-slate-600 hover:text-blue-600"
                }`}
              >
                {option.name}
              </Link>
            ))}
          </div>
        </aside>
      )}

      {/* MAIN LAYOUT WRAPPER */}
      <main className="flex-1 flex flex-col h-full relative overflow-y-auto custom-scrollbar">
        {/* Navigation Sidebar Toggle Trigger */}
        <div
          className="absolute left-6 top-8 z-50 cursor-pointer p-2 hover:bg-blue-500/10 rounded-xl text-blue-500 transition-colors"
          onClick={() => setShowSideBar((prev) => !prev)}
        >
          <MdTableRows size={26} />
        </div>

        {/* HERO TITLE SECTION (Styled explicitly to mirror image_8f7221.jpg) */}
        <section className="shrink-0 w-full flex flex-col items-center text-center pt-24 pb-12 px-10">
          <h2 className="text-xs font-black uppercase tracking-[0.2em] text-blue-500 mb-3">
            About the platform
          </h2>
          <h1 className="text-4xl md:text-5xl font-black tracking-tight text-balance max-w-4xl leading-tight">
            A Learning platform that promotes efficient learning.
          </h1>
          <p className="mt-6 text-sm md:text-base opacity-70 font-medium max-w-2xl leading-relaxed">
            StudyHive is a full-stack student productivity and collaborative
            learning platform that combines study management, knowledge sharing,
            and AI-powered assistance into a single workspace ecosystem.
          </p>
        </section>

        {/* CORE PLATFORM PILLARS GRID */}
        <section className="px-6 lg:px-16 py-8 max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((pillar, idx) => (
              <div
                key={idx}
                className={`flex flex-col p-6 rounded-[2rem] border-2 transition-all duration-300 ${
                  theme
                    ? "bg-white/5 border-white/5 shadow-2xl shadow-black/40"
                    : "bg-white border-slate-100 shadow-xl shadow-slate-200/40"
                }`}
              >
                <div
                  className={`p-3 rounded-xl w-fit mb-4 ${theme ? "bg-white/5" : "bg-slate-100"}`}
                >
                  {pillar.icon}
                </div>
                <h3 className="text-md font-bold tracking-tight mb-2">
                  {pillar.title}
                </h3>
                <p className="text-xs opacity-60 leading-relaxed font-medium">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* INTERACTIVE FEATURE DEEP DIVE (TABBED REGION) */}
        <section
          className={`mt-8 py-12 px-6 lg:px-16 border-t ${
            theme
              ? "border-white/5 bg-black/20"
              : "border-slate-100 bg-slate-50/50"
          }`}
        >
          <div className="max-w-7xl mx-auto w-full">
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
              <div>
                <h2 className="text-xl font-black italic">
                  Explore the Workspace
                </h2>
                <p className="text-xs text-slate-500 font-semibold mt-1">
                  Everything built into the ecosystem to manage focus, tools,
                  and collaboration.
                </p>
              </div>

              {/* Tabs Controller */}
              <div className="flex flex-wrap gap-2">
                {["all", "productivity", "community", "ai", "break"].map(
                  (tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all ${
                        activeTab === tab
                          ? "bg-blue-600 text-white shadow-md shadow-blue-600/20"
                          : theme
                            ? "bg-white/5 text-slate-400 hover:bg-white/10"
                            : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-50"
                      }`}
                    >
                      {tab === "ai"
                        ? "AI features"
                        : tab === "break"
                          ? "Breaks"
                          : tab}
                    </button>
                  ),
                )}
              </div>
            </div>

            {/* Sub Features Filter Listing */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredFeatures.map((feat, idx) => (
                <div
                  key={idx}
                  className={`p-5 rounded-2xl border transition-all duration-200 ${
                    theme
                      ? "bg-black/40 border-white/5"
                      : "bg-white border-slate-100 shadow-sm"
                  }`}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="size-2 rounded-full bg-blue-500" />
                    <h4 className="text-sm font-bold tracking-tight">
                      {feat.name}
                    </h4>
                  </div>
                  <p className="text-xs opacity-60 leading-relaxed font-medium">
                    {feat.detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ECOSYSTEM VISION / FOOTER CTA */}
        <section className="max-w-4xl mx-auto w-full px-6 py-16 text-center shrink-0">
          <div
            className={`p-8 md:p-12 rounded-[2.5rem] border-2 flex flex-col items-center ${
              theme
                ? "bg-gradient-to-b from-white/[0.03] to-transparent border-white/5"
                : "bg-white border-slate-100 shadow-xl shadow-slate-200/40"
            }`}
          >
            <h3 className="text-xs font-black uppercase tracking-[0.2em] text-blue-500 mb-3">
              Our Vision
            </h3>
            <p className="text-sm md:text-base font-medium opacity-70 leading-relaxed max-w-2xl">
              By combining productivity utilities, community resource pools, and
              cutting-edge machine assistance, StudyHive builds a comprehensive
              digital habitat helping students shift effortlessly between
              focused solo work and collective group work.
            </p>
            <Link
              to="/home"
              className="mt-8 flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-2xl font-black text-sm hover:bg-blue-500 transition-all active:scale-95 shadow-lg shadow-blue-600/20"
            >
              <span>Get Started</span>
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}

export default About;
