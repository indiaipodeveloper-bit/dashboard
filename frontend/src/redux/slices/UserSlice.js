import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    allUsers:[]
}

const UserSlice = createSlice({
    name:"users",
    initialState,
    reducers:{
        setAllUsers:(state,action)=>{
            state.allUsers = action.payload
        },
        setNewAddedUser:(state,action)=>{
            state.allUsers.push(action.payload)
        }
    }
})


export const {setAllUsers,setNewAddedUser} = UserSlice.actions;

export default UserSlice.reducer;