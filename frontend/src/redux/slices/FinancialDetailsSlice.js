import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allFinancialDetails:[]
}


const financialDetailsSlice = createSlice({
    name:"financialDetails",
    initialState,
    reducers:{
        setAllFinancialDetails:(state,action)=>{
            state.allFinancialDetails = action.payload
        }
    }
})


export const {setAllFinancialDetails} = financialDetailsSlice.actions;

export default financialDetailsSlice.reducer;