import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    loading:true,
    posts:[],
    error:""
}

const fetchPosts = createAsyncThunk('posts/fetchposts' , async () =>{

    const TOKEN = JSON.parse(localStorage.getItem('chatUser') ?? '')?.token

    try {
    
    const response =  await axios.get("https://chat-server-qvkq.onrender.com/post/all-posts",{
        headers:{
            Authorization: `Bearer ${TOKEN}`
        }
    })
    return response.data?.posts
    
    }catch (error){
        console.log(error);
    }

})

export const postSlice = createSlice({
    name:"posts",
    initialState,

    extraReducers: builder =>{

        builder.addCase(fetchPosts.pending,state =>{
            state.loading = true
        })

        builder.addCase(fetchPosts.fulfilled,(state,action)=>{
            state.loading = false
            state.posts = action.payload 
            state.error = ""
        })

        builder.addCase(fetchPosts.rejected,(state,action)=>{
            state.loading = false 
            state.posts = []
            state.error = action.error.message
        })

    }
})

export {fetchPosts} 

export default postSlice.reducer
