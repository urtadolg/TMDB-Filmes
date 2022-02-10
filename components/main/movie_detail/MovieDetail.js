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
      <Cast castList={props.cast} />
      <Trailer {...props.trailer} />
      <SeeAlso seeAlsoList={props.see_also} />
    </section>
  );
};

export default MovieDetail;
