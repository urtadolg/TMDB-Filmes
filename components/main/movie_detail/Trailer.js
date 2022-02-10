import React from "react";
import styles from "./Trailer.module.scss";
import YouTube from "react-youtube";

const Trailer = (props) => {
  return (
    <section className={styles.container}>
      <div className={styles.content}>
        <h2>Trailer</h2>
        <div className={styles.trailer_container}>
          {!(props.name === "NA") && (
            <YouTube
              containerClassName={styles.ytContainer}
              className={styles.ytPlayer}
              videoId={props.link}
            />
          )}
        </div>
      </div>
    </section>
  );
};

export default Trailer;
