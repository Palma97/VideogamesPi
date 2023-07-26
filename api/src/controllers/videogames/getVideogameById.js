require("dotenv").config();
const {YOUR_API_KEY} = process.env
const axios = require("axios");
const {Genre, Videogame} = require("../../db")
const {validate} = require("uuid")



const getVideogamesById = async (id) => {
console.log(id)
    try {
        if(isNaN(id)){
            if(!validate(id)){throw new Error("Invalid id")}
            let databaseId = await Videogame.findOne({
                where: {
                    id: id,
                },
                include:{
                    model: Genre,
                    attributes:['name'],
                    throgh: {
                        attributes: []
                    }
                }
            });
            if(!databaseId){
                throw new Error('No se ha encontrado juego con el ID enviado')
            }
            return databaseId
        }else{
            const {data} = await axios(`https://api.rawg.io/api/games/${id}?key=${YOUR_API_KEY}`)
            return {
                id: data.id,
                name: data.name,
                description: data.description.replace(/<\/?[^>]+>/gi, " "),
                released: data.released,
                rating: data.rating,
                img: data.background_image,
                platforms: data.platforms.map((p) => p.platform.name),
                genres: data.genres.map((g) => g.name),
            }
        }
    } catch (error) {
        console.log(error)
        throw new Error(error.message)
    }
}

/* const getVideogamesById = async (req, res) => {
    const {idVideogame} = req.params;
    let response = {}
    try {
        if(idVideogame){
            const resultDataBase = await Videogames.findByPk(idVideogame)
            response = resultDataBase;
            if(!resultDataBase){
                const {data} = await axios(`https://api.rawg.io/api/games/${idVideogame}?api_key=${YOUR_API_KEY}`)
                response = data;
                res.status(200).json(response)
            } else {
                res.status(400).json({error: "id is required"})
            }
        }
    } catch (error) {
        res.status(500).json({error: error.message})
    }
}

module.exports = {getVideogamesById} */
module.exports = {getVideogamesById}