import React from "react";
import { Link } from "react-router-dom"
import styles from "./styles/Landing.module.css"

export default function LandingPage(){
    return (
        <div className={styles.divGeneral}>
        <h1 className={styles.parrafoPequeño}>
            Welcome to my simple page application: Videogames.
        </h1>
        <Link to="/home">
            <button className={styles.btn}>Ingresar</button>
        </Link>
        </div>
    )
}