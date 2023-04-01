const mongoose = require("mongoose")

//note schema
const todoSchema = mongoose.Schema({
    title: String,
    body: String,
    userID: String
},{
    versionKey:false
})

const TodoModel = mongoose.model("todo", todoSchema)

module.exports = {
    TodoModel
}