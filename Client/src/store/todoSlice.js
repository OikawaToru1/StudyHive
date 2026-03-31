import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
    todos : [{id : 1, content : 'testing', completedStatus: false}]
}

export const todoSlice = createSlice({
    name : 'todo',
    initialState : initialState,
    reducers : {
        addTodo : (state,action)=>{
            const todo = {
                id : nanoid(),
                content : action.payload.content,
                completedStatus : false

            }
            state.todos.unshift(todo)
            console.log(action.payload)
        },
        removeTodo : (state,action)=>{
            state.todos = state.todos.filter((todo)=> todo.id !== action.payload.id)
        },
        updateTodo : (state, action)=>{
            console.log(action.payload.completedStatus)
            state.todos.find((todo)=> todo.id == action.payload.id).completedStatus = action.payload.completedStatus
        },
    }
})

export const {addTodo, removeTodo, updateTodo} = todoSlice.actions;

export default todoSlice.reducer
