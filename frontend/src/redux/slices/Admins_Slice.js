import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  AllAdmins: [],
};

const AdminsSlice = createSlice({
  name: "admins",
  initialState,
  reducers: {
    setAllAdmins: (state, action) => {
      state.AllAdmins = action.payload;
    },
    setNewAdmin: (state, action) => {
      state.AllAdmins.push(action.payload);
    },
  },
});

export const { setNewAdmin, setAllAdmins } = AdminsSlice.actions;

export default AdminsSlice.reducer;
