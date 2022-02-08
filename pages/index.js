import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Head from "next/head";
import Filters from "../components/filters/Filters";
import MoviesList from "../components/main/most_popular_list/MoviesList";
import DetailsLoadingPage from "../components/ui/DetailsLoadingPage";
import useThemoviedb from "../hooks/useThemoviedb";

const HomePage = () => {
  const { getAvailableFilters } = useThemoviedb();
  const availableFilters = useSelector(
    (state) => state.filters.availableFilters
  );

  useEffect(() => {
    if (availableFilters.length == 0) getAvailableFilters();
  }, []);

  const isLoading = useSelector((state) => state.movies.isLoading);

  if (isLoading) {
    return <DetailsLoadingPage />;
  }

  return (
    <React.Fragment>
      <Head>
        <meta
          name="description"
          content="Milhões de moviees, séries e pessoas para descobrir. Explore já. Aqui você encontra o moviee que está procurando."
        />
        <title>Promobit Test</title>
      </Head>
      <Filters />
      <MoviesList />
    </React.Fragment>
  );
};

export default HomePage;
