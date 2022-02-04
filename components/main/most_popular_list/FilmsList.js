import React, { useEffect } from "react";
import styles from "./FilmsList.module.scss";
import { useRouter } from "next/router";
import useThemoviedb from "../../../hooks/useThemoviedb";

const FilmsList = () => {
  const router = useRouter();
  const { sendMoviesRequest, moviesList, hasResponseError } = useThemoviedb();

  useEffect(() => {
    const sendRequest = async () => {
      await sendMoviesRequest(1);
    };

    sendRequest();
  }, []);

  if (hasResponseError) {
    return (
      <section className={styles.container}>
        <div className={styles.content}>
          <h1 className={styles.error_title}>Ops...</h1>
          <p className={styles.error_message}>
            Erro ao acessar o servidor, por favor tente novamente mais tarde.
          </p>
        </div>
      </section>
    );
  }

  const showDetailsHandler = () => {
    router.push(`/loading/123456`);
  };

  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <ul className={styles.films_list}>
          {moviesList.map((film, index) => {
            return (
              <li
                key={index}
                onClick={showDetailsHandler}
                className={styles.films_item}
              >
                <div className={styles.film_banner}>
                  <img src={film.banner} alt={film.title} />
                </div>
                <div>
                  <h2 className={styles.film_title}>{film.title}</h2>
                  <p className={styles.film_date}>{film.date}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default FilmsList;
