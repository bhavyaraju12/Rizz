import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "post",
  initialState: {
    // No change to state shape, but good to be explicit
    postData: [],
  },
  reducers: {
    setPostData: (state, action) => {
      // This reducer is for setting all posts at once (e.g., on initial load)
      state.postData = action.payload;
    },
    // FIX 1: Add a new reducer specifically for adding a single post.
    // This is much safer than spreading an array in the component.
    addPost: (state, action) => {
      // It directly pushes the new post to the existing array in the store.
      state.postData.unshift(action.payload);
    },
  },
});

// FIX 2: Export the new action creator.
export const { setPostData, addPost } = postSlice.actions;
export default postSlice.reducer;
