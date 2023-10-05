import {configureStore} from "@reduxjs/toolkit"

import authReducer from './features/authSlice'

import mainUserReducer from './features/mainUserSlice'

import userReducer from "./features/userSlice" 

import chatReducer from './features/chatSlice'

import postReducer from './features/postSlice'

import CGroupPop from "./features/CGroupPop"

import notification from './features/notificationSlice'

export const store = configureStore({
    reducer:{
        userData : authReducer,

        mainUser : mainUserReducer,

        usersList : userReducer,

        postsList : postReducer,

        chatsList : chatReducer,

        CGroupPop : CGroupPop,

        notifications : notification
        
    }
})