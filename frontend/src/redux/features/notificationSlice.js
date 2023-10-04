import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    notifications : []
}

export const notiSlice = createSlice({
    name:"noti",
    initialState,
    reducers:{
        setNotifications:(state,action)=>{
            
            state.notifications = action.payload
        }
    }
})


export const {setNotifications} = notiSlice.actions 

export default notiSlice.reducer