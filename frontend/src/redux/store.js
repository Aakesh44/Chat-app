import {configureStore} from "@reduxjs/toolkit"

import authReducer from './features/authSlice'

import mainUserReducer from './features/mainUserSlice'

import userReducer from "./features/userSlice" 

import chatReducer from './features/chatSlice'

import CGroupPop from "./features/CGroupPop"

import notification from './features/notificationSlice'

export const store = configureStore({
    reducer:{
        userData : authReducer,

        mainUser : mainUserReducer,

        usersList : userReducer,

        chatsList : chatReducer,

        CGroupPop : CGroupPop,

        notifications : notification
        
    }
})