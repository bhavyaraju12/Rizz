import { createSlice } from "@reduxjs/toolkit";

const loopSlice = createSlice({
  name: "loop",
  initialState: {
    loopData: [],
  },
  reducers: {
    setLoopData: (state, action) => {
      state.loopData = action.payload;
    },
    // FIX: Add a new reducer for adding a single loop, just like in postSlice.
    addLoop: (state, action) => {
      state.loopData.unshift(action.payload);
    },
  },
});

export const { setLoopData, addLoop } = loopSlice.actions;
export default loopSlice.reducer;
