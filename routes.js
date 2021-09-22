const express = require("express")
const articulo = require("./models/articulo")
const router = express.Router()

//curl http://localhost:5000/api/articulos
router.get("/articulos", async (req, res) => {
    const items = await articulo.find() // await, espera hasta que se termine esta operacion para continuar
    res.send(items)
})

module.exports = router


///insertar item
router.post("/articulos", async (req, res) => {
    const post  = new articulo({
        owner_name: req.body.owner_name,
        owner_mail: req.body.owner_mail,
        article_year: req.body.article_year,
        article_name: req.body.article_name,
        article_description: req.body.article_description,
        article_photo: req.body.article_photo,
        initial_price: req.body.initial_price,
        max_date: req.body.max_date,
        current_max_price: req.body.current_max_price,
    })
    await post.save()
    res.send(post)
})


//obtener un item especifico
// curl http://localhost:5000/api/articulos/<_id>
router.get("/articulos/one", async (req, res) => {
	try {
		const item = await articulo.findOne({ _id: req.headers.id })
		res.send(item)
	} catch {
		res.status(404)
		res.send({ error: "El item no existe!!!" })
	}
})


router.delete("/articulos", async (req, res) => {
	try {
		const item = await articulo.deleteOne({ _id: req.headers.id })
        res.send({resultado: "Se ha eliminado correctamente!"})
	} catch {
		res.status(404)
		res.send({ error: "El item no existe!!!" })
	}
})