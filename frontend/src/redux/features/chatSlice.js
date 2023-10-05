import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    loading:true,
    chats:[],
    error:""
}

// const ls = localStorage.getItem('chatUser')
// const token = await JSON.parse(ls)?.token

const fetchChats = createAsyncThunk("chat.fetchChat", async (mainId)=>{
    const TOKEN = JSON.parse(localStorage.getItem('chatUser') ?? '')?.token
    // console.log(TOKEN);
    try {
        // console.log('mainId :',mainId);
        const response =await axios.get(`https://chat-app-backend-aakesh44s-projects.vercel.app/chat/getAllChats/${mainId}`,{
            headers:{
                Authorization: `Bearer ${TOKEN}`
            }
        })
        // console.log(response.data);
        return response.data

    } catch (error) {
        console.log(error);

    }
})

export const chatSlice = createSlice({

    name:"chats",
    initialState,
    extraReducers: builders =>{

        builders.addCase(fetchChats.pending,state=>{
            state.loading = true
        })

        builders.addCase(fetchChats.fulfilled,(state,action)=>{
            state.loading = false
            state.chats = action.payload
            state.error = ""
        })

        builders.addCase(fetchChats.rejected,(state,action)=>{
            state.loading=false
            state.chats = []
            state.error =action.error.message
        })
    }
})

export {fetchChats}
export default chatSlice.reducer