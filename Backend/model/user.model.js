const mongoose = require("mongoose")

//user schema
const userSchema = mongoose.Schema({
    username:String,
    email: String,
    mobile: Number,
    password: String
},{
    versionKey:false
})

const UserModel = mongoose.model("user", userSchema)

module.exports = {
    UserModel
}