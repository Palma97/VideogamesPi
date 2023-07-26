import {
    GET_ALL_VIDEOGAMES,
    GET_VIDEOGAME_BY_ID,
    CREATE_GAME,
    GET_GENRES,
    ORDER_ALPHABETICALLY,
    ORDER_BY_RATING,
    FILTER_BY_GENRES,
    GET_VIDEOGAMES_BY_ORIGIN,
    GET_VIDEOGAMES_BY_NAME,
} from "./actionTypes";

const initialState = {
    videogames: [], // este estado se llama ni bien se ejecuta la app
    getAllVideoGames: [], //LA COPIA DONDE FILTRO PARA PISAR VIDEOGAMES Y MOSTRAR
    genres: [], // este estado se llama ni bien se ejecuta la app
    details: {},
};

function rootReducer(state = initialState, action) {
    const { type, payload } = action;

    switch (type) {
        case GET_ALL_VIDEOGAMES:
            return {
                ...state,
                getAllVideoGames: payload,
                videogames: payload,
            };
        case GET_VIDEOGAME_BY_ID:
            return {
                ...state,
                details: payload,
            };
        case CREATE_GAME:
            return {
                ...state,
                videogames: [...state.videogames, payload],
                getAllVideoGames: [...state.getAllVideoGames, payload]
            };
        case GET_GENRES:
            return {
                ...state,
                genres: payload,
            };
        case ORDER_ALPHABETICALLY:
            const sortedArr =
                payload === "asc"
                    ? state.videogames.sort((a, b) => a.name.toLowerCase().localeCompare(b.name.toLowerCase()))
                    : state.videogames.sort((a, b) => b.name.toLowerCase().localeCompare(a.name.toLowerCase()));
            return {
                ...state,
                videogames: sortedArr,
            };
        case ORDER_BY_RATING:
            const ratingFiltered =
                payload === "max"
                ? state.videogames.sort((a, b) => b.rating - a.rating)
                : state.videogames.sort((a, b) => a.rating - b.rating);
            return {
                ...state,
                videogames: ratingFiltered,
            };
        case FILTER_BY_GENRES:
            return {
                ...state,
                videogames: [...state.getAllVideoGames.filter((el) => el.genres && el.genres.includes(payload))]
            };
        case GET_VIDEOGAMES_BY_ORIGIN:
            if (payload === "Created") {
                return {
                    ...state,
                    videogames: [...state.getAllVideoGames.filter(
                        (el) => isNaN(el.id)
                    )]
                };
            } 
            if (payload === "From Api") {
                return {
                    ...state,
                    videogames: [...state.getAllVideoGames.filter(
                        (el) => !isNaN(el.id)
                    )]
                };
            }
            if (payload === 'All') {
                return {
                    ...state,
                    videogames: state.getAllVideoGames
                }
            };

        case GET_VIDEOGAMES_BY_NAME:
            return {
                ...state,
                videogames: payload,
            };

        default:
            return state;
    }
}

export default rootReducer;