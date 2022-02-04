import React from "react";
import { useSelector } from "react-redux";
import styles from "./DetailsLoadingPage.module.scss";

const DetailsLoadingPage = () => {
  const { title, summary, vote_avarage, overview, people } = useSelector(
    (state) => state.films.film_details.main_details
  );

  return (
    <React.Fragment>
      <div className={styles.content}>
        <section className={styles.main_details}>
          <div className={styles.film_banner} />
          <div className={styles.description_container}>
            <h1 className={styles.film_title} />
            <p className={styles.desc_summary} />
            <p
              style={{ display: "none" }}
              className={styles.desc_summary_768}
            />
            <div className={styles.public_evaluation_container}>
              <div className={styles.ui_evaluation_percentage} />
              <p />
            </div>
            <h2 />
            <p className={styles.film_synopsis} />
            <ul className={styles.film_people_list}>
              <li className={styles.people_item}>
                <h3 />
                <p />
              </li>
              <li className={styles.people_item}>
                <h3 />
                <p />
              </li>
              <li className={styles.people_item}>
                <h3 />
                <p />
              </li>
              <li className={styles.people_item}>
                <h3 />
                <p />
              </li>
              <li className={styles.people_item}>
                <h3 />
                <p />
              </li>
            </ul>
          </div>
        </section>
      </div>
    </React.Fragment>
  );
};

export default DetailsLoadingPage;
