import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Head from "next/head";
import Filters from "../components/filters/Filters";
import MoviesList from "../components/main/most_popular_list/MoviesList";
import useThemoviedb from "../hooks/useThemoviedb";

const HomePage = () => {
  const { getAvailableFilters } = useThemoviedb();
  const availableFilters = useSelector(
    (state) => state.filters.availableFilters
  );

  useEffect(() => {
    if (availableFilters.length == 0) getAvailableFilters();
  }, [availableFilters.length, getAvailableFilters]);

  return (
    <React.Fragment>
      <Head>
        <meta
          name="description"
          content="Milhões de filmes, séries e pessoas para descobrir. Explore já. Aqui você encontra o filme que está procurando."
        />
        <title>TMDB Filmes</title>
      </Head>
      <Filters />
      <MoviesList />
    </React.Fragment>
  );
};

export default HomePage;
