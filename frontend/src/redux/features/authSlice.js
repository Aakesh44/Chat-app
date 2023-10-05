import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'
import axios from 'axios'


const initialState = {
    loading:false,
    userdata:{},
    error:""
}

const loginFun = createAsyncThunk('auth/login',async (userdata,{rejectWithValue})=>{

    try{

        const response =  await axios.post("https://chatly-server.vercel.app/user/log-in",userdata)

        console.log(response.data);
        if(response.data){
            localStorage.setItem('chatUser',JSON.stringify(response.data))
        }

        return response.data
    }
    catch(error){
        
        console.log(error.response?.data.error);

        return rejectWithValue(error.response?.data.error)
    }

})

const signinFun = createAsyncThunk('auth/signin',async (userdata,{rejectWithValue})=>{

    try{

        const response =  await axios.post("https://chatly-server.vercel.app/user/sign-in",userdata)

        console.log(response.data);
        if(response.data){
            localStorage.setItem('chatUser',JSON.stringify(response.data))
            
        }
        
        return response.data
    }
    catch(error){
         console.log(error)
         console.log(error.response.data.error);

         return rejectWithValue(error.response?.data.error)
    }
})

export const authSlice = createSlice({
    name:"auth",
    initialState,
    extraReducers: builders=>{

        builders.addCase(loginFun.pending,state=>{
            state.loading = true
        })

        builders.addCase(loginFun.fulfilled,(state,action)=>{
            state.loading = false
            state.userdata = action.payload
            state.error = ""
        })

        builders.addCase(loginFun.rejected,(state,action)=>{
            state.loading = false
            state.userdata ={}
            state.error = action.payload
        })

        builders.addCase(signinFun.pending,state=>{
            state.loading = true
        })

        builders.addCase(signinFun.fulfilled,(state,action)=>{
            state.loading = false
            state.userdata = action.payload
            state.error = ""
        })

        builders.addCase(signinFun.rejected,(state,action)=>{
            state.loading = false
            state.userdata ={}
            state.error = action.payload
        })
    }
})

export {loginFun,signinFun}
export default authSlice.reducer