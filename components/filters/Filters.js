import react from "react";
import FiltersList from "./FiltersList";
import styles from "./Filters.module.scss";

const Filters = () => {
  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <h1>
          Milhões de moviees, séries e pessoas para descobrir. Explore já.
        </h1>
        <FiltersList />
      </div>
    </section>
  );
};

export default Filters;
