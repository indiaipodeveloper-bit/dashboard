import {createSlice} from '@reduxjs/toolkit'

const initialState = {
    userinfo:undefined
};

const AuthSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{

    }
})


export const {} = AuthSlice.actions;

export default AuthSlice.reducer;