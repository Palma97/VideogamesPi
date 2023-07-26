import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getDetailVideogame } from "../redux/actions";
import styles from './styles/Detail.module.css';

const Detail = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  let detailVideogame = useSelector((state) => state.details);
  console.log(detailVideogame);
  useEffect(() => {
    dispatch(getDetailVideogame(id));

    //return dispatch(deleteDetail())
  }, [dispatch, id]);
  if (!detailVideogame) {
    return <p>Cargando...</p>;
  } else {

  return (
    <div className={styles.detail}>
      <div className={styles.subGeneral}>
      <div>
      <h1>Detalles</h1>

    <Link to="/home">
    <button>Volver</button>
    </Link>

      <h2>ID: {detailVideogame?.id}</h2>
      <h1>{detailVideogame?.name}</h1>
      <h2>Fecha de Lanzamiento: {detailVideogame?.released}</h2>
      <h2>Rating: {detailVideogame?.rating}</h2>

      <h2>Plataforma:</h2>
      {Array.isArray(detailVideogame?.platforms) ? (
        detailVideogame.platforms.map((platform, i) => {
          return <p key={i}>{platform}</p>;
        })
        ) : (
          <p>{detailVideogame?.platforms}</p>
          )}

      <h2>Género:</h2>
      {detailVideogame?.genres?.map((genre) => {
        return <p key ={genre.id}>{genre.name}</p>;
      })}


      <h2>Descripción:</h2>
      <p>{detailVideogame.description}</p>
      </div>
      <img
        src={detailVideogame?.image ? detailVideogame?.image : detailVideogame?.img}
        alt={detailVideogame.name}
        width={"200px"}
        />
      </div>
    </div>
  );
}
};

export default Detail;