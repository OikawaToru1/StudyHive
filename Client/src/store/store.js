import {configureStore} from '@reduxjs/toolkit'
import themeSlice from './themeSlice'
import todoSlice  from './todoSlice'
import authSlice  from './authSlice'
import  bookmarkedSlice  from './bookmarkedSlice'
import timerSlice  from './timerSlice'
import  screenChoiceSlice  from './screenChoiceSlice'

export const store = configureStore({
    reducer : {
        theme : themeSlice,
        todo : todoSlice,
        auth : authSlice,
        bookmark : bookmarkedSlice,
        pomo   : timerSlice,
        screen : screenChoiceSlice
    },
})