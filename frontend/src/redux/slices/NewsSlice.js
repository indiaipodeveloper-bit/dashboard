import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allNews: [],
};

const NewsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    setNewNews: (state, action) => {
      state.allNews.push(action.payload);
    },
    setAllNews: (state, action) => {
      state.allNews = (action.payload);
    },
  },
});

export const { setNewNews, setAllNews } = NewsSlice.actions;

export default NewsSlice.reducer;
