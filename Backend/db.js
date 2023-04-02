const mongoose = require("mongoose")
require("dotenv").config()

const connection = mongoose.connect(process.env.mongoURL)

module.exports = {connection}

// mongodb+srv://jignesh:<password>@cluster0.ui8bqmo.mongodb.net/?retryWrites=true&w=majority

// mongodb://127.0.0.1:27017/authlecture