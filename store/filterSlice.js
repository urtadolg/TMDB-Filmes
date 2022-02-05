import { createSlice } from "@reduxjs/toolkit";

export const filterSlice = createSlice({
  name: "filters",
  initialState: {
    selectedFilters: [],
    availableFilters: [],
  },
  reducers: {
    toggleFilter(state, action) {
      const foundFilter = state.selectedFilters.includes(action.payload);

      if (foundFilter) {
        state.selectedFilters = state.selectedFilters.filter(
          (filter) => filter != action.payload
        );
      } else {
        state.selectedFilters.push(action.payload);
      }
    },

    setAvailableFilters(state, action) {
      state.availableFilters = action.payload;
    },
  },
});

export const filterActions = filterSlice.actions;

export default filterSlice.reducer;
