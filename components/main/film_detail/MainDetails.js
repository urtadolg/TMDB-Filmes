import React from "react";
import styles from "./MainDetails.module.scss";
import { useSelector } from "react-redux";

const MainDetails = (props) => {
  const { title, summary, vote_avarage, overview, people } = useSelector(
    (state) => state.films.film_details.main_details
  );

  return (
    <div className={styles.content}>
      <section className={styles.main_details}>
        <div className={styles.film_banner}></div>
        <div className={styles.description_container}>
          <h1 className={styles.film_title}>{title}</h1>
          <p className={styles.desc_summary}>
            {`${summary.age_group} • ${summary.releaseDate} • ${summary.genres} • ${summary.runtime}`}
          </p>
          <p style={{ display: "none" }} className={styles.desc_summary_768}>
            {summary.age_group} <br /> {summary.releaseDate} <br />{" "}
            {summary.genres} <br /> {summary.runtime}
          </p>
          <div className={styles.public_evaluation_container}>
            <div className={styles.ui_evaluation_percentage}>
              {vote_avarage}
            </div>
            <p>Avaliação dos usuários</p>
          </div>
          <h2>Sinopse</h2>
          <p className={styles.film_synopsis}>{overview}</p>
          <ul className={styles.film_people_list}>
            {people.map((item, index) => {
              return (
                <li key={index} className={styles.people_item}>
                  <h3>{item.name}</h3>
                  <p>{item.role}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </div>
  );
};

export default MainDetails;
