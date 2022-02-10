import React from "react";
import Card from "../../ui/Card";
import styles from "./Cast.module.scss";
import Image from "next/image";

const Cast = (props) => {
  return (
    <section className={styles.container}>
      <h1>Elenco original</h1>
      <ul className={styles.cast_list}>
        {props.castList.map((item, index) => {
          return (
            <li key={index}>
              <Card className={styles.cast_item}>
                <div className={styles.photo_container}>
                  <Image
                    src={item.profile_pic}
                    alt={item.name}
                    width="175"
                    height="262"
                  />
                </div>
                <h2>{item.name}</h2>
                <p>{item.character_name}</p>
              </Card>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Cast;
