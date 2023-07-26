require("dotenv").config();
const { YOUR_API_KEY } = process.env
const axios = require("axios");
const { Genre, Videogame } = require("../../db")
const { Op } = require("sequelize")


const getVideogameByName = async (name) => {
    try {
        let videogamesDB = await Videogame.findAll({
            where: {
                name: {
                    [Op.iLike]: `%${name}%`,
                },
            },
            include: {
                model: Genre,
                attributes: ['name'],
                through: {
                    attributes: [],
                },
            }
        });
        videogamesDB = videogamesDB.map(game => {
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

        const { data } = await axios(`https://api.rawg.io/api/games?search=${name}&key=${YOUR_API_KEY}`);
        const videogamesApi = data.results.map(game => ({
            id: game.id,
            name: game.name,
            background_image: game.background_image ? game.background_image : "https://www.cuestalibros.com/content/images/thumbs/default-image_415.png://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg",
            platforms: game.platforms.map(obj => obj.platform.name),
            description: game.description ? game.description.replace(/<\/?[^>]+>/gi, " ") : "No description",
            released: game.released,
            genres: game.genres.map(obj => obj.name),
        }))

        if (!videogamesDB.length && !videogamesApi.length) {
            throw new Error("No se encontraron juegos con ese nombre")
        }
        console.log(videogamesDB, "oleo")
        return [...videogamesApi, ...videogamesDB].slice(0, 15);

    } catch (error) {
        console.log(error)
        throw new Error(error.message)
    }
}

module.exports = { getVideogameByName }