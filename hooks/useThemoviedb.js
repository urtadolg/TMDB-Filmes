import { useState } from "react";
import { useDispatch } from "react-redux";
import { filterActions } from "../store/filterSlice";
import axios from "axios";

const useThemoviedb = () => {
  const [moviesList, setMoviesList] = useState([]);
  const [paginationData, setPaginationData] = useState({});
  const [isEmptyMoviesList, setIsEmptyMoviesList] = useState(false);
  const [hasResponseError, setHasResponseError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  async function sendMoviesRequest(page, selectedFilters) {
    const requestUrl = buildURL(page, selectedFilters);

    try {
      const { moviesListData, paginationData } = await loadData(requestUrl);

      if (isMoviesListEmpty(moviesListData)) {
        setIsEmptyMoviesList(true);
        return;
      } else {
        setIsEmptyMoviesList(false);
      }

      const formatedMoviesData = formatMoviesData(moviesListData);

      setMoviesList(formatedMoviesData);
      setPaginationData(paginationData);
    } catch (e) {
      setHasResponseError(e);
      console.log(e);
    }
  }

  function buildURL(page, selectedFilters) {
    if (hasFilters(selectedFilters)) {
      return `https://api.themoviedb.org/3/discover/movie?with_genres=${selectedFilters}&api_key=${process.env.API_KEY}&page=${page}&language=pt-BR`;
    } else {
      return `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}&page=${page}&language=pt-BR`;
    }
  }

  function hasFilters(selectedFilters) {
    return selectedFilters.length == 0 ? false : true;
  }

  async function loadData(url) {
    setIsLoading(true);

    const response = await axios.get(url);

    const moviesListData = response.data.results;
    const paginationData = {
      page: response.data.page,
      total_pages: response.data.total_pages,
    };

    setIsLoading(false);
    setHasResponseError(false);
    return {
      moviesListData,
      paginationData,
    };
  }

  function isMoviesListEmpty(moviesList) {
    return moviesList.length == 0 ? true : false;
  }

  function formatMoviesData(moviesList) {
    const formatedMoviesData = moviesList.map((movie) => {
      return {
        banner: `http://image.tmdb.org/t/p/w185${movie.poster_path}`,
        title: movie.title,
        date: formatDate(movie.release_date),
        id: movie.id,
      };
    });

    return formatedMoviesData;
  }

  function formatDate(date) {
    if (!date) {
      return "NA";
    }

    const day = date.slice(-2);
    const month = getMonthName(date.slice(5, 7));
    const year = date.slice(0, 4);

    return `${day} ${month} ${year}`;
  }

  function getMonthName(month) {
    const monthNames = [
      "JAN",
      "FEV",
      "MAR",
      "ABR",
      "MAI",
      "JUN",
      "JUL",
      "AGO",
      "SET",
      "OUT",
      "NOV",
      "DEZ",
    ];

    return monthNames[month - 1];
  }

  const dispatch = useDispatch();

  async function getAvailableFilters() {
    try {
      const result = await axios.get(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.API_KEY}&language=pt-br`
      );

      dispatch(filterActions.setAvailableFilters(result.data.genres));
    } catch (error) {
      console.log(error);
      setHasResponseError(true);
    }
  }

  return {
    sendMoviesRequest,
    getAvailableFilters,
    moviesList,
    paginationData,
    isEmptyMoviesList,
    hasResponseError,
    isLoading,
  };
};

export default useThemoviedb;
