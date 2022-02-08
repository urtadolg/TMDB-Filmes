import React from "react";
import CanvasRoundedGraph from "../../ui/CanvasRoundedGraph";
import styles from "./MainDetails.module.scss";

const MainDetails = ({
  poster,
  title,
  summary,
  vote_average,
  overview,
  people,
}) => {
  return (
    <div className={styles.content}>
      <section className={styles.main_details}>
        <div className={styles.movie_banner}>
          <img src={poster} alt={title} />
        </div>
        <div className={styles.description_container}>
          <h1 className={styles.movie_title}>{title}</h1>
          <p className={styles.desc_summary}>
            {`${summary.age_group} • ${
              summary.releaseDate
            } • ${summary.genres.join(", ")} • ${summary.runtime}`}
          </p>
          <p style={{ display: "none" }} className={styles.desc_summary_768}>
            {summary.age_group}
            <br />
            {summary.releaseDate}
            <br />
            {summary.genres}
            <br />
            {summary.runtime}
          </p>
          <div className={styles.public_evaluation_container}>
            <CanvasRoundedGraph
              percentage={parseInt(vote_average)}
            ></CanvasRoundedGraph>
            <p>Avaliação dos usuários</p>
          </div>
          <h2>Sinopse</h2>
          <p className={styles.movie_synopsis}>{overview}</p>
          <ul className={styles.movie_people_list}>
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
