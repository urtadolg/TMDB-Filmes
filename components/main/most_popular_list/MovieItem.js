import React from "react";
import styles from "./MovieItem.module.scss";

const MovieItem = (props) => {
  const onItemClickHandler = () => {
    props.showDetails(props.movieId);
  };

  return (
    <li onClick={onItemClickHandler} className={styles.movies_item}>
      <div className={styles.movie_banner}>
        <img src={props.banner} alt={props.title} />
      </div>
      <div>
        <h2 className={styles.movie_title}>{props.title}</h2>
        <p className={styles.movie_date}>{props.date}</p>
      </div>
    </li>
  );
};

export default MovieItem;
