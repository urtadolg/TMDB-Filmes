import React from "react";
import Cast from "./Cast";
import styles from "./MovieDetail.module.scss";
import MainDetails from "./MainDetails";
import SeeAlso from "./SeeAlso";
import Trailer from "./Trailer";

const MovieDetail = (props) => {
  return (
    <section className={styles.container}>
      <MainDetails {...props.main_details} />
      <Cast />
      <Trailer />
      <SeeAlso />
    </section>
  );
};

export default MovieDetail;
