const mongoose = require("mongoose")

//user schema
const userSchema = mongoose.Schema({
    username: {type: String, required:true},
    email: {type: String, unique:true},
    mobile: {type: Number, required:true},
    password: {type: String, required:true}
},{
    versionKey:false
})

const UserModel = mongoose.model("user", userSchema)

module.exports = {
    UserModel
}