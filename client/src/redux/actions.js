import axios from "axios";
import {
    GET_ALL_VIDEOGAMES,
    GET_VIDEOGAME_BY_ID,
    GET_GENRES,
    ORDER_ALPHABETICALLY,
    ORDER_BY_RATING,
    FILTER_BY_GENRES,
    GET_VIDEOGAMES_BY_ORIGIN,
    GET_VIDEOGAMES_BY_NAME,
    CREATE_GAME,
} from "./actionTypes";

export const getAllGames = () => {
    return async function (dispatch) {
        let response = await axios(`http://localhost:3001/videogames`);
        return dispatch({
            type: GET_ALL_VIDEOGAMES,
            payload: response.data,
        });
    };
};

export const getDetailVideogame = (id) => {
    return async function (dispatch) {
        try {
            let response = await axios(`http://localhost:3001/videogames/${id}`);
            return dispatch({
                type: GET_VIDEOGAME_BY_ID,
                payload: response.data,
            });
        } catch (error) {
            console.log(error)
            alert("Error al cargar el detalle del videojuego")
        }
    };
};

export const createVideogame = (payload) => {
    return async function (dispatch) {
        try {
            let { name, image, description, released, rating, platforms, genres } =
                payload;
            let response = await axios.post(`http://localhost:3001/videogames`, {
                name,
                image,
                description,
                released: new Date(released),
                rating,
                platforms,
                genres,
            });
            return dispatch({type: CREATE_GAME, payload: response.data});
        } catch (error) {
            console.log(error)
            alert("Error al crear el videojuego")
        }
    };
};

export const getGenres = () => {
    return async function (dispatch) {
        try {
            let response = await axios(`http://localhost:3001/genres`);
            console.log(response.data)
            return dispatch({
                type: GET_GENRES,
                payload: response.data,
            });
        } catch (error) {
           console.log(error)
           alert("No se pudo obtener los géneros")
        }
    };
};

export const orderAlphabetically = (payload) => {
    return {
        type: ORDER_ALPHABETICALLY,
        payload
    }
}

export const orderByRating = (payload) => {
    return {
        type: ORDER_BY_RATING,
        payload
    }
}

export const filterGenres = (payload) => {
    return {
        type: FILTER_BY_GENRES,
        payload
    }
}


export const getGamesByOrigin = (payload) => {
    return {
        type: GET_VIDEOGAMES_BY_ORIGIN,
        payload
    }
}

export const getGamesByName = (name) => {
    return async function (dispatch) {
        try {
            let response = await axios(`http://localhost:3001/videogames/name?name=${name}`)
            return dispatch({
                type: GET_VIDEOGAMES_BY_NAME,
                payload: response.data
            })
        } catch (error){
           console.log(error)
           alert("No se encontraron juegos con ese nombre")
        }
    }
}