const {Router} = require("express")
const { getVideogamesApi, getVideogamesDb } = require("../controllers/videogames/getAllVideogames")
const { createVideogame } = require("../controllers/videogames/postVideogames")
const { getVideogamesById } = require("../controllers/videogames/getVideogameById")
const {getVideogameByName} = require("../controllers/videogames/getVideogamesByName")

const router = Router()

router.get("/", async (req, res) => {
    try {
        const videogamesApi = await getVideogamesApi();
        const videogamesDb = await getVideogamesDb();
        if (videogamesDb.length) {
            const allVideogames = videogamesDb.concat(videogamesApi);
            return res.status(200).json(allVideogames);
        }
        return res.status(200).json(videogamesApi);
    } catch (error) {
        return res.status(400).json({ error: error.stack });
    }
})

router.get("/name", async (req, res) => {
    const { name } = req.query;
    try {
        const result = await getVideogameByName(name);
        return res.status(200).json(result);
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
})

router.get('/:id', async (req, res) => {
    const {id} = req.params 

    try {
        const getId = await getVideogamesById(id);
        res.status(200).json(getId)
    } catch (error) {
        res.status(404).json({error: error.message})
        
    }
})

router.post('/', async (req, res) => {
    const newGame = req.body;
    console.log(newGame);
    const created = await createVideogame(newGame);
    
    try {
        res.status(200).json(created)
    } catch (error) {
        res.status(404).json({error: error.message})
    }
})

module.exports = router;