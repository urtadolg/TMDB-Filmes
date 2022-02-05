import { useState } from "react";
import { useDispatch } from "react-redux";
import { filterActions } from "../store/filterSlice";
import axios from "axios";

const useThemoviedb = () => {
  const [moviesList, setMoviesList] = useState([]);
  const [emptyMoviesList, setEmptyMoviesList] = useState(false);
  const [hasResponseError, setHasResponseError] = useState(false);

  const sendMoviesRequest = async (page, selectedFilters) => {
    let requestUrl;

    if (selectedFilters.length == 0) {
      requestUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}&page=${page}&language=pt-BR`;
    } else {
      requestUrl = `https://api.themoviedb.org/3/discover/movie?with_genres=${selectedFilters}&api_key=${process.env.API_KEY}&page=${page}`;
    }

    try {
      const response = await axios.get(requestUrl);

      if (response.data.results.length == 0) {
        setEmptyMoviesList(true);
        return;
      }

      setEmptyMoviesList(false);

      const moviesData = response.data.results.map((film) => {
        return {
          banner: `http://image.tmdb.org/t/p/w185${film.poster_path}`,
          title: film.title,
          date: film.release_date,
        };
      });

      setMoviesList(moviesData);
      setHasResponseError(false);
    } catch (error) {
      console.log(error);
      setHasResponseError(true);
    }
  };

  const dispatch = useDispatch();

  const getAvailableFilters = async () => {
    try {
      const result = await axios.get(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.API_KEY}&language=pt-br`
      );

      dispatch(filterActions.setAvailableFilters(result.data.genres));
    } catch (error) {
      console.log(error);
      setHasResponseError(true);
    }
  };

  return {
    sendMoviesRequest,
    getAvailableFilters,
    moviesList,
    emptyMoviesList,
    hasResponseError,
  };
};

export default useThemoviedb;
