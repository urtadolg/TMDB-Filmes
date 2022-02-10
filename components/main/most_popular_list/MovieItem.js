import React from "react";
import styles from "./MovieItem.module.scss";
import Image from "next/image";

const MovieItem = (props) => {
  const onItemClickHandler = () => {
    props.showDetails(props.movieId);
  };

  return (
    <li onClick={onItemClickHandler} className={styles.movies_item}>
      <div className={styles.movie_banner}>
        <Image src={props.banner} alt={props.title} width="185" height="278" />
      </div>
      <div>
        <h2 className={styles.movie_title}>{props.title}</h2>
        <p className={styles.movie_date}>{props.date}</p>
      </div>
    </li>
  );
};

export default MovieItem;
