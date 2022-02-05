import React from "react";
import styles from "./FiltersList.module.scss";
import { useSelector } from "react-redux";
import FiltersItem from "./FiltersItem";

const FiltersList = () => {
  const availableFilters = useSelector(
    (state) => state.filters.availableFilters
  );

  let filtersItem;
  if (availableFilters.length > 0) {
    filtersItem = availableFilters.map((item, index) => (
      <FiltersItem key={index} name={item.name} genreId={item.id} />
    ));
  } else {
    filtersItem = <p>No filters to be selected.</p>;
  }

  return (
    <div className={styles.container}>
      <p>FILTRE POR:</p>
      <ul className={styles.btn_list}>{filtersItem}</ul>
    </div>
  );
};

export default FiltersList;
