import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    allMeetings:[]
}

const Meetingsslice = createSlice({
    name:"meetings",
    initialState,
    reducers:{
        setAllMeetings:(state,action)=>{
            state.allMeetings = action.payload
        },
        setNewAddedMeeting:(state,action)=>{
            state.allMeetings.push(action.payload)
        }
    }
})

export const {setAllMeetings,setNewAddedMeeting} = Meetingsslice.actions;

export default Meetingsslice.reducer;