import { configureStore } from "@reduxjs/toolkit";
import filterReducer from "./filterSlice";
import filmsReducer from "./filmSlice";

export default configureStore({
  reducer: { filters: filterReducer, films: filmsReducer },
});
