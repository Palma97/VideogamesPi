import React from 'react';
import styles from './styles/Paginado.module.css';

export default function Paginado(props) {
  const { videogamesPP, allVideogames, paginado } = props;

  let pageNumbers = [];

  for (let i = 1; i <= Math.ceil(allVideogames / videogamesPP); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav className={styles.paginationContainer}>
      <ul className={styles.paginationList}>
        {pageNumbers.map((num) => (
          <li className={styles.paginationItem} key={num}>
            <button
              className={styles.paginationButton}
              onClick={() => paginado(num)}
            >
              {num}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  );
}