import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import styles from "./MoviesList.module.scss";
import { useRouter } from "next/router";
import useThemoviedb from "../../../hooks/useThemoviedb";
import Pagination from "./Pagination";
import CardLoading from "../../ui/CardLoading";
import MovieItem from "./MovieItem";

const MoviesList = () => {
  const router = useRouter();
  const selectedFilters = useSelector((state) => state.filters.selectedFilters);
  const selectedPage = useSelector((state) => state.filters.selectedPage);
  const {
    sendMoviesRequest,
    moviesList,
    paginationData,
    isEmptyMoviesList,
    hasResponseError,
    isLoading,
  } = useThemoviedb();

  useEffect(() => {
    const sendRequest = async () => {
      await sendMoviesRequest(selectedPage, selectedFilters);
    };
    sendRequest();
  }, [sendMoviesRequest, selectedPage, selectedFilters]);

  if (hasResponseError) {
    return (
      <section className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.error_title}>Ops...</h1>
          <p className={styles.error_message}>
            Erro ao acessar o servidor. Por favor, tente novamente mais tarde.
          </p>
        </div>
      </section>
    );
  }

  if (isEmptyMoviesList) {
    return (
      <section className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.error_title}>Ops...</h1>
          <p className={styles.error_message}>
            Nenhum filme encontrado. Tente outros filtros.
          </p>
        </div>
      </section>
    );
  }

  const showDetailsHandler = (movieId) => {
    router.push(`/loading/${movieId}`);
  };

  return (
    <React.Fragment>
      <section className={styles.container}>
        <div className={styles.content}>
          <ul className={styles.movies_list}>
            {moviesList.map((movie, index) => {
              return (
                <React.Fragment key={index}>
                  {!isLoading && (
                    <MovieItem
                      showDetails={showDetailsHandler}
                      title={movie.title}
                      banner={movie.banner}
                      date={movie.date}
                      movieId={movie.id}
                    />
                  )}
                  {isLoading && <CardLoading />}
                </React.Fragment>
              );
            })}
          </ul>
        </div>
      </section>
      <Pagination {...paginationData} />
    </React.Fragment>
  );
};

export default MoviesList;
