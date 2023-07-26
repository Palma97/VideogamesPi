const {Genre, Videogame} = require("../../db")

const createVideogame = async ({name, rating, released, image, platforms, description, genres}) => {
   try {
    if(!name || !rating || !released || !image || !platforms || !description || !genres.length) throw new Error("Datos incompletos")

  let genresOnDb = await Promise.all(genres.map(async(id) => await Genre.findByPk(id)))
 if(!genresOnDb.length) throw new Error("No hay géneros")

  let newVideogame = await Videogame.create({
    name: name.trim(), 
    description,
    platforms: platforms.join(" - "),
    image, 
    releaseDate: released, 
    rating,
  }
  )
  
  genresOnDb.forEach(genero => {newVideogame.addGenre(genero)})

  return {mensaje: "Videojuego creado"}
   } catch (error) {
    throw new Error(error.message)
   }
  };

module.exports = {createVideogame}