import React, { useState } from "react";
import styles from "./FiltersItem.module.scss";
import CrossIcon from "../../public/btn_close_cross.svg";

const FiltersItem = (props) => {
  const [isSelected, setIsSelected] = useState(false);

  const onSelectHandler = () => {
    setIsSelected((state) => !state);
  };

  const btnClasses = isSelected
    ? `${styles.btn} ${styles.btn_selected}`
    : `${styles.btn}`;

  return (
    <li className={styles.btn_item}>
      <button onClick={onSelectHandler} className={btnClasses}>
        {props.name}
        {isSelected && <CrossIcon />}
      </button>
    </li>
  );
};

export default FiltersItem;
