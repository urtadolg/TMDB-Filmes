import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./filterSlice";
import moviesReducer from "./movieSlice";

export default configureStore({
  reducer: { filters: filterReducer, movies: moviesReducer },
});
