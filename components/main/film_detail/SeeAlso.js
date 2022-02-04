import React from "react";
import styles from "./SeeAlso.module.scss";

const SeeAlso = () => {
  return (
    <section className={styles.container}>
      <h2>Recomendações</h2>
      <ul className={styles.films_list}>
        <li className={styles.films_item}>
          <div className={styles.film_banner}></div>
          <div>
            <h3 className={styles.film_title}>Oi, Alberto</h3>
            <p className={styles.film_date}>12 NOV 2021</p>
          </div>
        </li>
        <li className={styles.films_item}>
          <div className={styles.film_banner}></div>
          <div>
            <h3 className={styles.film_title}>Oi, Alberto</h3>
            <p className={styles.film_date}>12 NOV 2021</p>
          </div>
        </li>
        <li className={styles.films_item}>
          <div className={styles.film_banner}></div>
          <div>
            <h3 className={styles.film_title}>Oi, Alberto</h3>
            <p className={styles.film_date}>12 NOV 2021</p>
          </div>
        </li>
        <li className={styles.films_item}>
          <div className={styles.film_banner}></div>
          <div>
            <h3 className={styles.film_title}>Oi, Alberto</h3>
            <p className={styles.film_date}>12 NOV 2021</p>
          </div>
        </li>
        <li className={styles.films_item}>
          <div className={styles.film_banner}></div>
          <div>
            <h3 className={styles.film_title}>Oi, Alberto</h3>
            <p className={styles.film_date}>12 NOV 2021</p>
          </div>
        </li>
        <li className={styles.films_item}>
          <div className={styles.film_banner}></div>
          <div>
            <h3 className={styles.film_title}>Oi, Alberto</h3>
            <p className={styles.film_date}>12 NOV 2021</p>
          </div>
        </li>
      </ul>
    </section>
  );
};

export default SeeAlso;
