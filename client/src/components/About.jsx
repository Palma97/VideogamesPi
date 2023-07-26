import React from "react";
import styles from "./styles/About.module.css";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div className={styles.divGeneral}>
      <h1 className={styles.h1}>About me</h1>
      <div className={styles.divididor}>
        <p className={styles.parrafo}>
          Hi, my name is Nicolás Palma, this is my SPA (Simple page application)
          about Videogames! I'm studying in Henry and I'm ready for learn all
          about programming and I am very enthusiastic to move forward with
          this new goal. In this proyect I used knowledge of Javascript,
          React, Redux, CSS, Express, Node, Sequelize and PostgreSQL.
        </p>
        <img
          className={styles.imagen}
          src="https://hips.hearstapps.com/hmg-prod/images/henry-cavill-attends-netflixs-enola-holmes-2-world-premiere-news-photo-1683270713.jpg?crop=0.694xw:1.00xh;0.154xw,0&resize=1200:*"
          alt="Image not found"
        />
      </div>
      <Link to="/home">
        <button className={styles.button}>Volver a Home</button>
      </Link>
    </div>
  );
}
