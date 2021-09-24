const express = require("express")
const mongoose = require("mongoose")
const routes = require("./routes") 

// Connect to MongoDB database
// para hacer funcionar creamos la wea en docker:
//  docker run -d --name subasta_server --publish 27017:27017 -d mongo


//iniciamos con npm start
mongoose
	.connect("mongodb://localhost:27017/subasta", { useNewUrlParser: true })
	.then(() => {
		const app = express()
        app.use(express.json())
        app.use("/api/", routes) // new

		app.listen(5000, () => {
			console.log("Se inicio el servidor! :D")
		})
	})
