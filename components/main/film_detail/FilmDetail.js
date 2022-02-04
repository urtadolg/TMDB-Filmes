import React from "react";
import Cast from "./Cast";
import styles from "./FilmDetail.module.scss";
import MainDetails from "./MainDetails";
import SeeAlso from "./SeeAlso";
import Trailer from "./Trailer";

const FilmDetail = () => {
  return (
    <section className={styles.container}>
      <MainDetails />
      <Cast />
      <Trailer />
      <SeeAlso />
    </section>
  );
};

export default FilmDetail;
