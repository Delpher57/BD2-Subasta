const mongoose = require("mongoose")

const schema = mongoose.Schema({
	owner_name: String,
	owner_mail: String,
    article_year : Number,
    article_name : String,
    article_description : String,
    article_photo : String,
    initial_price : Number,
    max_date : Date,
    current_max_price : Number,
    photo: String,
})

module.exports = mongoose.model("articulo", schema)
