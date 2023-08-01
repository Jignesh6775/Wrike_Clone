const mongoose = require("mongoose")

//note schema
const todoSchema = mongoose.Schema({
    title: String,
    body: String,
    date: {
		type: Date,
		default: Date.now,
		required: "Please Select Date"
	},
    status: {
        type: String,
        default: "process",
        enum: ["process", "hold", "review", "approved"],
    },
    userID: String
},{
    versionKey:false
})

const TodoModel = mongoose.model("todo", todoSchema)

module.exports = {
    TodoModel
}