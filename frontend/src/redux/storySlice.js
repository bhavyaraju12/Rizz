import { createSlice } from "@reduxjs/toolkit";

const storySlice = createSlice({
  name: "story",
  initialState: {
    storyData: [],
  },
  reducers: {
    setStoryData: (state, action) => {
      // This is great for setting all stories at once
      state.storyData = action.payload;
    },
    // FIX: Add a new reducer for adding a single story.
    // This maintains consistency with your other slices (postSlice, loopSlice)
    // and prevents bugs where you might accidentally overwrite the array.
    addStory: (state, action) => {
      state.storyData.unshift(action.payload);
    },
  },
});

// Export the new action creator
export const { setStoryData, addStory } = storySlice.actions;
export default storySlice.reducer;
