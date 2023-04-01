const express = require("express")
const userRouter = express.Router()
const { UserModel } = require("../model/user.model")
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const secreteKey = 'masai'

//registration
userRouter.post("/register", async (req, res) => {
    const { username, email ,city, password } = req.body
    try {
        bcrypt.hash(password, 5, async (err, hash) => {
            const user = new UserModel({ username, email ,city, password:hash })
            await user.save()
            res.status(200).send({ "msg": "Registration has been done" })
        })

    } catch (err) {
        res.status(400).send({ "msg": err.message })
    }
})


//login
userRouter.post("/login", async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await UserModel.findOne({ email })
        // console.log(user)
        if (user) {
            bcrypt.compare(password, user.password, (err, result) => {
                if (result) {
                    res.status(200).send({ "msg": "Login Successful", "token": jwt.sign({ "userID":user._id }, secreteKey) })
                } else{
                    res.status(400).send({ "msg": "Wrong Credantials" })
                }
            })
        }

    } catch (err) {
        res.status(400).send({ "msg": err.message })
    }
})

// userRouter.get("/details", (req, res) => {
//     const token = req.headers.authorization
//     jwt.verify(token, secreteKey, (err, decoded) => {
//         decoded ? res.status(200).send("User details") : res.status(400).send({ "msg": "Login required, cannot access the restricted routes" })
//     })
// })


module.exports = {
    userRouter
}