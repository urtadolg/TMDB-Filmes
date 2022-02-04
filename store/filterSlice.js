import { createSlice } from "@reduxjs/toolkit";

export const filterSlice = createSlice({
  name: "filters",
  initialState: {
    selectedFilters: [],
    availableFilters: [
      "Ação",
      "Aventura",
      "Animação",
      "Comédia",
      "Crime",
      "Documentário",
      "Drama",
      "Família",
      "Fantasia",
      "História",
      "Terror",
      "Música",
      "Mistério",
      "Romance",
      "Ficção científica",
      "Cinema TV",
      "Thriller",
      "Guerra",
      "Faroeste",
    ],
  },
  reducers: {
    selectFilter(state, action) {},
  },
});

export const filterActions = filterSlice.actions;

export default filterSlice.reducer;
