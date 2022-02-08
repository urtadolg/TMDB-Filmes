import { createSlice } from "@reduxjs/toolkit";

export const movieSlice = createSlice({
  name: "movies",
  initialState: {
    isLoading: false,
  },
  reducers: {
    startLoadingState(state) {
      state.isLoading = true;
    },
    stopLoadingState(state) {
      state.isLoading = false;
    },
  },
});

export const movieActions = movieSlice.actions;

export default movieSlice.reducer;
