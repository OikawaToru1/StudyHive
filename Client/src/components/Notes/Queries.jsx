import React, { useEffect, useState } from "react";
import Input from "../Auth/Input/Input";
import Button from "../Auth/Button/Button";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import axios from "axios";
import { MdTableRows } from "react-icons/md";
import { BsStars } from "react-icons/bs";
import { MdClose } from "react-icons/md";
import { IoSend } from "react-icons/io5";
import { Link } from "react-router";
import QueryDetail from "./QueryDetail";

function Queries() {
  const theme = useSelector((state) => state.theme.value);
  const username = useSelector((state) => state.auth.user.username);
  const [showSideBar, setShowSideBar] = useState(false);
  const [showAttatchments, setShowAttatchments] = useState(false);
  const [showAiSidebar, setShowAiSidebar] = useState(false);
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [aiConversation, setAiConversation] = useState([]);
  const [showQueryDetail, setShowQueryDetail] = useState(false);
  const [selectedQuery, setSelectedQuery] = useState(null);
  const [answer, setAnswer] = useState("")
  const [answerQuery, setAnswerQuery] = useState([{author : "BHeem", comment : "I would recommend commenting the very part that you want help with"}])
  const [queries, setQueries] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({});

  const handlePrompt = (e) => {
    if (prompt.length > 0) {
      setAiConversation((prev) => [...prev, { from: "user", msg: prompt }]);
      console.log(prompt);
      setPrompt("");

      axios
        .post("/api/ask-ai", { prompt: prompt })
        .then((res) => {
          setAiConversation((prev) => [
            ...prev,
            { from: "ai", msg: res.data.answer },
          ]);
          console.log("response from ai -", res.data.answer);
        })
        .catch((err) => console.log(err));
    }
  };

  const onSubmit = (data) => {
    if (!username) {
      alert("You must log in to upload file");
    } else if (!data.file) {
      console.log("Submitting query - ", data.query, " by user - ", username);
      axios.post("/api/query/upload", { query: data.query, creator: username })
      .then(res=> (setQueries(prev=>[res.data,...prev])))
      .catch(err=> {console.log("error in file uplaod")})
    } else {
      console.log(
        data.title,
        data.description,
        data.image[0],
        "your uploaded data",
      );
      const form = new FormData();
      form.append("query", data.query);
      form.append("my_file", data.file[0]);
      form.append("creator", username);

      axios
        .post("/api/file-query/upload", form)
        .then((res) => {
          console.log("File posted !", res.data);
          setMessageStatus(true);
          setNoteData({
            url: res.data.url,
            title: res.data.title,
            description: res.data.description,
          });
        })
        .catch((err) => console.log(err));

      console.log("form data", form.values);
    }
  };
  const sidebarOptions = [
    { name: "Home", path: "/home" },
    { name: "Notes", path: "/notes" },
    { name: "Chat", path: "/chat" },
    { name: "Leaderboard", path: "/leaderboard" },
    { name: "Entertainment", path: "/games" },
    { name: "Help Zone", path: "/help" },
  ];
  useEffect(() => {
    axios
      .get("/api/queries")
      .then((res) => {
        console.log(res.data)
        res.data.map(query=> (setQueries(prev=> [...prev, query])))
      })
      .catch((err) => console.log(err));
  }, []);

  // return (
  //   <div className="h-screen ">
  //     <div className="flex flex-col items-center justify-between  ">
  //       <form className="w-2/4 flex flex-col gap-2 mb-5 " onSubmit={handleSubmit(onSubmit)}>
  //         <Input {...register("query", {required:true})}  placeholder="Ask your queries" />
  //         {errors.query?.type == "required" && <p role="alert" className="text-red-600">Query is required</p>}
  //           <div className="flex items-center gap-2">
  //               <input onChange={(e)=>setShowAttatchments(prev=> !prev)} type="checkbox" name="files" id="files" className='h-[50px]' />
  //               <label className=" select-none" htmlFor="files">Add attatchments?</label>
  //           </div>
  //           {showAttatchments? <Input type="file" {...register("file")}/>: ''}
  //         <Button text="Submit" />
  //       </form>

  //       <div className="mt-4 p-4 flex gap-4  w-full h-[70vh]">
  //          <div className="border-1 rounded-md p-2 flex flex-col justify-between h-52">
  //           <h1>Query</h1>
  //           {/* {img? img : ''} */}
  //             <h2>My quesiton is about this this this, that that that</h2>
  //               <input className="w-full p-2 rounded-md border-1" placeholder="Answer ?" />

  //          </div>
  //          <div className="border-1 rounded-md p-2 flex flex-col justify-between h-52">
  //           <h1>Query</h1>
  //           {/* {img? img : ''} */}
  //             <h2>My quesiton is about this this this, that that that</h2>
  //               <input className="w-full p-2 rounded-md border-1" placeholder="Answer ?" />

  //          </div>
  //       </div>
  //     </div>
  //   </div>
  // );
  return (
    <div
      className={`h-screen w-full flex overflow-hidden transition-colors duration-500 ${theme ? "bg-[#0a0a0a] text-white" : "bg-white text-slate-900"}`}
    >
      {/* LEFT SIDEBAR: Navigation */}
      {showSideBar && (
        <aside
          className={`shrink-0 border-r h-full lg:w-1/6 md:w-[200px] sm:w-3/6 w-4/6 flex flex-col transition-all duration-300 ${theme ? "bg-black border-white/5 shadow-2xl shadow-black" : "bg-slate-50 border-slate-200"}`}
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

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col h-full relative overflow-hidden">
        {/* Sidebar Toggle Trigger */}
        <div
          className="absolute left-6 top-8 z-50 cursor-pointer p-2 hover:bg-blue-500/10 rounded-xl text-blue-500 transition-colors"
          onClick={() => setShowSideBar((prev) => !prev)}
        >
          <MdTableRows size={26} />
        </div>

        {/* NEW: ASK AI BUTTON (Positioned top-right) */}
        <button
          onClick={() => setShowAiSidebar(true)}
          className={`absolute right-6 top-8 z-50 flex items-center gap-2 px-5 py-2.5 rounded-2xl font-black text-sm transition-all active:scale-95 ${
            theme
              ? "bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-900/20"
              : "bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-200"
          }`}
        >
          <BsStars size={18} />
          <span>Ask AI</span>
        </button>

        {/* COMMUNITY FORM SECTION (Keep original) */}
        <div
          className={`shrink-0 w-full flex flex-col items-center pt-16 pb-8 px-10 border-b ${theme ? "border-white/5 bg-black/20" : "border-slate-100 bg-white"}`}
        >
          <h2 className="text-xs font-black uppercase tracking-[0.2em] text-blue-500 mb-4">
            Community Forum
          </h2>
          <form
            className="w-full max-w-2xl flex flex-col gap-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div className="relative group">
              <Input
                {...register("query", { required: true })}
                placeholder="Post a question for the community..."
                className={`w-full !rounded-2xl transition-all ${theme ? "bg-white/5 border-white/10" : "bg-slate-100 border-slate-200"}`}
              />
              {errors.query?.type == "required" && (
                <p
                  role="alert"
                  className="absolute -bottom-6 left-2 text-sm font-semibold text-red-500"
                >
                  Query is required
                </p>
              )}
            </div>

            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center gap-3 cursor-pointer group">
                <input
                  onChange={() => setShowAttatchments((prev) => !prev)}
                  type="checkbox"
                  name="files"
                  id="files"
                  className="size-5 rounded-lg accent-blue-600 cursor-pointer border-none shadow-inner"
                />
                <label
                  className="text-sm font-semibold opacity-70 group-hover:opacity-100 select-none cursor-pointer"
                  htmlFor="files"
                >
                  Add attachments?
                </label>
              </div>
              <div className="w-32">
                <Button
                  text="Submit"
                  className="w-full !rounded-xl shadow-lg shadow-blue-600/20"
                />
              </div>
            </div>

            {showAttatchments && (
              <div className="animate-in slide-in-from-top-2 duration-300">
                <Input
                  type="file"
                  {...register("file")}
                  className={`w-full !rounded-xl text-sm p-2 border-dashed border-2 ${theme ? "border-white/10" : "border-slate-200"}`}
                />
              </div>
            )}
          </form>
        </div>

        {/*
          QUERY DETAIL VIEW (Conditionally rendered when a query is selected)
        */}
        {showQueryDetail && selectedQuery && (
          <div className="p-10 absolute inset-0 bg-black/30 backdrop-blur-sm z-10 flex items-center justify-center ">
            <div className="flex">
              <QueryDetail
                query={selectedQuery.query}
                author={selectedQuery.author}
                answers={selectedQuery.answers}
              />
              <span
                className="text-red-500 translate-x-[-250%] cursor-pointer select-none hover:text-red-700 transition-colors duration-300 ease-in-out "
                onClick={() => {
                  setShowQueryDetail(false);
                }}
              >
                X
              </span>
            </div>
          </div>
        )}

        {/* QUERIES GRID (Listing for users to answer) */}
        {/* Main Container: Controls height and global scroll */}
        <div className="flex-1 overflow-y-auto p-6 lg:p-10 custom-scrollbar">
          <div className="max-w-7xl mx-auto">
            {/* Section Header */}
            <div className="mb-8">
              <h2 className="text-2xl font-black italic">Community Queries</h2>
              <p className="text-sm text-slate-500 font-medium">
                Help fellow students by answering their questions.
              </p>
            </div>

            {/* The Clean Grid: 1 col on mobile, 2 on tablet, 3 on desktop */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {queries?.map((query) => (
                <div
                  key={query.id}
                  className={`flex flex-col justify-between p-7 rounded-[2.5rem] border-2 transition-all duration-300 hover:scale-[1.02] ${
                    theme
                      ? "bg-white/5 border-white/5 hover:border-blue-500/30 shadow-2xl shadow-black/40"
                      : "bg-white border-slate-100 shadow-xl shadow-slate-200/50 hover:border-blue-200"
                  }`}
                >
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <h1 className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500">
                        Community Query
                      </h1>
                      <span className="text-[10px] opacity-40 font-bold font-mono">
                        #{query.id}
                      </span>
                    </div>
                    <h2 className="text-lg font-semibold leading-relaxed italic text-balance">
                      {query.content}
                    </h2>
                  </div>

                  <div className="space-y-4">
                    <input
                      {...register("answer")}
                      value={answer}
                      onChange={(e) => {setAnswer(e.target.value)}}
                      className={`w-full p-4 rounded-2xl border-2 text-sm outline-none transition-all ${
                        theme
                          ? "bg-black/40 border-white/5 focus:border-blue-500/50"
                          : "bg-slate-50 border-slate-100 focus:border-blue-500"
                      }`}
                      placeholder="Write an answer..."
                    />

                    <div className="flex items-center justify-between px-1">
                      <span className="text-[10px] font-bold text-slate-500 uppercase">
                        Press Enter to post
                      </span>
                      <button
                        onClick={() => {
                          setSelectedQuery({
                            query: query.content,
                            author: query.authorUsername,
                            answers: query.answer || answerQuery,

                          });
                          setShowQueryDetail(true);
                        }}
                        className="text-sm font-black text-blue-500 hover:text-blue-600 transition-colors flex items-center gap-1"
                      >
                        View Details <span>→</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
              {/* Map through your queries here or use static cards */}
              {[1].map((query) => (
                <div
                  key={query}
                  className={`flex flex-col justify-between p-7 rounded-[2.5rem] border-2 transition-all duration-300 hover:scale-[1.02] ${
                    theme
                      ? "bg-white/5 border-white/5 hover:border-blue-500/30 shadow-2xl shadow-black/40"
                      : "bg-white border-slate-100 shadow-xl shadow-slate-200/50 hover:border-blue-200"
                  }`}
                >
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <h1 className="text-[10px] font-black uppercase tracking-[0.2em] text-blue-500">
                        Community Query
                      </h1>
                      <span className="text-[10px] opacity-40 font-bold font-mono">
                        #492{query}
                      </span>
                    </div>
                    <h2 className="text-lg  font-semibold leading-relaxed italic text-balance">
                      "What is the actuality of meaning of life?"
                    </h2>
                  </div>

                  <div className="space-y-4">
                    <input
                      value={answer}
                      onChange={(e) => setAnswer(e.target.value)}
                      className={`w-full p-4 rounded-2xl border-2 text-sm outline-none transition-all ${
                        theme
                          ? "bg-black/40 border-white/5 focus:border-blue-500/50"
                          : "bg-slate-50 border-slate-100 focus:border-blue-500"
                      }`}
                      placeholder="Write an answer..."
                    />

                    <div className="flex items-center justify-between px-1">
                      <span className="text-[10px] font-bold text-slate-500 uppercase">
                        Press Enter to post
                      </span>
                      <button
                        onClick={() => {
                          setSelectedQuery({
                            query: "What is the actuality of meaning of life?",
                            author: "Socrates",
                            answers: answerQuery,
                          });
                          setShowQueryDetail(true);
                        }}
                        className="text-sm font-black text-blue-500 hover:text-blue-600 transition-colors flex items-center gap-1"
                      >
                        View Details <span>→</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* RIGHT AI SIDEBAR: Slides over the content */}
      <div
        className={`fixed inset-y-0 right-0 z-[100] transition-all duration-500 ease-in-out transform ${showAiSidebar ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Semi-transparent backdrop to close AI sidebar */}
        {showAiSidebar && (
          <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm -z-10"
            onClick={() => setShowAiSidebar(false)}
          />
        )}

        <aside
          className={`h-full lg:w-[450px] md:w-[400px] w-screen flex flex-col shadow-2xl ${theme ? "bg-[#0f0f0f] border-l border-white/10" : "bg-white border-l border-slate-200"}`}
        >
          <div className="p-6 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <BsStars className="text-blue-500" size={22} />
              <h2 className="font-black text-xl tracking-tight">
                AI Study Guide
              </h2>
            </div>
            <button
              onClick={() => setShowAiSidebar(false)}
              className="p-2 hover:bg-red-500/10 text-red-500 rounded-xl transition-colors"
            >
              <MdClose size={26} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 custom-scrollbar space-y-6">
            <div
              className={`p-5 rounded-2xl text-sm leading-relaxed border ${theme ? "bg-white/5 border-white/5 text-slate-300" : "bg-slate-50 border-slate-100 text-slate-700"}`}
            >
              👋 **Hey!** I'm your private AI assistant. Ask me anything about
              your studies, and I'll give you an instant answer without posting
              it to the community forum.
            </div>

            {/* Message section of conversation */}
            <div className="flex flex-col gap-6 py-4">
              {aiConversation &&
                aiConversation.map((convo, index) => {
                  const isAi = convo.from === "ai";

                  return (
                    <div
                      key={index}
                      className={`flex w-full ${isAi ? "justify-start" : "justify-end"} animate-in fade-in slide-in-from-bottom-2 duration-300`}
                    >
                      <div
                        className={`flex gap-3 max-w-[85%] ${isAi ? "flex-row" : "flex-row-reverse"}`}
                      >
                        {/* Avatar Icon */}
                        <div
                          className={`shrink-0 size-8 rounded-full flex items-center justify-center text-[10px] font-black shadow-sm ${
                            isAi
                              ? "bg-blue-600 text-white"
                              : theme
                                ? "bg-slate-800 text-slate-300"
                                : "bg-slate-200 text-slate-600"
                          }`}
                        >
                          {isAi ? <BsStars size={14} /> : "ME"}
                        </div>

                        {/* Message Bubble */}
                        <div className="flex flex-col">
                          <div
                            className={`px-4 py-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                              isAi
                                ? theme
                                  ? "bg-slate-900 border border-white/5 text-slate-200"
                                  : "bg-white border border-slate-200 text-slate-800"
                                : "bg-blue-600 text-white shadow-blue-500/10"
                            } ${isAi ? "rounded-tl-none" : "rounded-tr-none"}`}
                          >
                            {/* Metadata Label (Optional) */}
                            <p
                              className={`text-[10px] font-black uppercase tracking-widest mb-1 opacity-50 ${isAi ? "text-blue-400" : "text-blue-100"}`}
                            >
                              {isAi ? "AI Assistant" : "You"}
                            </p>

                            <p className="whitespace-pre-wrap">{convo.msg}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>

          {/* AI PROMPT INPUT */}
          <div className="p-6 border-t border-white/5 bg-black/20">
            <div className="relative flex flex-col gap-3">
              <textarea
                value={prompt}
                onKeyDown={(e) => {
                  if (e.key == "Enter") {
                    handlePrompt();
                  }
                }}
                onChange={(e) => {
                  e.preventDefault();
                  setPrompt(e.target.value);
                }}
                placeholder="Ask a private question to AI..."
                className={`w-full p-4 rounded-2xl pr-12 text-sm outline-none resize-none border-2 transition-all ${
                  theme
                    ? "bg-black border-white/10 focus:border-blue-500/50 text-white"
                    : "bg-white border-slate-200 focus:border-blue-500 text-black"
                }`}
                rows={4}
              />
              <button
                onClick={handlePrompt}
                className="flex items-center justify-center gap-2 w-full py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-500 transition-colors shadow-lg shadow-blue-600/20"
              >
                <IoSend size={18} />
                <span>Get Instant Answer</span>
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

export default Queries;
