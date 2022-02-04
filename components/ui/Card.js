import React from "react";
import styles from "./Card.module.scss";

const Card = (props) => {
  const cardClasses = props.className
    ? `${styles.container} ${props.className}`
    : `${styles.container}`;

  return <div className={cardClasses}>{props.children}</div>;
};

export default Card;
