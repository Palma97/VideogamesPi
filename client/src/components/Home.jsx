import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllGames,
  filterGenres,
  getGamesByOrigin,
  getGenres,
  orderAlphabetically,
  orderByRating,
} from "../redux/actions";
import Card from "./Card";
import Paginado from "./Paginado";
import styles from './styles/Home.module.css';
import Nav from './Nav';

export default function Home() {
  const dispatch = useDispatch();
  const allVideogames = useSelector((state) => state.videogames);
  const genres = useSelector((state) => state.genres);

  const [currentPage, setCurrentPage] = useState(1);
  const [videogamesPP] = useState(15);
  const indexOfLastVideogame = currentPage * videogamesPP;
  const indexOfFirstVideogame = indexOfLastVideogame - videogamesPP;
  const [current, setCurrent] = useState([]);
  const [filters, setFilters] = useState({
    orden: "",
    rating: "",
    genres: "",
    filter: "",
  })

  useEffect(()=>{
    dispatch(getGenres())
    dispatch(getAllGames())
  }, [])

  useEffect(() => {
    setCurrent(
      allVideogames.slice(indexOfFirstVideogame, indexOfLastVideogame)
    );
  }, [allVideogames, indexOfFirstVideogame, indexOfLastVideogame, dispatch]);

  useEffect(() => {
    const storedPage = localStorage.getItem('currentPage');
    if (storedPage) {
      setCurrentPage(parseInt(storedPage));
    }
  }, []);

  const paginado = (pageNumbers) => {
    setCurrentPage(pageNumbers);
    localStorage.setItem('currentPage', pageNumbers.toString());
  };

  const handleOrderAlphabetically = (event) => {
    event.preventDefault();
    setFilters({
      ...filters,
      orden: event.target.value
    })
    dispatch(orderAlphabetically(event.target.value));
    setCurrentPage(1);
    setCurrent(
      allVideogames.slice(indexOfFirstVideogame, indexOfLastVideogame)
    );
  };

  const handleOrderRating = (event) => {
    event.preventDefault();
    setFilters({
      ...filters,
      rating: event.target.value
    })
    dispatch(orderByRating(event.target.value));
    setCurrentPage(1);
    setCurrent(
      allVideogames.slice(indexOfFirstVideogame, indexOfLastVideogame)
    );
  };

  const handleFilterGenres = (event) => {
    event.preventDefault();
    setFilters({
      ...filters,
      genres: event.target.value
    })
    dispatch(filterGenres(event.target.value));
    setCurrentPage(1);
    setCurrent(
      allVideogames.slice(indexOfFirstVideogame, indexOfLastVideogame)
    );
  };

  const handleGamesByOrigin = (event) => {
    event.preventDefault();
    setFilters({
      ...filters,
      filter: event.target.value
    })
    dispatch(getGamesByOrigin(event.target.value));
    setCurrentPage(1);
    setCurrent(
      allVideogames.slice(indexOfFirstVideogame, indexOfLastVideogame)
    );
  };

  const clearFilter = () => {
    dispatch(getGamesByOrigin("All"));
    setFilters({
      orden: "",
      rating: "",
      genres: "",
      filter: "",
    })
  };
console.log(current)
  return (
    <div className={styles.homeContainer}>
      <Nav />
      <h1 className={styles.h1Ome}>VideoGame information</h1>

      <div>
        <select value={filters.orden} onChange={handleOrderAlphabetically}>
          <option value="">Orden</option>
          <option value="asc">A - Z</option>
          <option value="desc">Z - A</option>
        </select>

        <select value={filters.rating} onChange={handleOrderRating}>
          <option value="">Rating</option>
          <option value="max">Mas Popular</option>
          <option value="min">Menos Popular</option>
        </select>

        <select value={filters.genres} onChange={handleFilterGenres}>
          <option value="">Genres</option>
          {genres?.map((el) => (
            <option key={el.id} value={el.name}>
              {el.name}
            </option>
          ))}
        </select>

        <select value={filters.filter} onChange={handleGamesByOrigin}>
          <option value="">Filter</option>
          <option value="All">All Games</option>
          <option value="Created">My Games</option>
          <option value="From Api">Api Games</option>
        </select>

        <button onClick={clearFilter} className={styles.button}>
          Limpiar Filtros
        </button>

        <Paginado
          videogamesPP={videogamesPP}
          allVideogames={allVideogames.length}
          paginado={paginado}
        />
        <div className={styles.container}>
          {current.length > 0 &&
            current.map((el) => (
              <div key={el.id} className={styles.card}>
                <Card
                  id={el.id}
                  name={el.name}
                  image={el.background_image || el.image}
                  genres={
                    el.genres.join(" - ")
                  }
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}