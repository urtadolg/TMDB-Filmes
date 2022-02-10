import { useRouter } from "next/router";
import React from "react";
import styles from "./SeeAlso.module.scss";
import Image from "next/image";

const SeeAlso = (props) => {
  const router = useRouter();

  const onMovieSelectHandler = (event) => {
    const id = event.currentTarget.id;
    router.push(`/loading/${id}`);
  };

  return (
    <section className={styles.container}>
      <h2>Recomendações</h2>
      <ul className={styles.movies_list}>
        {props.seeAlsoList.map((item, index) => {
          return (
            <li
              key={index}
              onClick={onMovieSelectHandler}
              className={styles.movies_item}
              id={item.id}
            >
              <div className={styles.movie_banner}>
                <Image
                  src={item.banner}
                  alt={item.title}
                  width="176"
                  height="264"
                />
              </div>
              <div>
                <h3 className={styles.movie_title}>{item.title}</h3>
                <p className={styles.movie_date}>{item.date}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default SeeAlso;
