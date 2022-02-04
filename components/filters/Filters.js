import react from "react";
import FilterButtons from "./FiltersList";
import styles from "./Filters.module.scss";

const Filters = () => {
  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <h1>Milhões de filmes, séries e pessoas para descobrir. Explore já.</h1>
        <FilterButtons />
      </div>
    </section>
  );
};

export default Filters;
