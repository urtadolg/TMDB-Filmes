import { useRouter } from "next/router";
import React from "react";
import Logo from "../../public/tmdb_logo.svg";
import styles from "./Header.module.scss";

const Header = (props) => {
  const router = useRouter();

  const logoClickHandler = () => {
    router.push("/");
  };

  return (
    <header className={styles.container}>
      <div className={styles.content}>
        <Logo onClick={logoClickHandler} className={styles.logo} />
      </div>
    </header>
  );
};

export default Header;
