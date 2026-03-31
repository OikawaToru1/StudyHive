import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value : true,
}

export const themeSlice = createSlice({
    name : 'theme',
    initialState,
    reducers : {
        changeTheme : (state, action)=>{
            console.log('change',action.payload)
            state.value = action.payload
        }
    }
});

export const {changeTheme} = themeSlice.actions

export default themeSlice.reducer