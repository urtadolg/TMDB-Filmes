import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterActions } from "../../store/filterSlice";
import styles from "./FiltersItem.module.scss";
import CrossIcon from "../../public/btn_close_cross.svg";
import useThemoviedb from "../../hooks/useThemoviedb";

const FiltersItem = (props) => {
  const dispatch = useDispatch();
  const { sendMoviesRequest } = useThemoviedb();

  const onSelectHandler = async () => {
    dispatch(filterActions.toggleFilter(props.genreId));
  };

  const isFilterSelected = useSelector((state) =>
    state.filters.selectedFilters.includes(props.genreId)
  );

  const btnClasses = isFilterSelected
    ? `${styles.btn} ${styles.btn_selected}`
    : `${styles.btn}`;

  return (
    <li className={styles.btn_item}>
      <button onClick={onSelectHandler} className={btnClasses}>
        {props.name}
        {isFilterSelected && <CrossIcon />}
      </button>
    </li>
  );
};

export default FiltersItem;
