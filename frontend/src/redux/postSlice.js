import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
  name: "post",
  initialState: {
    post: [],
  },
  reducers: {
    setPostData: (state, action) => {
      state.post = action.payload;
    },
    addPost: (state, action) => { 
      state.post.unshift(action.payload);
    },
    updatePostLikes: (state, action) => {
    const { postId, likes } = action.payload;
    const postIndex = state.post.findIndex(p => p._id === postId);
    if (postIndex !== -1) {
      state.post[postIndex].likes = likes;
    }
  },
      updatePostComments: (state, action) => {
      const { postId, comments } = action.payload;
      const postIndex = state.post.findIndex((p) => p._id === postId);
      if (postIndex !== -1) {
        state.post[postIndex].comments = comments;
      }
    }
  },
});


export const { setPostData, addPost, updatePostLikes, updatePostComments } = postSlice.actions;
export default postSlice.reducer;
