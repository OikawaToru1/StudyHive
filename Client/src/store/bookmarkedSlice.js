import { createSlice } from "@reduxjs/toolkit";
import { themeSlice } from "./themeSlice";
import  showcase from '../assets/showcase.pdf'
import report from '../assets/MidReport.pdf'

const initialState = {
    values : [
        {title : 'Testing notes', url : 'https://res.cloudinary.com/donusb91k/image/upload/f_auto,q_auto/c_fill,g_auto,h_1200,w_1200/my_file-1768028893467-902037693?_a=BAMAMiDh0'},
      
    ]
}


export const bookmarkedSlice = createSlice({
    name : 'bookmarked',
    initialState,
    reducers : {
        addFile : (state, action )=>{
            console.log('change in bookmark', action.payload)
            state.values.push({title : action.payload.title, url : action.payload.url})
        },
        removeFile : (state,action)=>{
            console.log('remove file?', action.payload.title)
            state.values = state.values.filter((file)=> file.title !== action.payload.title)
            console.log("new files", state.values)
        }
    }
})

export const {addFile, removeFile} = bookmarkedSlice.actions

export default bookmarkedSlice.reducer