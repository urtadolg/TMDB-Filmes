import React from "react";
import styles from "./Trailer.module.scss";

const Trailer = () => {
  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <h2>Trailer</h2>
        <div className={styles.trailer_container}></div>
      </div>
    </section>
  );
};

export default Trailer;
