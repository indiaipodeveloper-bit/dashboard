import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allBusinessDetails :[]
}


const BusinessDetailsSlice = createSlice({
    name:"businessDetails",
    initialState,
    reducers:{
        setAllBusinessDetails:(state,action)=>{
            state.allBusinessDetails = action.payload
        },
    }
})

export const {setAllBusinessDetails} = BusinessDetailsSlice.actions;

export default BusinessDetailsSlice.reducer;