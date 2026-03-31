import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: {
        username: '',
        authStatus: false,
        totalSessions : 0
    }
}

export const authSlice = createSlice({
    name: 'auth',
    initialState : initialState,
    reducers : {
        addUser : (state,action)=>{
            if(action.payload.username)
            {
                state.user.username = action.payload.username
                state.user.authStatus = true
                state.user.totalSessions = action.payload.totalSessions
            }
        },
        removeUser : (state,action)=>{
            state.user.authStatus = false
            state.user.username = ''
            state.user.totalSessions = 0
        }
    }
});

export const {addUser, removeUser} = authSlice.actions;

export default authSlice.reducer;
