require("dotenv").config();
const {YOUR_API_KEY} = process.env;
const axios = require("axios");
const {Genre} = require("../../db")

const getGenres = async () => {
    try {
        const {data} = await axios(`https://api.rawg.io/api/genres?key=${YOUR_API_KEY}`)
        return await Genre.bulkCreate(data.results.map(elem => ({name: elem.name})))
        
    } catch (error) {
        throw new Error({
            error: "No se encontraron géneros"
        })
    }
}

module.exports = {getGenres};