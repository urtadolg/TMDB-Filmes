import React from "react";
import Filters from "../components/filters/Filters";
import FilmsList from "../components/main/most_popular_list/FilmsList";
import DetailsLoadingPage from "../components/ui/DetailsLoadingPage";

const HomePage = () => {
  return (
    <React.Fragment>
      <Filters />
      <FilmsList />
    </React.Fragment>
  );
};

export default HomePage;
