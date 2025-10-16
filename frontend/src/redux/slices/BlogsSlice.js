import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allBlogs: [],
};

const BlogsSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {
    setAllBlogs:(state,action)=>{
      state.allBlogs = action.payload
    },
    setNewBlog: (state, action) => {
      state.allBlogs.push(action.payload);
    },
  },
});

export const {setNewBlog,setAllBlogs} = BlogsSlice.actions;

export default BlogsSlice.reducer;
