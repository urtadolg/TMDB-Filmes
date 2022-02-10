import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import React from "react";
import styles from "./SeeAlso.module.scss";
import DetailsLoadingPage from "../../ui/DetailsLoadingPage";

const SeeAlso = (props) => {
  const router = useRouter();

  const onMovieSelectHandler = (event) => {
    const id = event.currentTarget.id;
    router.push(`/loading/${id}`);
  };

  const isLoading = useSelector((state) => state.movies.isLoading);

  if (isLoading) {
    return <DetailsLoadingPage />;
  }

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
                <img src={item.banner} alt={item.title} />
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
