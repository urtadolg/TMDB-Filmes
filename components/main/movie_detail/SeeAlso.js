import React from "react";
import styles from "./SeeAlso.module.scss";

const SeeAlso = () => {
  return (
    <section className={styles.container}>
      <h2>Recomendações</h2>
      <ul className={styles.movies_list}>
        <li className={styles.movies_item}>
          <div className={styles.movie_banner}></div>
          <div>
            <h3 className={styles.movie_title}>Oi, Alberto</h3>
            <p className={styles.movie_date}>12 NOV 2021</p>
          </div>
        </li>
        <li className={styles.movies_item}>
          <div className={styles.movie_banner}></div>
          <div>
            <h3 className={styles.movie_title}>Oi, Alberto</h3>
            <p className={styles.movie_date}>12 NOV 2021</p>
          </div>
        </li>
        <li className={styles.movies_item}>
          <div className={styles.movie_banner}></div>
          <div>
            <h3 className={styles.movie_title}>Oi, Alberto</h3>
            <p className={styles.movie_date}>12 NOV 2021</p>
          </div>
        </li>
        <li className={styles.movies_item}>
          <div className={styles.movie_banner}></div>
          <div>
            <h3 className={styles.movie_title}>Oi, Alberto</h3>
            <p className={styles.movie_date}>12 NOV 2021</p>
          </div>
        </li>
        <li className={styles.movies_item}>
          <div className={styles.movie_banner}></div>
          <div>
            <h3 className={styles.movie_title}>Oi, Alberto</h3>
            <p className={styles.movie_date}>12 NOV 2021</p>
          </div>
        </li>
        <li className={styles.movies_item}>
          <div className={styles.movie_banner}></div>
          <div>
            <h3 className={styles.movie_title}>Oi, Alberto</h3>
            <p className={styles.movie_date}>12 NOV 2021</p>
          </div>
        </li>
      </ul>
    </section>
  );
};

export default SeeAlso;
