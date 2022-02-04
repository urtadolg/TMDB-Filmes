import { useState } from "react";
import axios from "axios";

const useThemoviedb = () => {
  const [moviesList, setMoviesList] = useState([]);
  const [hasResponseError, setHasResponseError] = useState(false);

  const sendMoviesRequest = async (page) => {
    const config = {
      params: {
        api_key: "",
        page,
        language: "pt-BR",
      },
    };

    try {
      const response = await axios.get(
        "https://api.themoviedb.org/3/movie/popular",
        config
      );

      const moviesData = response.data.results.map((film) => {
        return {
          banner: `http://image.tmdb.org/t/p/w185${film.poster_path}`,
          title: film.title,
          date: film.release_date,
        };
      });

      setMoviesList(moviesData);
    } catch (error) {
      console.log(error);
      setHasResponseError(true);
    }
  };

  const sendMovieDetailsRequest = (movieId) => {};

  return {
    sendMoviesRequest,
    moviesList,
    hasResponseError,
  };
};

export default useThemoviedb;
