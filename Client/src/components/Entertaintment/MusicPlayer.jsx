import {React, useState} from 'react'
import useSound from 'use-sound'
import { harekrishna, rock, pop, flute } from '../../assets/sound';
import { BsFillMusicPlayerFill } from "react-icons/bs";

function MusicPlayer() {
    const [playing, setIsPlaying] = useState(false)
    const [music, setMusic] = useState(harekrishna)
    const [play, {stop}] = useSound(music,
        {
            onend : ()=> setIsPlaying(false)
        })
    
    const song = (e)=>{
        console.log(e.currentTarget.value)
       if(e.currentTarget.value == "harekrishna")
       {
         setMusic(harekrishna)
       }
       else if(e.currentTarget.value == "rock")
       {
         setMusic(rock)
       }
       if(e.currentTarget.value == "pop")
       {
         setMusic(pop)
       }
       else if(e.currentTarget.value == "flute")
       {
         setMusic(flute)
       }
    }

  return (
    <div>
        <select name="Music lists" id="" onClick={song}>
            <option value="harekrishna">Hare Krishna</option>
            <option value="flute">Flute music</option>
            <option value="rock">Rock</option>
            <option value="pop">Pop Song</option>
        </select>
    <div >
    <BsFillMusicPlayerFill size={50} className='m-6'
    
    onClick={()=>{
         play()
         setIsPlaying(prev => !prev)
         console.log(playing)
    }}/>
    
     <br />
     <button onClick={()=>stop()}>Stop</button>
    </div>

    </div>
  )
}

export default MusicPlayer