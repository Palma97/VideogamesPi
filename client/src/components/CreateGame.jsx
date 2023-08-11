import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getGenres, createVideogame } from "../redux/actions";
import styles from './styles/Create.module.css'
import {useNavigate} from "react-router-dom"

const CreateGame = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const genres = useSelector((state) => state.genres);
    const platforms = [
        "Xbox One",
        "Xbox Series S/X",
        "Xbox 360",
        "Xbox",
        "PlayStation 5",
        "PlayStation 4",
        "PlayStation 3",
        "PlayStation 2",
        "PlayStation",
        "Nintendo Switch",
        "Nintendo DS",
        "PC",
        "macOS",
        "Linux",
        "Windows",
        "iOS",
        "Android",
    ];
    useEffect(() => {
        dispatch(getGenres());
    }, [dispatch]);
    
    const [errors, setErrors] = useState({});
    const [values, setValues] = useState({
        name: "",
        image: "",
        description: "",
        released: "",
        rating: 0,
        platforms: [],
        genres: [],
    });

    //-----------------------------VALIDACIONES----------------------------------

    const validators = (values) => {
        let errors = {};
        if (!values.name || values.name.length < 3 || values.name.length > 20) {
            errors.name = "* El nombre del juego debe tener al menos 3 caracteres o no puede ser demasiado largo...";
        }

        if(!/^[A-Za-z ]+$/.test(values.name)){
            errors.name = "* No se pueden agregar carácteres especiales a los nombres"
        }

        if (!values.description) {
            errors.description =
                "* Por favor ingresa una descripcion. (Max 100 caracteres)";
        }
        if (!values.rating || values.rating === "0") {
            errors.rating = "* Por favor inserte un numero entre el 0.5 y 5";
        }
        if (!values.released) {
            errors.released = "*Por favor inserta una fecha de lanzamiento";
        }
        if (values.platforms.length === 0) {
            errors.platforms = "*Por favor selecciona al menos una Plataforma";
        }
        if (values.genres.length === 0) {
            errors.genres = "*Por favor selecciona al menos un genero";
        }
        return errors;
    };

    // Funcion que se ejecuta cunado hay un cambio, mediante un event.
    const handleChange = (event) => {
        event.preventDefault();
        setValues({
            ...values,
            [event.target.name]: event.target.value,
        });
        setErrors(
            validators({
                ...values,
                [event.target.name]: event.target.value,
            })
        );
    };

    //--------------------------SUBMIT--------------------------

    const handleSubmit = (event) => {
        event.preventDefault();
        if (values.image === null || values.image === " ") {
            values.image =
                "https://media.rawg.io/media/games/53f/53f65f1a0988374c18b5ee3dddbf0399.jpg";
        }
        if (
            !values.name ||
            !values.description ||
            !values.rating ||
            !values.released ||
            !values.platforms ||
            !values.genres
        ) {
            alert("Información faltante");
        } else {
            dispatch(createVideogame(values));
            setValues({
                name: "",
                image: "",
                description: "",
                released: "",
                rating: 0,
                platforms: [],
                genres: [],
            });
            if(window.confirm("Videojuego creado, ¿Volver a home?")){
                navigate("/home")
            }   
        }
    };

    const handleChangePlatform = (event) => {
        if (values.platforms.includes(event.target.value)) {
            alert(
                "Esta plataforma ya ha sido seleccionada. Elija otra, por favor..."
            );
        } else {
            setValues((state) => ({
                ...state,
                platforms: [...state.platforms, event.target.value],
            }));
            setErrors(
                validators({
                    ...values,
                    [event.target.name]: [...values[event.target.name], event.target.value]
                })
            );
        }
    };

    const handleDeletePlatform = (event, plat) => {
        event.preventDefault();
        setValues({
            ...values,
            platforms: values.platforms.filter((element) => element !== plat),
        });
        setErrors(
            validators({
                ...values,
                platforms: values.platforms.filter((element) => element !== plat),
            })
        );
    };

    const handleChangeGenre = (event) => {
        if (values.genres.includes(event.target.value)) {
            alert("Este genero ya ha sido seleccionado, por favor elija otro...");
        } else {
            setValues((state) => ({
                ...state,
                genres: [...state.genres, event.target.value],
            }));
            setErrors(
                validators({
                    ...values,
                    [event.target.name]: [...values[event.target.name], event.target.value]
                })
            );
        }
    };

    const handleDeleteGenre = (event, genr) => {
        event.preventDefault();
        setValues((prev) => ({
            ...prev,
            genres: prev.genres.filter((element) => element !== genr),
        }));
        setErrors(
            validators({
                ...values,
                genres: values.genres.filter((element) => element !== genr),
            })
        );
    };
console.log(errors)
    return (
        <div className={styles.container}>
            <div className={styles.form}>
                <h1>CREAR VIDEO JUEGO</h1>
                <h5>COMPLETA EL FORMULARIO</h5>
                <form autoComplete="off" onSubmit={(event) => handleSubmit(event)}>

                    {/*-------------------------------------NOMBRE------------------*/}
                    <div>
                        <h5>Name</h5>
                        <input
                            type="text"
                            placeholder="Nombre..."
                            name="name" // Nombre del input
                            value={values.name} // Valor dinamico que se actualiza mientras el usuario escribe
                            onChange={(event) => handleChange(event)} // Funcion que es "destructor" se ejecuta cunado se produce el evento.
                        />
                        {errors.name && <p>{errors.name}</p>}
                    </div>
                    {/*-------------------------------------IMAGEN------------------*/}
                    <div>
                        <h5>Imagen</h5>
                        <input
                            type="text"
                            placeholder="URL de la imagen"
                            name="image"
                            value={values.image}
                            onChange={(event) => handleChange(event)}
                        />
                    </div>
                    {/*------------------------------DESCRIPCION------------------*/}
                    <div>
                        <h5>Descripción</h5>
                        <input
                            type="text"
                            placeholder="Descripcion..."
                            name="description"
                            maxLength="100"
                            value={values.description}
                            onChange={(event) => handleChange(event)}
                        />
                        {errors.description && <p>{errors.description}</p>}
                    </div>
                    {/*--------------------------- FECHA DE LANZAMIENTO------------------*/}
                    <div>
                        <h5>Fecha de lanzamiento</h5>
                        <input type="date"
                            placeholder="Fecha..."
                            name="released"
                            value={values.released}
                            onChange={(event) => handleChange(event)}
                        />
                        {errors.released && (
                            <p>{errors.released}</p>
                        )}
                        </div>
                        {/* --------------------------------------RATING---------------------------------------- */}
                        <div>
                            <h5>Rating</h5>
                            <input
                                
                                type="number"
                                placeholder="Rating..."
                                value={values.rating}
                                name="rating"
                                step={0.5}
                                max={5.0}
                                min={0.0}
                                onChange={(event) => {
                                    handleChange(event);
                                }}
                            />
                            {errors.rating && (
                                <p>{errors.rating}</p>
                            )}
                        </div>
                        {/* --------------------------------------PLATAFORMAS---------------------------------------- */}
                        <div>
                            <label >
                                <h5 >Plataformas</h5>
                                <select
                                    
                                    name='platforms'
                                    onChange={(e) => handleChangePlatform(e)}
                                    defaultValue={'default'}
                                >
                                    {<option value="default" disabled>Platforms...</option>}
                                    {platforms.map((el, i) => {
                                        return (
                                            <option key={i} value={el}>
                                                {el}
                                            </option>
                                        )
                                    })}
                                </select>
                            </label>
                            {/* ----------------------------------------LISTA DE PLATAFORMAS----------------------------------- */}
                            <ul >
                                {values.platforms.length ? values.platforms.map((el, i) => (
                                    <div className='result' key={i}>
                                        <li>
                                            {el}
                                            <button className={styles.btnPlataformas} onClick={(event) => { handleDeletePlatform(event, el) }}>x</button>
                                        </li>
                                    </div>
                                ))
                                    : errors.platforms && (
                                        <p>{errors.platforms}</p>
                                    )
                                }
                            </ul>
                        </div>
                        {/* -----------------------------------------GENEROS---------------------------------------- */}
                        <div>
                            <label>
                                <h5>Generos</h5>
                                <select onChange={(event) => handleChangeGenre(event)}
                                    
                                    name='genres'
                                    defaultValue={'default'}
                                >
                                    <option value="default" disabled>Genero</option>
                                    {genres?.map((el) => {
                                        return (
                                            <option key={el.id} value={el.id}>
                                                {el.name}
                                            </option>
                                        )
                                    })
                                    }
                                </select>
                            </label>
                            {/* ----------------------------------------LISTA DE GENEROS----------------------------------- */}
                            <ul>
                                {values.genres.length ? values.genres.map((el, i) => (
                                    <div key={i}>
                                        <li>
                                            {el}
                                            <button className={styles.btnGenres} onClick={(event) => { handleDeleteGenre(event, el) }}>x</button>
                                        </li>
                                    </div>)
                                ) :
                                    errors.genres && (
                                        <p>{errors.genres}</p>
                                    )
                                }
                            </ul>
                        </div>
                        <button className={styles.btnFinal} type='submit' disabled={Object.keys(errors).length}>Terminar</button>
                </form>
            </div>
        </div>
    )
}

export default CreateGame