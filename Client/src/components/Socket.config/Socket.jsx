import { io } from "socket.io-client";



const socket = io(import.meta.env.VITE_SOCKET_URL,{
    auth : {
        username : ''
    },
    autoConnect : false,
    reconnectionAttempts : 3,
   
})

export default socket