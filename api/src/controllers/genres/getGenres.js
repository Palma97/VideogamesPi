const {Genre} = require("../../db")

const getGenres = async () => {
 try {
    return await Genre.findAll()
 } catch (error) {
    throw new Error(error.message)
 }
}

module.exports = {getGenres};