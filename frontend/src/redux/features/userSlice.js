import { createSlice } from "@reduxjs/toolkit";
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {

    loading:false,
    users:[],
    error:""
}

// const ls = localStorage.getItem('chatUser')
// const token =await JSON.parse(ls)?.token

const fetchUsers = createAsyncThunk('user/fetchuser',async ()=>{
    const TOKEN = JSON.parse(localStorage.getItem('chatUser') ?? '')?.token
    // console.log(TOKEN);    
    try {
    
    return await axios.get("https://chat-server-qvkq.onrender.com/user/all-users",{
        headers:{
            Authorization: `Bearer ${TOKEN}`
        }
    })
    .then(response => response.data.users)
    
    }catch (error){
        console.log(error);
    }
})

export const userSlice = createSlice({

    name:"user",
    initialState,
    extraReducers: builder =>{

        builder.addCase(fetchUsers.pending,state =>{
            state.loading = true
        })

        builder.addCase(fetchUsers.fulfilled,(state,action)=>{
            state.loading = false
            state.users = action.payload
            state.error = ""
        })

        builder.addCase(fetchUsers.rejected,(state,action)=>{
            state.loading = false
            state.users = []
            state.error = action.error.message
        })
    },

})

export {fetchUsers}
export default userSlice.reducer