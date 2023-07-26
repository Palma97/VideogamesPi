require("dotenv").config()
const axios = require("axios")
const {YOUR_API_KEY} = process.env
const {Genre, Videogame} = require("../../db")

const getVideogamesDb = async () => {
    const data = await Videogame.findAll({
        include: {
            model: Genre,
            attributes: ["name"],
            through: {
                attributes: [],
            },
        }
    });
    
    const videogames = data.map(game => {
        game = game.get({plain: true})
        return {
            id: game.id,
            name: game.name,
            description: game.description.replace(/<\/?[^>]+>/gi, " "),
            background_image: game.image,
            platforms: game.platforms,
            genres: game.genres?.map(genre => genre.name),
            rating: game.rating
        }
    })
    return videogames
}

const getVideogamesApi =  async () => {
    let videogamesApi = []
    let page = 1
    while(page < 6){
    const {data} = await axios(`https://api.rawg.io/api/games?key=${YOUR_API_KEY}&page=${page}`)
    let response = data.results
    const videogamesByPage = response.map(game => {

        return ({
            id: game.id,
            name: game.name,
            background_image: game.background_image,
            genres: game.genres.map(genre => genre.name),
            rating: game.rating,
        })
    })

        videogamesApi = [...videogamesApi, ...videogamesByPage]
        page++
    }
    return videogamesApi
}

/* const getAllGames = async () =>{
    const VideogamesDb = await getVideogamesDb();
    const VideogamesApi = await getVideogamesApi();

    return [...VideogamesDb, ...VideogamesApi]
} */

module.exports = {getVideogamesApi, getVideogamesDb};