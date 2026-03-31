import { useState, useRef, useEffect } from 'react'
import useSound from 'use-sound';
import camerasound from '../../assets/camera-shutter-314056.mp3' 
import { useNavigate } from 'react-router';



function WebCam() {
    const [play] = useSound(camerasound);
    let videoRef = useRef(null);
    let photoRef = useRef(null);
    let stripRef = useRef(null)
    const navigate = useNavigate();


        const allow = ()=>{
            navigator.mediaDevices
            .getUserMedia({video : true, audio : false})
            .then((stream)=>{
            let video = videoRef.current
            video.srcObject = stream;
            video.play()
            })
            .catch((err)=>{
            console.log("Dude a error in allow");
            
            })
        }
        
        const stream = ()=>{
            let video = videoRef.current;
            let photo = photoRef.current;
            let ctx = photo.getContext("2d");

            let width =300;
            let height = 200;
            photo.height = height;
            photo.width = width;

            return setInterval(()=>{
            ctx.drawImage(video, 0, 0, width, height)
            },200)

        }
        const capture = (e)=>{
           play()
            let photo = photoRef.current;
            let strip = stripRef.current;

            const data = photo.toDataURL("image/jpeg")
            console.warn(data);

            const link = document.createElement("a")
            link.href = data;
            link.setAttribute("download","mywebcam")

            link.innerHTML = ` <img src='${data}' alt='thumbnail'/> `
            strip.insertBefore(link, strip[0]);


        }


        return (
        <>
        <div className='flex'>
            <span onClick={()=>{navigate('/games')}}> Back </span>
        <div > 
            <h1>Allow this site to use your camera <button className='allow border rounded-2xl ' onClick={()=> allow()}>Allow</button></h1>
            <video className='video border-2 w-96' onCanPlay={()=> stream()} ref={videoRef} >Currently Video not available</video>
        </div>
        <div>
            <canvas className='canvas' ref={photoRef}/>
            <div className='output'>
            <div ref={stripRef}/>
            </div>
        </div>
        </div>
        <button onClick={()=>capture()}>Take photo</button>
  </>
  )
}

export default WebCam