import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isSideBar: false,
};
const sideBarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    setSideBar: (state) => {
      state.isSideBar = !state.isSideBar;
    },
  },
});

export const { setSideBar } = sideBarSlice.actions;

export default sideBarSlice.reducer;
