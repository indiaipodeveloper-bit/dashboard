import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userinfo: undefined,
};

const AuthSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserInfo: (state, action) => {
      state.userinfo = action.payload;
    },
  },
});

export const { setUserInfo } = AuthSlice.actions;

export default AuthSlice.reducer;
