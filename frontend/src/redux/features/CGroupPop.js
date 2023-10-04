import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    popUp:false
}

export const cGroupSlice = createSlice({
    name:'cGroupPopUp',
    initialState,
    reducers:{
        change:(state,action)=>{

            state.popUp = action.payload
        }
    }
})

export const {change} = cGroupSlice.actions

export default cGroupSlice.reducer