import React from "react";
import styles from "./CardLoading.module.scss";

const CardLoading = () => {
  return (
    <div className={styles.container}>
      <div className={styles.imgPlaceholder} />
      <div className={styles.descPlaceholder}>
        <div className={styles.title} />
        <div className={styles.desc} />
      </div>
    </div>
  );
};

export default CardLoading;
