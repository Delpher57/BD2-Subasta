const express = require("express")
const mongoose = require("mongoose") // new

// Connect to MongoDB database
// para hacer funcionar creamos la wea en docker:
//  docker run -d --name subasta_server --publish 27017:27017 -d mongo
mongoose
	.connect("mongodb://localhost:27017/subasta", { useNewUrlParser: true })
	.then(() => {
		const app = express()

		app.listen(5000, () => {
			console.log("Se inicio el servidor! :D")
		})
	})