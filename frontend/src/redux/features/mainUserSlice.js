import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'

const initialState = {
    loading:false,
    mainUser:null,
    error:""
}

// const ls = localStorage.getItem('chatUser')
// const token =await JSON.parse(ls)?.token

const getMainUser = createAsyncThunk('user/getUser', async (userId,{rejectWithValue})=>{
    
    const TOKEN = JSON.parse(localStorage.getItem('chatUser') ?? '')?.token
    // console.log(TOKEN);
    try {
        const response = await axios.get(`https://chat-server-qvkq.onrender.com/user/getuser/${userId}`,{
            headers:{
            Authorization: `Bearer ${TOKEN}`
        }
        }
        )

        // console.log(response.data);
        // window.location.reload()
        return response.data

    } catch (error) {
        console.error(error);

        return rejectWithValue(error.response?.data.error)
    }
})

export const mainUserSlice = createSlice({
    name:"mainUser",
    initialState,
    extraReducers:builders =>{

        builders.addCase(getMainUser.pending,state=>{
            state.loading = true
        })

        builders.addCase(getMainUser.fulfilled,(state,action)=>{

            state.loading = false
            state.mainUser = action.payload 
            state.error = ""
        })

        builders.addCase(getMainUser.rejected,(state,action)=>{
            state.loading = false 
            state.mainUser = null 
            state.error = action.payload
        })
    }
})

export {getMainUser} 
export default mainUserSlice.reducer 