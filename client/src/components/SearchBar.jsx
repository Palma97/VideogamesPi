import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { getGamesByName } from '../redux/actions';
import styles from './styles/SearchBar.module.css';

export default function SearchBar() {
  const dispatch = useDispatch();
  const [name, setName] = useState('');

  function handleInputChange(event) {
    setName(event.target.value);
  }
  function handleSubmit() {
    dispatch(getGamesByName(name));
  }

  return (
    <div className={styles.searchBarContainer}>
      <input
        type="search"
        placeholder="Buscar.."
        value={name}
        onChange={handleInputChange}
        className={styles.searchInput}
      />

        <button onClick={handleSubmit} className={styles.searchButton}>
          Buscar
        </button>
    </div>
  );
}