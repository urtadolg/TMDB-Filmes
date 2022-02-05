import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Head from "next/head";
import Filters from "../components/filters/Filters";
import FilmsList from "../components/main/most_popular_list/FilmsList";
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

  const isLoading = useSelector((state) => state.films.isLoading);

  if (isLoading) {
    return <DetailsLoadingPage />;
  }

  return (
    <React.Fragment>
      <Head>
        <meta
          name="description"
          content="Milhões de filmes, séries e pessoas para descobrir. Explore já. Aqui você encontra o filme que está procurando."
        />
        <title>Promobit Test</title>
      </Head>
      <Filters />
      <FilmsList />
    </React.Fragment>
  );
};

export default HomePage;
