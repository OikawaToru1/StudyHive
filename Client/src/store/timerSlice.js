import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    timer : {
        isPlaying: false,
        minutes : 25,
        seconds : 0,
    }
}


export const timerSlice = createSlice({
    name : 'timer',
    initialState,
    reducers : {
        changeTimerStatus : (state, action)=>{
            // console.log(action.payload);
            let timerId
            
            state.timer.isPlaying = action.payload
            // console.log(`if state.timer.isPlayer=>`, state.timer.isPlaying)
            if(state.timer.isPlaying)
            {

            //    timerId = setInterval(()=>{
            //     //  state.timer.seconds = state.timer.seconds-1;
            //      console.log("Inside timer slice", state.timer.seconds)
            //    },1000)
            }
            else{
                // console.log("Im here");
                
                clearInterval(timerId)
            }
        },

        changeTimerValue : (state, action)=>{
            console.log(action.payload)
            state.timer.minutes = action.payload.minutes;
            state.timer.seconds = action.payload.seconds;
            
        }
    }
});

export const {changeTimerStatus, changeTimerValue} = timerSlice.actions;

export default timerSlice.reducer;
