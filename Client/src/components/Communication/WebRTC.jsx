import React from "react";
import socket from "../Socket.config/Socket";
import { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { addUser } from "../../store/authSlice";
import { FaImage } from "react-icons/fa6";
import { IoIosAddCircle } from "react-icons/io";
import image from "../../assets/computer.jpg";
import cat from "../../assets/desk.jpg";
import { MdOutlineVideoCall } from "react-icons/md";
import { IoIosInformationCircleOutline } from "react-icons/io";
import { Link } from "react-router";
import { authSlice } from "../../store/authSlice";
import { removeUser } from "../../store/authSlice";
import { SlOptionsVertical } from "react-icons/sl";
import { changeTheme, themeSlice } from "../../store/themeSlice";
import Draggable, { DraggableCore } from "react-draggable";

//Peerjs
import Peer from "peerjs";

function WebRTC() {
  const theme = useSelector((state) => state.theme.value);
  const username = useSelector((state) => state.auth.user.username);
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const dispatch = useDispatch();
  const [inputFeild, setInputFeild] = useState("");
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState("");
  const [senderEvent, setSenderEvent] = useState("");
  const scrollBottom = useRef(null);
  const [activeUsers, setActiveUsers] = useState([]);
  const [infoPopUp, setInfoPopUp] = useState(false);
  const [findUser, setFindUser] = useState("");
  const [display, setDisplay] = useState(["Js testing"]);
  const [name, setname] = useState("");
  const [showOptions, setShowOptions] = useState(false);
  const [messageRecived, setMessageReceived] = useState({ from: "", count: 0 });
  const [showCallWindow, setShowCallWindow] = useState(false);
  const [showUserInfo, setShowUserInfo] = useState(false)

  // For peerjs implementation ...
  const videoCallRef = useRef(null);
  const [peerId, setPeerId] = useState("");
  const [remotePeerIdValue, setRemotePeerIdValue] = useState("");
  const remoteVideoRef = useRef(null);
  const currentUserVideoRef = useRef(null);
  const peerInstance = useRef(null);

  const activeCallRef = useRef(null);
  const localStreamRef = useRef(null);

  const [calling, setCalling] = useState({ status: false, receiver: "" });
  const [callReceived, setCallReceived] = useState({
    status: false,
    caller: "",
  });
  const [callAccepted, setCallAccepted] = useState(false);
  const [callEnded, setCallEnded] = useState(false);

  useEffect(() => {
    function connected() {
      console.log("Socket Connection", socket.id, socket.auth.username);
    }

    function disconnected() {
      console.log("Socket disconnected");
    }

    socket.auth = { username: username };
    socket.connect();

    socket.on("connect", connected);
    socket.on("disconnect", disconnected);

    return () => {
      socket.disconnect();
      socket.off("connect", connected);
      socket.off("disconnect", disconnected);
    };
  }, []);

  useEffect(() => {
    const peer = new Peer();

    peer.on("open", (id) => {
      setPeerId(id);
    });

    peer.on("call", (call) => {
      var getUserMedia =
        navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia;

      getUserMedia({ video: true, audio: true }, (mediaStream) => {
        localStreamRef.current = mediaStream;
        currentUserVideoRef.current.srcObject = mediaStream;
        currentUserVideoRef.current.play();
        call.answer(mediaStream);
        activeCallRef.current = call;
        call.on("stream", function (remoteStream) {
          remoteVideoRef.current.srcObject = remoteStream;
          remoteVideoRef.current.play();
        });

        call.on("close", () => {
          endVideoCall();
        });
      });
    });
    peerInstance.current = peer;

    // axios.get('/api/auth/me')
    //   .then(res=> {
    //   console.log('Auth state', res.data)
    //   if(!username)
    //   {
    //       dispatch(addUser({username: res.data.username}))
    //   }
    //   })
    //   .catch(err=> {console.log('err in authenticated me', err)})

    // socket.emit('callback',"testing",(cb)=>{
    //   if(cb)
    //   {
    //     console.log("YOur dont suck", cb.response)
    //   }
    //   else{
    //     console.log('sckie')
    //   }
    // })

    scrollBottom.current?.scrollIntoView({ behavior: "smooth" });

    socket.on("users", (data) => {
      console.log(data, "users data");
      setUsers(data);
      const listenings = data.map((user) => `${user.username}-${username}`);
      // console.log("You're listening to following Events", listenings);

      listenings.map((event) => {
        if (event) {
          socket.on(event, (data, sender) => {
            console.log(
              "event occurred",
              event,
              "from ",
              sender,
              "Message is ",
              data,
            );
            setMessages((prev) => [
              ...prev,
              {
                from: sender,
                message: data,
              },
            ]);
            setMessageReceived((prev) => ({
              ...prev,
              from: sender,
              count: prev.count + 1,
            }));
            // setMessages(prev=> [data, ...prev])
          });
        }
      });
    });

    {
      username &&
        socket.on(`calling-${username}`, (caller) => {
          console.log("receiving a call from ", caller, "to", username);
          setCallReceived({ status: true, caller: caller });
        });
    }

    socket.on(`${username}-call-succesfull`, (remotePeerId) => {
      console.log("Call accepted");
      setCalling((prev) => ({ ...prev, status: false }));
      setRemotePeerIdValue(remotePeerId);
      var getUserMedia =
        navigator.getUserMedia ||
        navigator.webkitGetUserMedia ||
        navigator.mozGetUserMedia;
      getUserMedia({ video: true, audio: true }, (mediaStream) => {
        localStreamRef.current = mediaStream;
        currentUserVideoRef.current.srcObject = mediaStream;
        currentUserVideoRef.current.play();

        const call = peerInstance.current.call(remotePeerId, mediaStream);
        activeCallRef.current = call;
        call.on("stream", (remoteStream) => {
          remoteVideoRef.current.srcObject = remoteStream;
          remoteVideoRef.current.play();
        });

        call.on("close", () => {
          endVideoCall();
        });
      });
    });
    // call-end message
    socket.on(`${username}-call-ended`, (from) => {
      alert("call ended");
    });

    return () => {
      socket.off("users");
      socket.off(`${username}-call-succesfull`);
      socket.off(`calling-${username}`);
      peer.destroy();
    };
  }, [username]);

  const handleDisconnect = () => {
    axios
      .get("/api/auth/logout")
      .then((res) => {
        socket.disconnect();
        dispatch(removeUser());
        navigate("/");
      })
      .catch((err) => console.log(err));
    socket.disconnect();
    dispatch(removeUser());
    navigate("/login");
  };

  const handleTheme = () => {
    dispatch(changeTheme(!theme));
  };

  const userList = (user) => {
    const onlineUsers = activeUsers.map((user) => user.username);

    const isOnline = onlineUsers.includes(user.username);

    return (
      <div
        onClick={(e) => {
          e.preventDefault();
          setMessageReceived({ from: "", count: 0 });
          console.log("Im being touched ", user);
          setCurrentUser(user.username);
          const newEvent = username + "-" + user.username;
          console.log("event generated dynamically", newEvent);
          setSenderEvent(newEvent);
          socket.emit("user-connect", username, user.username);
        }}
        className="flex  justify-between items-center border-1 border-gray-300 rounded-md text-2xl p-2 m-2 hover:cursor-pointer"
      >
        <p>
          {user.username} {user.username == username ? "(You)" : ""}
        </p>
        {/* <span>{isOnline ? <div className='bg-green-600 h-4 w-4 rounded-full '></div> : <div className='bg-red-700 h-4 w-4 rounded-full '></div>}</span> */}
        {messageRecived.from == user.username ? (
          <div className="bg-red-600 rounded-full px-1 ">
            {messageRecived.count}
          </div>
        ) : (
          ""
        )}
      </div>
    );
  };

  const foundUser = (user) => {
    return (
      <div
        className={`${theme ? "bg-black text-white" : "text-black bg-white"}  text-black hover:text-white p-4 border-b-1 border-gray-400`}
      >
        {user.username}
      </div>
    );
  };
  const userInfo = () => {
    setShowUserInfo(true)
    const nextPopUpStatus = !infoPopUp;
    setInfoPopUp(nextPopUpStatus);
  };
  const newMessage = (message) => {
    console.log(message);
    if (message) {
      return message.from == username ? (
        <div
          key={message.messageId}
          className="ml-auto bg-gray-200 text-black rounded-md text-xl p-2 m-2"
        >{` ${message.message} : ${message.from} `}</div>
      ) : (
        <div
          key={message.messageId}
          className="mr-auto bg-amber-100 text-black rounded-md text-xl p-2 m-2"
        >{`${message.from} : ${message.message}`}</div>
      );
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setInfoPopUp((prev) => !prev);
    console.log(findUser);
    setFindUser("");
  };

  const sendMessage = (e) => {
    socket.emit("senderReady", "Client ready to send");
    if (inputFeild != "") {
      console.log("sending...", inputFeild);
      socket.emit(senderEvent, inputFeild, username);
      setMessages((prev) => [
        ...prev,
        {
          from: `${username}`,
          message: inputFeild,
        },
      ]);
      setInputFeild("");
    }
  };

  const createGroup = () => {
    socket.emit("create-group", "Group created successfully");
    alert("Group created successfully");
  };

  const joinGroup = (roomName) => {
    socket.emit("join room", roomName);
    alert("Joined room : " + roomName);
  };

  const leaveGroup = (roomName) => {
    socket.emit("leave room", roomName);
    alert("Left room : " + roomName);
  };

  const sendRoomMessage = (roomName, message) => {
    socket.emit("room message", roomName, message, username);
    alert("Message sent to room : " + roomName);
  };

  const videoCall = () => {
    setShowCallWindow(true);
    setCalling({ status: true, receiver: currentUser });
    console.log("calling", currentUser);
    socket.emit("call-processing", { caller: username, receiver: currentUser });
  };

  const endVideoCall = () => {
    setCallEnded(true);
    console.log("Ending call...");

    if (localStreamRef.current) {
      localStreamRef.current.getTracks().forEach((track) => track.stop());
      localStreamRef.current = null;
    }

    // close PeerJS call
    if (activeCallRef.current) {
      activeCallRef.current.close();
      activeCallRef.current = null;
    }

    // clear video refs safely
    if (currentUserVideoRef.current)
      currentUserVideoRef.current.srcObject = null;
    if (remoteVideoRef.current) remoteVideoRef.current.srcObject = null;

    // reset your UI state
    setCalling({ status: false, receiver: "" });
    setCallReceived({ status: false, caller: "" });
    setShowCallWindow(false);

    socket.on("end-call", {
      from: username,
      to: currentUser,
    });
  };

  return (
    <div
      className={`${theme ? "bg-black text-white" : "text-black bg-white"} select-none h-screen w-screen overflow-hidden`}
    >
      {showCallWindow && (
        // <Draggable nodeRef={videoCallRef}>
        //   <div
        //     className=" h-3/4 w-2/3  bg-slate-400 border-white text-black border absolute"
        //     ref={videoCallRef}
        //   >
        //     <div className="flex absolute right-2 w-10 justify-between cursor-pointer">
        //       <span className="font-medium text-md hover:text-lg hover:text-red-500">
        //         []
        //       </span>
        //       <span
        //         className="font-medium text-md hover:text-lg hover:text-red-500"
        //         onClick={() => {
        //           setShowCallWindow(false);
        //         }}
        //       >
        //         X
        //       </span>
        //     </div>

        //     <div className="h-full w-full flex  ">
        //       {calling.status && <div className='absolute text-2xl top-1/3 right-1/2 translate-x-[50%] '>Calling ${calling.receiver}</div>}

        //       <div
        //         className={` w-full h-full flex justify-center items-center`}
        //       >
        //         <div>
        //           <video ref={currentUserVideoRef} />
        //         </div>

        //         <div>
        //           <video ref={remoteVideoRef} />
        //         </div>
        //         <div className="absolute bottom-4 right-1/2">
        //           <button
        //             className="bg-red-500 px-2 py-1"
        //             onClick={endVideoCall}
        //           >
        //             End call
        //           </button>
        //         </div>
        //       </div>
        //     </div>
        //   </div>
        // </Draggable>
        <Draggable nodeRef={videoCallRef}>
          <div
            ref={videoCallRef}
            className={`absolute h-3/4 w-2/3 border shadow-2xl flex flex-col overflow-hidden rounded-xl transition-all duration-300
      ${
        theme
          ? "bg-zinc-900 border-zinc-700 text-zinc-100"
          : "bg-slate-50 border-slate-300 text-slate-900"
      }`}
          >
            {/* Header Controls */}
            <div className="flex justify-end p-3 gap-4 z-30">
              <button className="opacity-60 hover:opacity-100 transition-transform hover:scale-110">
                <span className="text-sm font-bold">[ ]</span>
              </button>
              <button
                className="font-bold text-lg hover:text-red-500 transition-colors"
                onClick={() => setShowCallWindow(false)}
              >
                ✕
              </button>
            </div>

            {/* Main Content Area */}
            <div className="relative flex-1 flex flex-col">
              {/* "Calling" Overlay - High Visibility Design */}
              {calling.status && (
                <div className="absolute inset-0 flex flex-col items-center justify-center z-20 pointer-events-none">
                  <div
                    className={`px-8 py-4 rounded-2xl shadow-2xl border backdrop-blur-md animate-pulse
            ${
              theme
                ? "bg-zinc-800/80 border-zinc-600 text-white"
                : "bg-white/90 border-slate-200 text-slate-800"
            }`}
                  >
                    <p className="text-2xl font-bold tracking-tight">
                      Calling {calling.receiver}...
                    </p>
                  </div>
                </div>
              )}

              {/* Video Streams Container */}
              <div className="flex-1 flex gap-3 p-4">
                {/* User Video */}
                <div
                  className={`flex-1 rounded-lg overflow-hidden bg-black ring-1 ${theme ? "ring-zinc-700" : "ring-slate-300"} relative`}
                >
                  <video
                    ref={currentUserVideoRef}
                    className="w-full h-full object-cover scale-x-[-1]"
                    autoPlay
                    muted
                  />
                  <div className="absolute bottom-2 left-2 text-[10px] uppercase tracking-widest opacity-50 px-2 bg-black/40 text-white rounded">
                    You
                  </div>
                </div>

                {/* Remote Video */}
                <div
                  className={`flex-1 rounded-lg overflow-hidden bg-black ring-1 ${theme ? "ring-zinc-700" : "ring-slate-300"} relative`}
                >
                  <video
                    ref={remoteVideoRef}
                    className="w-full h-full object-cover"
                    autoPlay
                  />
                  <div className="absolute bottom-2 left-2 text-[10px] uppercase tracking-widest opacity-50 px-2 bg-black/40 text-white rounded">
                    Remote
                  </div>
                </div>
              </div>

              {/* Footer / End Call Action */}
              <div className="h-24 flex items-center justify-center z-30">
                <button
                  className="group relative flex items-center justify-center w-14 h-14 bg-red-500 hover:bg-red-600 rounded-full transition-all shadow-lg hover:shadow-red-500/40 transform hover:-translate-y-1"
                  onClick={endVideoCall}
                  title="End Video Call"
                >
                  {/* A simple phone-down icon representation */}
                  <svg
                    className="w-6 h-6 text-white rotate-[135deg]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.5"
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </Draggable>
      )}

      {/* Call ended message */}

      {callEnded && (
        // <div
        //   onClick={() => {
        //     setCallEnded(false);
        //   }}
        //   className={`${!theme ? "bg-gray-800 text-white" : "bg-slate-200 text-black"}  rounded-md h-50 w-80 flex justify-center items-center absolute top-1/3 right-1/2 translate-x-[50%]`}
        // >
        //   <span className="absolute top-0 right-2 text-red-600 cursor-pointer">
        //     X
        //   </span>
        //   Call ended !!!
        // </div>
        <div
          onClick={() => setCallEnded(false)}
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
    w-80 p-8 rounded-2xl shadow-2xl border transition-all duration-300 cursor-pointer scale-100 hover:scale-[1.02]
    flex flex-col items-center justify-center gap-4 z-50
    ${
      theme
        ? "bg-zinc-900 border-zinc-700 text-zinc-100"
        : "bg-slate-50 border-slate-200 text-slate-800"
    }`}
        >
          {/* Close Icon Container */}
          <button
            className="absolute top-3 right-4 text-zinc-500 hover:text-red-500 transition-colors font-bold text-lg"
            aria-label="Close"
            onClick={endVideoCall}
          >
            ✕
          </button>

          {/* Status Icon (Optional but adds polish) */}
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center mb-2
    ${theme ? "bg-zinc-800" : "bg-slate-200"}`}
          >
            <svg
              className="w-6 h-6 opacity-60"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>

          <h3 className="text-xl font-bold tracking-tight">Call Ended</h3>

          <p className="text-sm opacity-60 text-center">
            Click anywhere to dismiss
          </p>
        </div>
      )}

      {/*Calling portal*/}

      {/* User information portal */}

      {showUserInfo && (
        <div className="absolute inset-0 z-[100] flex items-center justify-center backdrop-blur-sm bg-black/20">
          <div
            className={`w-80 p-8 rounded-3xl shadow-2xl border transition-all transform scale-100 animate-in fade-in zoom-in duration-200
        ${
          theme
            ? "bg-zinc-900 border-zinc-800 text-white"
            : "bg-white border-gray-200 text-gray-900"
        }`}
          >
            {/* Header with Close Button */}
            <div className="flex justify-end mb-2">
              <button
                onClick={() => setShowUserInfo(false)}
                className="opacity-50 hover:opacity-100 transition-opacity p-1"
              >
                ✕
              </button>
            </div>

            {/* Profile Content */}
            <div className="flex flex-col items-center text-center">
              <div
                className={`size-20 rounded-full mb-4 flex items-center justify-center text-3xl font-bold shadow-inner
          ${theme ? "bg-zinc-800 text-blue-400" : "bg-blue-50 text-blue-600"}`}
              >
                {username?.charAt(0).toUpperCase()}
              </div>

              <h1 className="text-2xl font-bold tracking-tight mb-1">
                {username}
              </h1>

              <div
                className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium mb-6
          ${theme ? "bg-zinc-800 text-zinc-400" : "bg-gray-100 text-gray-500"}`}
              >
                <span className="size-2 rounded-full bg-emerald-500"></span>
                Active Member
              </div>

              <div
                className={`w-full py-4 border-t ${theme ? "border-zinc-800" : "border-gray-100"}`}
              >
                <p className="text-xs uppercase tracking-widest opacity-50 mb-1">
                  Joined
                </p>
                <p className="text-base font-semibold">February 2026</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {callReceived.status && (
        // <div className="absolute h-[200px] w-[300px] bg-white text-black flex flex-col justify-around items-center top-1/3 right-1/2 translate-x-[50%]">
        //   <h1 className="text-2xl">{callReceived.caller} calling...</h1>
        //   <div className="flex w-full justify-around">
        //     <button
        //       className="border py-1 px-2 bg-blue-400"
        //       onClick={(e) => {
        //         e.preventDefault();
        //         console.log(`${callReceived.caller} call is accepted`);
        //         socket.emit("calling-accepted", peerId, callReceived.caller);
        //         // setCallReceived({status: false, caller : ''})
        //         setCallReceived({ status: false, caller: "" });
        //         setCalling({ status: false, receiver: "" });
        //         setShowCallWindow(true);
        //       }}
        //     >
        //       {" "}
        //       Accept
        //     </button>
        //     <button
        //       className="border py-1 px-2 bg-red-400"
        //       onClick={() => {
        //         setCallReceived({ status: false, caller: "" });
        //         alert("Called rejected");
        //       }}
        //     >
        //       Reject
        //     </button>
        //   </div>
        // </div>
        <div
          className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 
    w-[340px] p-6 rounded-2xl shadow-2xl border transition-all duration-300 z-[60]
    flex flex-col items-center gap-6
    ${
      theme
        ? "bg-zinc-900 border-zinc-700 text-zinc-100"
        : "bg-white border-slate-200 text-slate-900"
    }`}
        >
          {/* Caller Identity Section */}
          <div className="flex flex-col items-center gap-3">
            <div
              className={`w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold shadow-inner
      ${theme ? "bg-zinc-800 text-blue-400" : "bg-slate-100 text-blue-600"}`}
            >
              {callReceived.caller.charAt(0).toUpperCase()}
            </div>
            <div className="text-center">
              <h1 className="text-xl font-bold tracking-tight">
                {callReceived.caller}
              </h1>
              <p
                className={`text-sm animate-pulse ${theme ? "text-zinc-400" : "text-slate-500"}`}
              >
                Incoming Video Call...
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex w-full gap-3">
            <button
              className="flex-1 bg-red-500 hover:bg-red-600 text-white font-semibold py-3 rounded-xl transition-all active:scale-95 shadow-lg shadow-red-500/20"
              onClick={() => {
                setCallReceived({ status: false, caller: "" });
                // Consider a toast notification instead of a browser alert for better UX
                console.log("Call rejected");
              }}
            >
              Reject
            </button>

            <button
              className="flex-1 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 rounded-xl transition-all active:scale-95 shadow-lg shadow-emerald-500/20 animate-bounce-subtle"
              onClick={(e) => {
                e.preventDefault();
                socket.emit("calling-accepted", peerId, callReceived.caller);
                setCallReceived({ status: false, caller: "" });
                setCalling({ status: false, receiver: "" });
                setShowCallWindow(true);
              }}
            >
              Accept
            </button>
          </div>
        </div>
      )}

      <div
        className={`${theme ? "bg-black text-white" : "text-black bg-white"} flex justify-between mx-5 py-5 h-[11vh] border-b-1 border-gray-300  `}
      >
        <div
          className={`${theme ? "bg-black text-white" : "text-black bg-white"} text-center font-bold font-mono text-3xl top-0 flex justify-between w-80`}
        >
          <Link to="/" className="hover:cursor-pointer hover:text-blue-500">
            Chat App
          </Link>
          <div className="relative">
            <SlOptionsVertical
              onClick={() => {
                setShowOptions((prev) => !prev);
              }}
              size={30}
              className="hover:cursor-pointer hover:opacity-50"
            />
            {/* { showOptions && (
              <div
                className={`${theme ? "bg-black text-white" : "text-black bg-white"} w-60 absolute top-8 right-0  border-1 border-gray-300 rounded-md p-3`}
              >
                <p
                  className="hover:cursor-pointer hover:text-blue-500 text-lg  p-2"
                  onClick={createGroup}
                >
                  Create group (Comming Soon)
                </p>
                <p className="hover:cursor-pointer hover:text-blue-500 text-lg  p-2">
                  Profile
                </p>
                <p
                  className="hover:cursor-pointer hover:text-blue-500 text-lg  p-2"
                  onClick={handleTheme}
                >
                  Theme
                </p>
                <p
                  className="hover:cursor-pointer hover:text-red-500 text-lg  p-2"
                  onClick={handleDisconnect}
                >
                  Logout
                </p>
              </div>
            )} */}
            {showOptions && (
              <div
                className={`absolute top-10 right-0 w-64 rounded-xl shadow-xl border z-50 overflow-hidden transition-all duration-200 
      ${
        theme
          ? "bg-[#1f1f1f] border-zinc-700 text-zinc-100"
          : "bg-white border-gray-200 text-gray-800"
      }`}
              >
                <div className="flex flex-col p-1">
                  <button
                    className={`flex flex-col items-start p-3 rounded-lg transition-colors text-left
          ${theme ? "hover:bg-zinc-800" : "hover:bg-gray-100"}`}
                    onClick={createGroup}
                  >
                    <span className="text-base font-semibold">
                      Create group
                    </span>
                    <span className="text-[11px] opacity-50 uppercase tracking-wider">
                      Coming Soon
                    </span>
                  </button>

                  <button
                    className={`p-3 text-base font-medium rounded-lg text-left transition-colors
          ${theme ? "hover:bg-zinc-800" : "hover:bg-gray-100"}`}
                  >
                    Profile
                  </button>

                  <button
                    className={`p-3 text-base font-medium rounded-lg text-left transition-colors
          ${theme ? "hover:bg-zinc-800" : "hover:bg-gray-100"}`}
                    onClick={handleTheme}
                  >
                    Change Theme
                  </button>

                  <div
                    className={`h-px my-1 ${theme ? "bg-zinc-800" : "bg-gray-100"}`}
                  />

                  <button
                    className={`p-3 text-base font-semibold rounded-lg text-left transition-colors text-red-500
          ${theme ? "hover:bg-red-500/10" : "hover:bg-red-50"}`}
                    onClick={handleDisconnect}
                  >
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* <div
          className={`${theme ? "bg-black text-white" : "text-black bg-white"} w-1/6 flex justify-around `}
        >
          <div className="rounded-full">
            <img
              className="mb-1 size-12 bg-red-50 border-1 border-blue-200 rounded-full hover:bg-black hover:cursor-pointer hover:p-2"
              src={cat}
              alt=""
            />
            {username ? (
              <p className="hover:font-bold font-mono  select-none text-center">
                {username}
              </p>
            ) : (
              ""
            )}
          </div>

          <button
            onClick={handleDisconnect}
            className="bg-red-600 font-bold px-2 py-1 rounded-md hover:cursor-pointer  hover:text-white select-none"
          >
            Logout
          </button>
        </div> */}

        <div className="flex items-center gap-6 pr-4">
          {/* User Info Group */}
          <div className="flex items-center gap-3 group">
            <div className="flex flex-col items-end justify-center">
              {username && (
                <span
                  className={`text-lg font-bold tracking-tight select-none ${theme ? "text-zinc-100" : "text-slate-700"}`}
                >
                  {username}
                </span>
              )}
            </div>

            <div className="relative">
              <img
                className={`size-11 rounded-full object-cover border-2 transition-all duration-300 shadow-sm
          ${
            theme
              ? "border-zinc-700 bg-zinc-800 hover:border-blue-500"
              : "border-blue-100 bg-slate-50 hover:border-blue-400"
          }`}
                src={cat}
                alt="User Profile"
              />
              {/* Small green online indicator dot */}
              <div className="absolute bottom-0 right-0 size-3 bg-emerald-500 border-2 border-white rounded-full"></div>
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleDisconnect}
            className="px-4 py-2 text-sm font-bold text-white bg-red-500 hover:bg-red-600 rounded-lg transition-all active:scale-95 shadow-md shadow-red-500/20"
          >
            Logout
          </button>
        </div>
      </div>

      <div
        className={`${theme ? "bg-black text-white" : "text-black bg-white"} flex justify w-full h-[90vh]  pb-3 `}
      >
        <div
          className={`${theme ? "bg-black text-white" : "text-black bg-white"} w-1/4 md:block  border-r-1 border-gray-300 p-3`}
        >
          <div
            className={`${theme ? "bg-black text-white" : "text-black bg-white"} flex-col items-center justify-start `}
          >
            {/* <div
              className={`${theme ? "bg-black text-white" : "text-black bg-white"} w-full flex flex-col md:items-center md:flex-row`}
            >
              <input
                value={""}
                onKeyDown={(e) => {
                  e.preventDefault();
                  if (e.key === "Enter") {
                    setInfoPopUp((prev) => !prev);
                    handleSearch();
                  }
                }}
                onChange={(e) => {
                  e.preventDefault();
                  setFindUser(e.target.value);
                }}
                className={`${theme ? "bg-black text-white" : "text-black bg-white"} border-2 border-gray-300  w-3/4 mx-2 text-center mt-2  rounded-xl md:box-border box-content py-4 font-bold `}
                type="text"
                placeholder="Search Users"
              />
              <button
                onClick={handleSearch}
                className="hover:bg-black font-bold hover:text-white hover:cursor-pointer text-gray-500 rounded-md mx-auto border-1 border-gray-300 h-[50px] w-[80px] "
              >
                Search
              </button>
            </div> */}

            <div className="px-4 py-3">
              <div
                className={`flex items-center p-1 rounded-xl border-2 transition-all duration-200
      ${
        theme
          ? "bg-zinc-900 border-zinc-800 focus-within:border-blue-500"
          : "bg-gray-50 border-gray-200 focus-within:border-blue-400"
      }`}
              >
                <input
                  value={findUser} // Fixed: used the state variable instead of empty string
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setInfoPopUp((prev) => !prev);
                      handleSearch();
                    }
                  }}
                  onChange={(e) => setFindUser(e.target.value)}
                  className={`flex-1 bg-transparent px-4 py-2.5 outline-none text-base font-medium
        ${theme ? "text-white placeholder-zinc-500" : "text-gray-800 placeholder-gray-400"}`}
                  type="text"
                  placeholder="Search users..."
                />

                <button
                  onClick={handleSearch}
                  className={`px-5 py-2 rounded-lg font-bold text-sm transition-all active:scale-95
        ${
          theme
            ? "bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white"
            : "bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-700 border border-gray-200 shadow-sm"
        }`}
                >
                  Search
                </button>
              </div>
            </div>

            {infoPopUp && (
              <div
                className={`${theme ? "bg-black text-white" : "text-black bg-white"} absolute flexh-50 w-1/6 font-bold mt-1 border-gray-300 p-5 border-1 mx-2 rounded-md `}
              >
                <div
                  className={`${theme ? "bg-black text-white" : "text-black bg-white"} flex justify-between`}
                >
                  <p className=" select-none ">List of Users :</p>
                  <p
                    className="font-bold hover:text-red-700 select-none hover:cursor-pointer"
                    onClick={() => setInfoPopUp((prev) => !prev)}
                  >
                    X
                  </p>
                </div>
                <div>
                  {users ? (
                    <div
                      className={`${theme ? "bg-black text-white" : "text-black bg-white"} rounded-md m-6 flex-nowrap overflow-scroll`}
                    >
                      <ul
                        className={`${theme ? "bg-black text-white" : "bg-slate-50 text-black"} flex flex-col `}
                      >
                        {users.map((user) => (
                          <li key={user.username} className="my-1">
                            {foundUser(user)}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>
            )}
          </div>

          <div
            className={`${theme ? "bg-black text-white" : "text-black bg-white"} overflow-scroll mt-4 `}
          >
            <div className="flex-1 flex flex-col min-h-0">
              {users ? (
                <div
                  className={`flex-1 overflow-y-auto overflow-x-hidden transition-colors duration-300
        ${theme ? "bg-transparent text-white" : "bg-transparent text-gray-800"}`}
                >
                  <ul className="flex flex-col px-3 py-2">
                    {users.map((user) => (
                      <li
                        key={user.username}
                        className={`group rounded-xl transition-all duration-200 mb-1
              ${
                theme
                  ? "hover:bg-zinc-900/80 active:bg-zinc-800"
                  : "hover:bg-gray-100 active:bg-gray-200"
              }`}
                      >
                        {userList(user)}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <div className="flex-1 flex items-center justify-center opacity-30 italic text-sm">
                  No contacts available
                </div>
              )}
            </div>
          </div>
        </div>

        <div
          className={`${theme ? "bg-black text-white" : "text-black bg-white"} flex-col w-2/3`}
        >
          {currentUser ? (
            <div
              className={`flex flex-col h-full w-full transition-colors duration-300 ${theme ? "bg-[#0a0a0a] text-white" : "bg-white text-gray-900"}`}
            >
              {/* Chat Header */}
              <div
                className={`flex justify-between items-center h-20 px-6 border-b ${theme ? "border-zinc-800" : "border-gray-200"}`}
              >
                <h1 className="text-2xl font-bold tracking-tight">
                  {currentUser}
                </h1>

                <div className="flex items-center gap-2">
                  <MdOutlineVideoCall
                    onClick={videoCall}
                    size={38}
                    className="cursor-pointer hover:text-blue-500 transition-colors p-1"
                  />
                  <IoIosInformationCircleOutline
                    onClick={userInfo}
                    size={30}
                    className="cursor-pointer opacity-50 hover:opacity-100 transition-opacity p-1"
                  />
                </div>
              </div>

              {/* Messages Box */}
              <div className="flex-1 overflow-y-auto px-6 py-4 custom-scrollbar">
                <ul className="flex flex-col gap-4">
                  {messages.map((message) => newMessage(message))}
                </ul>
                <div ref={scrollBottom}></div>
              </div>

              {/* Input Area */}
              <div
                className={`p-4 border-t ${theme ? "border-zinc-800 bg-[#0a0a0a]" : "border-gray-200 bg-gray-50"}`}
              >
                <div className="max-w-5xl mx-auto flex items-center gap-3">
                  <div className="flex items-center gap-2 opacity-60">
                    {/* Add send images later */}
                    
                    {/* <FaImage
                      className="cursor-pointer hover:text-blue-500 hover:scale-110 transition-all"
                      onClick={() => {}}
                      size={26}
                    /> */}
                  </div>

                  <input
                    onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                    onInput={(e) => {
                      e.preventDefault();
                      setInputFeild(e.target.value);
                    }}
                    value={inputFeild}
                    placeholder="Type your message..."
                    className={`flex-1 px-4 py-3 rounded-xl border-2 transition-all outline-none font-medium
            ${
              theme
                ? "bg-zinc-900 border-zinc-700 text-white placeholder-zinc-500 focus:border-blue-500"
                : "bg-white border-gray-200 text-gray-900 placeholder-gray-400 focus:border-blue-400"
            }`}
                    type="text"
                  />

                  <button
                    onClick={sendMessage}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-xl transition-all active:scale-95 shadow-lg shadow-blue-500/20 shrink-0"
                  >
                    Send
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 absolute right-1/3 top-1/3 flex items-center justify-center opacity-20">
              <p className="text-xl font-medium tracking-widest uppercase">
                Select a chat to begin
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default WebRTC;
