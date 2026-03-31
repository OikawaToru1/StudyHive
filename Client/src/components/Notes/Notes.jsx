import React, { useEffect, useState } from "react";
import UploadNotes from "./UploadNotes";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router";
import axios from "axios";
import { addFile, removeFile } from "../../store/bookmarkedSlice";
import DocViewer, {
  DocViewerRenderers,
  PDFRenderer,
  PNGRenderer,
} from "react-doc-viewer";
import file from "../../assets/test.pdf";
import { changeTheme } from "../../store/themeSlice";
import { MdTableRows } from "react-icons/md";
import report from  '../../assets/showcase.pdf'
import sijan from   '../../assets/sijan.pdf'
import Draggable,{DraggableCore} from "react-draggable";


function Notes() {
  const theme = useSelector((state) => state.theme.value);
  const username = useSelector((state) => state.auth.user.username);
  const bookedFiles = useSelector((state) => state.bookmark.values);
  // console.log("Bookmarked files", bookedFiles)
  const [files, setFiles] = useState([]);
  const [showFiles, setShowFiles] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showSideBar, setShowSideBar] = useState(true);
  const sidebarOptions = [
    { name: "DashBoard", path: "/dashboard" },
    { name: "Chat", path: "/chat" },
    { name: "Notes", path: "/notes" },
    { name: "Entertainment", path: "/games" },
    { name: "Leaderboard", path: "/leaderboard" },
    { name: "Helping Zone", path: "/help" },
  ];

  const [showFile,setShowFile] = useState({
    path : '',
    status : false
  })

  const nodeRef = React.useRef(null);
  const getFileType = (url) => {
    if (!url) return "pdf";
    const extension = url.split(".").pop().split(/\#|\?/)[0].toLowerCase();
    return extension;
  };
  

  const [docs, setDocs] = useState([
    {
      uri: "https://res.cloudinary.com/donusb91k/image/upload/f_auto,q_auto/c_fill,g_auto,h_1200,w_1200/my_file-1768028893467-902037693?_a=BAMAMiDh0",
    },
  ]);

  useEffect(() => {
    axios
      .get("/api/files")
      .then((res) => {
        setFiles(res.data);
        // const files = res.data;
        // files.map(file=> setDocs(prev=> [...prev,{uri : file.url}]))
      })
      .catch((err) => console.log(err, "error is encountered"));
  }, []);

  return (
    <div
      className={`h-screen w-full flex overflow-hidden transition-colors duration-500 ${theme ? "bg-[#0a0a0a] text-white" : "bg-white text-black"}`}
    >
      {/* SIDEBAR: Occupies full height, independent scroll */}
      {showSideBar && (
        <div
          className={`shrink-0 border-r border-gray-800/50 h-full lg:w-1/6 md:w-[200px] sm:w-3/6 w-4/6 flex flex-col ${theme ? "bg-[#0f0f0f]" : "bg-gray-50"}`}
        >
          <div className="flex-1 overflow-y-auto px-3">
            {sidebarOptions.map((option) => (
              <Link
                key={option.name}
                to={option.path}
                className="h-12 flex items-center px-4 font-bold text-xs uppercase tracking-widest rounded-xl mb-1 hover:bg-blue-600 hover:text-white transition-all"
              >
                {option.name}
              </Link>
            ))}
          </div>
        </div>
      )}

      {/* MAIN CONTENT: Strictly fits the screen */}
      <div className="flex-1 flex flex-col h-full relative overflow-hidden">
        {/* Sidebar Toggle */}
        <div
          className="absolute left-6 top-6 z-50 cursor-pointer p-2 hover:bg-blue-500/10 rounded-lg text-blue-500 transition-colors"
          onClick={() => setShowSideBar((prev) => !prev)}
        >
          <MdTableRows size={24} />
        </div>

        {/* Header & Upload Section (Fixed Area) */}
        <div className="shrink-0 pt-16 px-8 max-w-6xl w-full mx-auto">
          <div
            className={`p-6 rounded-[2rem] border-2 border-dashed ${theme ? "border-gray-800 bg-white/5" : "border-gray-200 bg-gray-50"}`}
          >
            <UploadNotes />
          </div>

          <div className="flex items-center justify-between py-6">
            <h1 className="text-sm font-black uppercase tracking-[0.4em] opacity-60">
              Library Resources
            </h1>
            <div className="h-[1px] flex-1 bg-gray-800/20 mx-6"></div>
            <span className="text-[10px] font-bold opacity-40">
              {files.length + 2} Files
            </span>
          </div>
        </div>

        {/* Overlay / Container */}
        {showFile.status && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm">
            {/* The Main Modal Div */}
            <div
              className={`relative h-[85vh] w-full max-w-5xl rounded-[2rem] overflow-hidden shadow-2xl border-2 ${theme ? "bg-[#1a1a1a] border-white/10" : "bg-white border-slate-200"}`}
            >
              {/* Top Action Bar (The "Header") */}
              <div
                className={`flex items-center justify-between px-6 py-3 border-b ${theme ? "bg-black/20 border-white/5" : "bg-slate-50 border-slate-100"}`}
              >
                <span className="text-[10px] font-black uppercase tracking-widest opacity-50">
                  Document Preview
                </span>

                {/* The X Button */}
                <button
                  onClick={() =>
                    setShowFile((prev) => ({ ...prev, status: false }))
                  } // Replace with your state setter
                  className="group flex items-center justify-center size-8 bg-red-500/10 hover:bg-red-500 rounded-xl transition-all duration-300"
                >
                  <span className="text-red-500 group-hover:text-white font-bold text-sm leading-none">
                    ✕
                  </span>
                </button>
              </div>

              {/* Iframe Section */}
              <div className="w-full h-[calc(100%-3.5rem)] bg-white">
                <iframe
                  className="h-full w-full"
                  src={showFile.path}
                  title="Document Viewer"
                ></iframe>
              </div>
            </div>
          </div>
        )}

        {/* SCROLLABLE GRID: This fills the remaining height perfectly */}
        <div className="flex-1 overflow-y-auto px-8 pb-10 custom-scrollbar">
          <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5 max-w-7xl mx-auto">
            {/* Test Card 1 */}
            <div
              className={`${theme ? "bg-white/5 border-white/5" : "bg-white border-gray-100 shadow-lg shadow-gray-200/40"} p-5 rounded-[1.5rem] border-2 flex flex-col gap-3 transition-all hover:translate-y-[-4px]`}
            >
              <div className="size-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500 font-black text-[10px]">
                PNG
              </div>
              <h1 className="font-black text-base truncate">Testing notes</h1>
              <p className="text-[11px] font-medium text-gray-500 line-clamp-2 leading-snug">
                Visual assets for testing png support.
              </p>
              <div className="flex gap-2 mt-auto pt-2">
                <button
                  onClick={() => {
                    setShowFile({
                      path: "https://res.cloudinary.com/donusb91k/image/upload/v1768192674/my_file-1768192656523-586126476.png",
                      status: true,
                    });
                    // setDocs([
                    //   {
                    //     uri: "https://res.cloudinary.com/donusb91k/image/upload/v1768192674/my_file-1768192656523-586126476.png",
                    //   },
                    // ]);
                    // setShowFiles(true);
                  }}
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-black text-[9px] uppercase tracking-widest"
                >
                  View
                </button>
                {bookedFiles.find(
                  (f) =>
                    f.url ===
                    "https://res.cloudinary.com/donusb91k/image/upload/v1768192674/my_file-1768192656523-586126476.png",
                ) ? (
                  <button
                    onClick={() =>
                      dispatch(
                        removeFile({
                          title: "Testing notes",
                          url: "https://res.cloudinary.com/donusb91k/image/upload/v1768192674/my_file-1768192656523-586126476.png",
                        }),
                      )
                    }
                    className="px-3 bg-red-600 text-white rounded-lg"
                  >
                    <svg
                      className="size-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                    </svg>
                  </button>
                ) : (
                  <button
                    onClick={() =>
                      dispatch(
                        addFile({
                          title: "Testing notes",
                          url: "https://res.cloudinary.com/donusb91k/image/upload/v1768192674/my_file-1768192656523-586126476.png",
                        }),
                      )
                    }
                    className="px-3 bg-gray-500/10 text-gray-400 rounded-lg"
                  >
                    <svg
                      className="size-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                      />
                    </svg>
                  </button>
                )}
              </div>
            </div>

            {/* Test Card 2 */}
            {/* <div className={`${theme ? "bg-white/5 border-white/5" : "bg-white border-gray-100 shadow-lg shadow-gray-200/40"} p-5 rounded-[1.5rem] border-2 flex flex-col gap-3 transition-all hover:translate-y-[-4px]`}>
          <div className="size-8 rounded-lg bg-red-500/10 flex items-center justify-center text-red-500 font-black text-[10px]">PDF</div>
          <h1 className="font-black text-base truncate">Testing Pdf file</h1>
          <p className="text-[11px] font-medium text-gray-500 line-clamp-2 leading-snug">Test PDF rendering functionality.</p>
          <div className="flex gap-2 mt-auto pt-2">
            <button onClick={() => { setDocs([{uri : report}]); setShowFiles(true); }} className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-black text-[9px] uppercase tracking-widest">View</button>
            {bookedFiles.find((f) => f.url === report) ? (

              <button onClick={() => dispatch(removeFile({title : 'Testing Pdf file', url : report}))} className="px-3 bg-red-600 text-white rounded-lg"><svg className="size-4" fill="currentColor" viewBox="0 0 20 20"><path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" /></svg></button>
            ) : (
              <button onClick={() => dispatch(addFile({title : 'Testing Pdf file', url : report}))} className="px-3 bg-gray-500/10 text-gray-400 rounded-lg"><svg className="size-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" /></svg></button>
            )}
          </div>  
        </div> */}

            <div
              className={`${theme ? "bg-white/5 border-white/5" : "bg-white border-gray-100 shadow-lg shadow-gray-200/40"} p-5 rounded-[1.5rem] border-2 flex flex-col gap-3 transition-all hover:translate-y-[-4px]`}
            >
              <div className="size-8 rounded-lg bg-red-500/10 flex items-center justify-center text-red-500 font-black text-[10px]">
                PDF
              </div>
              <h1 className="font-black text-base truncate">
                Testing Pdf file
              </h1>
              <p className="text-[11px] font-medium text-gray-500 line-clamp-2 leading-snug">
                Test PDF rendering functionality.
              </p>
              <div className="flex gap-2 mt-auto pt-2">
                <button
                  onClick={() => {
                    setShowFile({
                      path: report,
                      status: true,
                    });
                    // setDocs([
                    //   {
                    //     uri: report,
                    //     fileType: getFileType(report),
                    //     fileName: "Testing PDF",
                    //   },
                    // ]);
                    // setShowFiles(true);
                  }}
                  className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-black text-[9px] uppercase tracking-widest"
                >
                  View
                </button>
                {/* ... bookmark logic ... */}
              </div>
            </div>

            {/* Dynamic Mapping */}
            {files.map((file, index) => (
              <div
                key={index}
                className={`${theme ? "bg-white/5 border-white/5" : "bg-white border-gray-100 shadow-lg shadow-gray-200/40"} p-5 rounded-[1.5rem] border-2 flex flex-col gap-3 transition-all hover:translate-y-[-4px]`}
              >
                <div className=" flex justify-between">
                  <div className="size-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500 font-black text-[9px] uppercase">
                    DOC
                  </div>
                  <div className=" rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500 font-black text-[9px] uppercase">
                    {file.creator == username ? (
                      <span
                        onClick={() => {
                          alert("delete");
                        }}
                      >
                        Delete
                      </span>
                    ) : (
                      ""
                    )}
                  </div>
                </div>

                <h1 className="font-black text-base truncate">{file.title}</h1>
                <p className="text-[11px] font-medium text-gray-500 line-clamp-2 leading-snug">
                  {file.description || "Knowledge item."}
                </p>
                <div className="flex gap-2 mt-auto pt-2">
                  <button
                    onClick={() => {
                      // setDocs([{ uri: file.url }]);
                      // setShowFiles(true);
                      setShowFile({
                        path: file.url,
                        status: true,
                      });
                    }}
                    className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-black text-[9px] uppercase tracking-widest"
                  >
                    View
                  </button>
                  {bookedFiles.find((f) => f.url === file.url) ? (
                    <button
                      onClick={() => dispatch(removeFile(file))}
                      className="px-3 bg-red-600 text-white rounded-lg"
                    >
                      <svg
                        className="size-4"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                      </svg>
                    </button>
                  ) : (
                    <button
                      onClick={() => dispatch(addFile(file))}
                      className="px-3 bg-gray-500/10 text-gray-400 rounded-lg"
                    >
                      <svg
                        className="size-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
                        />
                      </svg>
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Fullscreen Doc Viewer (For demonstration, can be removed) */}
        {/* <div className="w-2/3">
      <iframe className="h-screen absolute  w-full " src= {sijan} frameborder="0"></iframe>
    </div> */}

        {/* Doc Viewer Modal Overlay */}
        {showFiles && (
          <div
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm flex items-center justify-center p-6"
            onClick={() => setShowFiles(false)}
          >
            <div
              className="w-full h-full max-w-5xl bg-white rounded-[2rem] overflow-hidden shadow-2xl relative flex flex-col"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="h-12 flex justify-between items-center px-6 border-b border-gray-100 bg-white">
                <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">
                  Preview
                </span>
                <button
                  onClick={() => setShowFiles(false)}
                  className="size-7 bg-red-500 text-white rounded-full flex items-center justify-center font-bold"
                >
                  ✕
                </button>
              </div>
              <div className="flex-1">
                <DocViewer
                  documents={docs}
                  pluginRenderers={DocViewerRenderers}
                  style={{ height: "100%", width: "100%" }}
                  config={{ header: { disableHeader: true } }}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Notes;
