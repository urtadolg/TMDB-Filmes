import React from "react";
import Logo from "../../public/tmdb_logo.svg";
import styles from "./Header.module.scss";

const Header = (props) => {
  return (
    <header className={styles.container}>
      <div className={styles.content}>
        <Logo className={styles.logo} />
      </div>
    </header>
  );
};

export default Header;
