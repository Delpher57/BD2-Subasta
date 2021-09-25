const express = require("express")
const articulo = require("./models/articulo")
const router = express.Router()



//curl http://localhost:5000/api/articulos

//obtener todos los items
router.get("/articulos", async (req, res) => {
    const items = await articulo.find() // await, espera hasta que se termine esta operacion para continuar
    res.send(items)
})


function get_all() {
    const items = articulo.find() // await, espera hasta que se termine esta operacion para continuar
    return items
}

module.exports = router


///insertar item

/**
 * {
        "owner_name": "Pedro",
        "owner_mail": "Pedro@gmail.com",
        "article_year" : 1998,
        "article_name" : "Palanganaloca",
        "article_description" : "loremipsum",
        "article_photo" : "PATH",
        "initial_price" : 99,
        "max_date" : "09/24/2021",
        "current_max_price" : 1000}

        //max date en formato MM-DD-AAAA
 * 
 */
router.post("/articulos", async (req, res) => {
    try {
        const post = new articulo({
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
    } catch {
        res.status(404)
        res.send({ error: "Hubo un error al ingresar el articulo" })
    }
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


/*
Obtener un item segun los filtros:
    - Tiempo restante (les falta un dia o menos para terminar)
    - Rango de precios
    - Antiguedad

*/
// curl http://localhost:5000/api/articulos/<_id>
router.get("/articulos/filter", async (req, res) => {
    try {

        var tiempo_restante = req.headers.tiempo_restante
        var precio_min = req.headers.precio_min
        var precio_max = req.headers.precio_max
        var antiguedad = req.headers.antiguedad

        //vamos a armar el query de forma dinamica con los parametros
        var query = {};


        if (tiempo_restante) {
            var today = new Date()
            var max_date = new Date()
            max_date.setDate(max_date.getDate() - tiempo_restante)
            query["max_date"] = { $gte: max_date, $lte: today }

        }

        if (antiguedad) {
            var year = new Date().getFullYear()
            var max_year = year - antiguedad
            query["article_year"] = { $lte: max_year }
        }

        if (precio_min && precio_max) {
            query["current_max_price"] = { $gte: precio_min, $lte: precio_max }
        }

        else if (precio_min) {
            query["current_max_price"] = { $gte: precio_min }
        }

        else if (precio_max) {
            query["current_max_price"] = { $lte: precio_max }
        }


        const item = await articulo.find(query)
        console.log(item)
        res.send(item)
    } catch {
        res.status(404)
        res.send({ error: "El item no existe!!!" })
    }
})


//eliminar in item (en el header va el id)
router.delete("/articulos", async (req, res) => {
    try {
        const item = await articulo.deleteOne({ _id: req.headers.id })
        res.send({ resultado: "Se ha eliminado correctamente!" })
    } catch {
        res.status(404)
        res.send({ error: "El item no existe!!!" })
    }
})


//apostar a un item
router.patch("/articulos", async (req, res) => {
    try {
        const item = await articulo.findOne({ _id: req.headers.id })

        var oferta = req.headers.oferta

        if( item.current_max_price < oferta ) {
            item.current_max_price = oferta
        }


        await item.save()



        res.send({ resultado: "Se ha realizado la oferta!!" })
    } catch {
        res.status(404)
        res.send({ error: "El item no existe!!!" })
    }
})