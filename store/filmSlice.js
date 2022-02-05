import { createSlice } from "@reduxjs/toolkit";
import { filterActions } from "./filterSlice";

export const filmSlice = createSlice({
  name: "films",
  initialState: {
    film_details: {
      main_details: {
        title: "Deadpool (2016)",
        summary: {
          age_group: "16 anos",
          releaseDate: "11/02/2016 (BR)",
          genres: "Ação, Aventura, Comédia, Ficção científica",
          runtime: "1h 47m",
        },
        vote_avarage: "76%",
        overview:
          "Baseado no anti-herói não convencional da Marvel Comics, Deadpool conta a história da origem do ex-agente das Forças Especiais que se tornou o mercenário Wade Wilson. Depois de ser submetido a um desonesto experimento que o deixa com poderes de cura acelerada, Wade adota o alter ego de Deadpool. Armado com suas novas habilidades e um senso de humor negro e distorcido, Deadpool persegue o homem que quase destruiu sua vida.",

        people: [
          {
            name: "Rob Liefeld",
            role: "Characters",
          },
          {
            name: "Rob Liefeld",
            role: "Characters",
          },
          {
            name: "Rob Liefeld",
            role: "Characters",
          },
          {
            name: "Rob Liefeld",
            role: "Characters",
          },
          {
            name: "Rob Liefeld",
            role: "Characters",
          },
        ],
      },
    },
    isLoading: false,
  },
  reducers: {
    setFilmDetails(state, action) {
      state.filmDetails = action.payload;
    },
    startLoadingState(state) {
      state.isLoading = true;
    },
    stopLoadingState(state) {
      state.isLoading = false;
    },
  },
});

export const filmActions = filmSlice.actions;

export default filmSlice.reducer;
