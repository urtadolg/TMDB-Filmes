import React from "react";
import Card from "../../ui/Card";
import styles from "./Cast.module.scss";

const Cast = () => {
  return (
    <section className={styles.container}>
      <h1>Elenco original</h1>
      <ul className={styles.cast_list}>
        <li>
          <Card className={styles.cast_item}>
            <div className={styles.photo_container}></div>
            <h2>Ryan Reynolds</h2>
            <p>Wade Wilson / Deadpool</p>
          </Card>
        </li>
        <li>
          <Card className={styles.cast_item}>
            <div className={styles.photo_container}></div>
            <h2>Ryan Reynolds</h2>
            <p>Wade Wilson / Deadpool</p>
          </Card>
        </li>
        <li>
          <Card className={styles.cast_item}>
            <div className={styles.photo_container}></div>
            <h2>Ryan Reynolds</h2>
            <p>Wade Wilson / Deadpool</p>
          </Card>
        </li>
        <li>
          <Card className={styles.cast_item}>
            <div className={styles.photo_container}></div>
            <h2>Ryan Reynolds</h2>
            <p>Wade Wilson / Deadpool</p>
          </Card>
        </li>
        <li>
          <Card className={styles.cast_item}>
            <div className={styles.photo_container}></div>
            <h2>Ryan Reynolds</h2>
            <p>Wade Wilson / Deadpool</p>
          </Card>
        </li>
        <li>
          <Card className={styles.cast_item}>
            <div className={styles.photo_container}></div>
            <h2>Ryan Reynolds</h2>
            <p>Wade Wilson / Deadpool</p>
          </Card>
        </li>
        <li>
          <Card className={styles.cast_item}>
            <div className={styles.photo_container}></div>
            <h2>Ryan Reynolds</h2>
            <p>Wade Wilson / Deadpool</p>
          </Card>
        </li>
        <li>
          <Card className={styles.cast_item}>
            <div className={styles.photo_container}></div>
            <h2>Ryan Reynolds</h2>
            <p>Wade Wilson / Deadpool</p>
          </Card>
        </li>
      </ul>
    </section>
  );
};

export default Cast;
