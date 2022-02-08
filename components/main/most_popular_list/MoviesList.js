import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { movieActions } from "../../../store/movieSlice";
import styles from "./MoviesList.module.scss";
import { useRouter } from "next/router";
import useThemoviedb from "../../../hooks/useThemoviedb";
import Pagination from "./Pagination";
import CardLoading from "../../ui/CardLoading";
import MovieItem from "./MovieItem";

const MoviesList = () => {
  const {
    sendMoviesRequest,
    moviesList,
    paginationData,
    isEmptyMoviesList,
    hasResponseError,
    isLoading,
  } = useThemoviedb();
  const selectedFilters = useSelector((state) => state.filters.selectedFilters);
  const selectedPage = useSelector((state) => state.filters.selectedPage);

  useEffect(() => {
    const sendRequest = async () => {
      await sendMoviesRequest(selectedPage, selectedFilters);
    };
    sendRequest();
  }, [selectedPage, selectedFilters]);

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
            Nenhum moviee encontrado. Tente outros filtros.
          </p>
        </div>
      </section>
    );
  }

  const router = useRouter();
  const dispatch = useDispatch();

  const showDetailsHandler = (movieId) => {
    dispatch(movieActions.startLoadingState());
    router.push(`/details/${movieId}`);
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
