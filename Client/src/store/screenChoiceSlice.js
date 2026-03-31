import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    value : false,
}

export const screenChoiceSlice = createSlice({
    name : 'screen',
    initialState,
    reducers : {
        changeScreenChoice : (state, action)=>{
            state.value = action.payload;
        }
    }
});

export const {changeScreenChoice} = screenChoiceSlice.actions

export default screenChoiceSlice.reducer