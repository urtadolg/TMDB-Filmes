import React from "react";
import styles from "./Layout.module.scss";
import Header from "../header/Header";

const Layout = (props) => {
  return (
    <div>
      <Header />
      <main className={styles.container}>{props.children}</main>
    </div>
  );
};

export default Layout;
